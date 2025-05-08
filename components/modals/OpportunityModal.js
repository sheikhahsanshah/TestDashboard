"use client"

import { useState, useEffect, useRef } from "react"
import { X, Save } from "lucide-react"

// Sample users for assignment
const users = ["Helena", "Marc", "Admin"]

// --- Modal Nova Oportunitat / Editar Oportunitat ---
const OpportunityModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [assignedTo, setAssignedTo] = useState(users[0] || "") // Default to first user or empty
  const modalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Editing existing opportunity
        setDescription(initialData.description)
        setDate(initialData.date)
        setAssignedTo(initialData.assignedTo)
      } else {
        // Adding new opportunity
        setDescription("")
        setDate(new Date().toISOString().split("T")[0]) // Default to today
        setAssignedTo(users[0] || "")
      }
    }
  }, [isOpen, initialData])

  const handleSaveClick = () => {
    if (!description || !date || !assignedTo) {
      alert("Si us plau, omple tots els camps.")
      return
    }
    onSave({ description, date, assignedTo })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {initialData ? "Editar Oportunitat" : "Nova Oportunitat"}
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="oppDescription" className="block text-sm font-medium text-gray-300 mb-1">
              Descripció <span className="text-red-500">*</span>
            </label>
            <textarea
              id="oppDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="oppDate" className="block text-sm font-medium text-gray-300 mb-1">
              Data <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="oppDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="oppAssignedTo" className="block text-sm font-medium text-gray-300 mb-1">
              Assignat a <span className="text-red-500">*</span>
            </label>
            <select
              id="oppAssignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
          >
            Cancel·lar
          </button>
          <button
            onClick={handleSaveClick}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            <Save size={16} /> <span>Desar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OpportunityModal
