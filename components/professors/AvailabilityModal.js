"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Save } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// --- Modal Disponibilitat Professor ---
const AvailabilityModal = ({ isOpen, onClose, professor, onSave }) => {
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)
  const [availabilityGrid, setAvailabilityGrid] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartSlot, setDragStartSlot] = useState(null)
  const [dragDay, setDragDay] = useState(null)
  const [dragMode, setDragMode] = useState(null) // 'select' or 'deselect'

  useEffect(() => {
    if (isOpen && professor) {
      const initialGrid = {}
      const days = ["Dll", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg"]
      days.forEach((day) => {
        initialGrid[day] = Array(48).fill(false)
        professor.availability?.forEach((slot) => {
          if (slot.day === day) {
            const startSlot = timeToSlotIndex(slot.startTime)
            const endSlot = timeToSlotIndex(slot.endTime)
            for (let i = startSlot; i < endSlot; i++) {
              if (i >= 0 && i < 48) initialGrid[day][i] = true
            }
          }
        })
      })
      setAvailabilityGrid(initialGrid)
    }
  }, [isOpen, professor])

  const timeToSlotIndex = (time) => {
    if (!time) return -1
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 2 + Math.floor(minutes / 30)
  }
  const slotIndexToTime = (index) => {
    const hours = Math.floor(index / 2)
    const minutes = (index % 2) * 30
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
  }

  const gridToAvailabilityArray = (grid) => {
    const availability = []
    const days = ["Dll", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg"]
    days.forEach((day) => {
      let startSlot = -1
      for (let i = 0; i < 48; i++) {
        if (grid[day]?.[i] && startSlot === -1) {
          startSlot = i
        } else if (!grid[day]?.[i] && startSlot !== -1) {
          availability.push({ day, startTime: slotIndexToTime(startSlot), endTime: slotIndexToTime(i) })
          startSlot = -1
        }
      }
      if (startSlot !== -1) {
        availability.push({ day, startTime: slotIndexToTime(startSlot), endTime: "24:00" })
      }
    })
    return availability
  }

  const handleMouseDown = (day, slotIndex) => {
    setIsDragging(true)
    setDragStartSlot(slotIndex)
    setDragDay(day)
    const currentMode = availabilityGrid[day]?.[slotIndex] ? "deselect" : "select"
    setDragMode(currentMode)
    // Apply change immediately to the starting slot
    setAvailabilityGrid((prev) => {
      const newDaySlots = [...(prev[day] || Array(48).fill(false))]
      newDaySlots[slotIndex] = currentMode === "select"
      return { ...prev, [day]: newDaySlots }
    })
  }

  const handleMouseEnter = (day, slotIndex) => {
    if (isDragging && day === dragDay) {
      setAvailabilityGrid((prev) => {
        const newDaySlots = [...(prev[day] || Array(48).fill(false))]
        const start = Math.min(dragStartSlot, slotIndex)
        const end = Math.max(dragStartSlot, slotIndex)
        for (let i = start; i <= end; i++) {
          newDaySlots[i] = dragMode === "select"
        }
        return { ...prev, [day]: newDaySlots }
      })
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      setDragStartSlot(null)
      setDragDay(null)
      setDragMode(null)
    }
  }

  const handleSaveClick = () => {
    const newAvailability = gridToAvailabilityArray(availabilityGrid)
    onSave(professor.id, newAvailability)
  }

  // Add mouseup listener to the window to catch drag end outside the grid
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging]) // Re-add listener if isDragging changes

  if (!isOpen || !professor) return null

  const daysOfWeek = ["Dll", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg"]
  const timeLabels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6 border border-gray-700 max-h-[90vh] flex flex-col"
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-xl font-semibold text-white">Disponibilitat Setmanal - {professor.name}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            {" "}
            <X size={20} />{" "}
          </button>
        </div>
        <div className="overflow-auto flex-grow" onMouseLeave={handleMouseUp}>
          {" "}
          {/* Handle mouse leaving the grid area */}
          <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] gap-px bg-gray-700 border border-gray-700 select-none">
            {" "}
            {/* Added select-none */}
            {/* Time Labels Header */}
            <div className="sticky top-0 bg-gray-800 z-10"></div> {/* Empty corner */}
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="sticky top-0 bg-gray-800 text-center text-xs font-medium text-gray-300 py-1 border-b border-gray-700"
              >
                {day}
              </div>
            ))}
            {/* Grid Body */}
            {Array.from({ length: 48 }).map((_, slotIndex) => (
              <React.Fragment key={slotIndex}>
                {/* Time Label Column */}
                {slotIndex % 2 === 0 && (
                  // Show time label every hour (2 slots)
                  <div
                    className="sticky left-0 bg-gray-800 text-right text-xs text-gray-400 pr-1 py-0.5 border-r border-gray-700 h-5 flex items-center justify-end"
                    style={{ gridRow: `${slotIndex + 2} / span 2` }}
                  >
                    {timeLabels[slotIndex / 2]}
                  </div>
                )}
                {/* Day Columns */}
                {daysOfWeek.map((day) => (
                  <div
                    key={`${day}-${slotIndex}`}
                    onMouseDown={() => handleMouseDown(day, slotIndex)}
                    onMouseEnter={() => handleMouseEnter(day, slotIndex)}
                    className={`h-5 cursor-pointer ${
                      availabilityGrid[day]?.[slotIndex]
                        ? "bg-green-500 hover:bg-green-400"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    title={`${day} ${slotIndexToTime(slotIndex)} - ${slotIndexToTime(slotIndex + 1)}`}
                  ></div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
          >
            {" "}
            Cancel·lar{" "}
          </button>
          <button
            onClick={handleSaveClick}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            {" "}
            <Save size={16} />
            <span>Desar Disponibilitat</span>{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvailabilityModal
