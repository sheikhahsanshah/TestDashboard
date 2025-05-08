"use client"

import { useState, useRef, useEffect } from "react"
import { X, Save } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Modal Component for Adding a New Student
const AddNewStudentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    school: "",
    email: "",
    imageAuth: false,
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  })
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, onClose)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSaveClick = () => {
    if (!formData.fullName || !formData.birthDate) {
      alert("Si us plau, omple com a mínim el nom i la data de naixement.")
      return
    }
    onSave(formData)
    setFormData({
      fullName: "",
      birthDate: "",
      school: "",
      email: "",
      imageAuth: false,
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
    })
  }

  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: "",
        birthDate: "",
        school: "",
        email: "",
        imageAuth: false,
        emergencyName: "",
        emergencyRelation: "",
        emergencyPhone: "",
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-xl p-6 border border-gray-700 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Afegir Nou Alumne</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
              Nom i cognoms <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-1">
              Data de naixement <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-300 mb-1">
              Centre Escolar
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Correu electrònic
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-300 mb-1">
                Nom contacte emergència
              </label>
              <input
                type="text"
                id="emergencyName"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="emergencyRelation" className="block text-sm font-medium text-gray-300 mb-1">
                Relació
              </label>
              <input
                type="text"
                id="emergencyRelation"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleChange}
                placeholder="Pare, Mare, Tutor/a..."
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-300 mb-1">
                Telèfon emergència
              </label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="imageAuth"
              name="imageAuth"
              checked={formData.imageAuth}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
            />
            <label htmlFor="imageAuth" className="ml-2 block text-sm text-gray-300">
              Autorització del titular a imatges
            </label>
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
            <Save size={16} />
            <span>Desar Alumne</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewStudentModal
