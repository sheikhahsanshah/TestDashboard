"use client"

import { useState, useRef, useEffect } from "react"
import { X, Save } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Modal Component for Adding a New Location
const AddLocationModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("bg-blue-600") // Default color
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)

  const colorOptions = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-indigo-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-gray-600",
  ]

  const handleSaveClick = () => {
    if (!name) {
      alert("Si us plau, introdueix un nom per a la localització.")
      return
    }
    onSave({ name, color })
    setName("")
    setColor("bg-blue-600") // Reset to default
  }

  useEffect(() => {
    if (isOpen) {
      setName("")
      setColor("bg-blue-600")
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Nova Localització</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            {" "}
            <X size={20} />{" "}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="locationName" className="block text-sm font-medium text-gray-300 mb-1">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="locationName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-8 w-8 rounded-full focus:outline-none ring-offset-2 ring-offset-gray-800 ${color === c ? "ring-2 ring-white" : ""} ${c}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
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
            <span>Desar</span>{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddLocationModal
