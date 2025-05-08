"use client"

import { useState, useEffect, useRef } from "react"
import { X, Save } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

const teacherStatuses = ["Actiu", "Inactiu", "Baixa"]

// --- Modal Afegir/Editar Professor ---
const AddEditProfessorModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: teacherStatuses[0],
    email: "",
    services: [], // Removed availability
  })
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Editing
        setFormData({
          name: initialData.name || "",
          status: initialData.status || teacherStatuses[0],
          email: initialData.email || "",
          services: initialData.services || [],
        })
      } else {
        // Adding new
        setFormData({
          name: "",
          status: teacherStatuses[0],
          email: "",
          services: [],
        })
      }
    }
  }, [isOpen, initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveClick = () => {
    if (!formData.name || !formData.email) {
      alert("Si us plau, omple almenys el nom i el correu electrònic.")
      return
    }
    // Pass only the relevant fields
    const { availability, ...saveData } = formData // Exclude availability if it somehow exists
    onSave(saveData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-xl p-6 border border-gray-700 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{initialData ? "Editar Professor" : "Nou Professor"}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            {" "}
            <X size={20} />{" "}
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="profName" className="block text-sm font-medium text-gray-300 mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="profName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="profStatus" className="block text-sm font-medium text-gray-300 mb-1">
                Estat
              </label>
              <select
                id="profStatus"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {teacherStatuses.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="profEmail" className="block text-sm font-medium text-gray-300 mb-1">
              Correu Electrònic <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="profEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          {/* Removed Services and Availability fields */}
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
            <span>Desar Professor</span>{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditProfessorModal
