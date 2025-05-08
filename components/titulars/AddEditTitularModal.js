"use client"

import { useState, useEffect, useRef } from "react"
import { X, Save } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// --- Modal Afegir/Editar Titular ---
const AddEditTitularModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    fiscalAddress: "",
    email: "",
    phone: "",
    newsletter: false,
    iban: "",
  })
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Editing
        setFormData({
          name: initialData.name || "",
          dni: initialData.dni || "",
          fiscalAddress: initialData.fiscalAddress || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          newsletter: initialData.newsletter || false,
          iban: initialData.iban || "",
        })
      } else {
        // Adding new
        setFormData({
          name: "",
          dni: "",
          fiscalAddress: "",
          email: "",
          phone: "",
          newsletter: false,
          iban: "",
        })
      }
    }
  }, [isOpen, initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSaveClick = () => {
    if (!formData.name || !formData.email) {
      // Basic validation
      alert("Si us plau, omple almenys el nom i el correu electrònic.")
      return
    }
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-xl p-6 border border-gray-700 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{initialData ? "Editar Titular" : "Nou Titular"}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            {" "}
            <X size={20} />{" "}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="titularName" className="block text-sm font-medium text-gray-300 mb-1">
              Nom i cognoms <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="titularName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="titularDni" className="block text-sm font-medium text-gray-300 mb-1">
              DNI/NIE
            </label>
            <input
              type="text"
              id="titularDni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="titularAddress" className="block text-sm font-medium text-gray-300 mb-1">
              Direcció Fiscal
            </label>
            <textarea
              id="titularAddress"
              name="fiscalAddress"
              value={formData.fiscalAddress}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="titularEmail" className="block text-sm font-medium text-gray-300 mb-1">
                Correu Electrònic <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="titularEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="titularPhone" className="block text-sm font-medium text-gray-300 mb-1">
                Telèfon
              </label>
              <input
                type="tel"
                id="titularPhone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="titularIban" className="block text-sm font-medium text-gray-300 mb-1">
              IBAN
            </label>
            <input
              type="text"
              id="titularIban"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
            />
            <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-300">
              Subscrit a Newsletter
            </label>
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
            <span>Desar Titular</span>{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditTitularModal
