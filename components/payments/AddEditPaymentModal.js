"use client"

import { useState, useEffect, useRef } from "react"
import { X, Save } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

const localitzacions = ["ACT TGN", "ACT CNS", "Calafell", "Centres Cívics", "Online"]
const cursos = [
  "REF 3-4 ESO",
  "Ang B2 Prep",
  "Mates Selectivitat",
  "Física 1r BAT",
  "Ang 1-2 ESO",
  "Ang B1",
  "Ref 1-2 BAT",
  "Francès A1",
  "Química Selectivitat",
  "Català ESO",
  "Història BAT",
  "Filosofia BAT",
  "Dibuix Tècnic",
]
const paymentMethods = ["Targeta", "Efectiu", "Rebut Domiciliat", "Transferència"]
const paymentStatuses = ["Pagat", "Pendent", "Impagat"]

// --- Modal Afegir/Editar Pagament ---
const AddEditPaymentModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    holderName: "",
    price: "",
    service: "",
    location: "",
    status: paymentStatuses[0],
    expectedDate: "",
    paymentMethod: paymentMethods[0],
  })
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Editing
        setFormData({
          holderName: initialData.holderName || "",
          price: initialData.price || "",
          service: initialData.service || cursos[0] || "", // Default to first course if initial is empty
          location: initialData.location || localitzacions[0] || "",
          status: initialData.status || paymentStatuses[0],
          expectedDate: initialData.expectedDate || "",
          paymentMethod: initialData.paymentMethod || paymentMethods[0],
        })
      } else {
        // Adding new
        setFormData({
          holderName: "",
          price: "",
          service: cursos[0] || "",
          location: localitzacions[0] || "",
          status: paymentStatuses[0],
          expectedDate: "",
          paymentMethod: paymentMethods[0],
        })
      }
    }
  }, [isOpen, initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveClick = () => {
    // Basic validation
    if (!formData.holderName || !formData.price || !formData.service || !formData.expectedDate) {
      alert("Si us plau, omple els camps Titular, Preu, Servei i Data Prevista.")
      return
    }
    // Convert price to number
    const saveData = { ...formData, price: Number.parseFloat(formData.price) || 0 }
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
          <h2 className="text-xl font-semibold text-white">{initialData ? "Editar Pagament" : "Nou Pagament"}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            {" "}
            <X size={20} />{" "}
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="holderName" className="block text-sm font-medium text-gray-300 mb-1">
                Titular <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="holderName"
                name="holderName"
                value={formData.holderName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                Preu (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
              Servei <span className="text-red-500">*</span>
            </label>
            {/* Changed to select */}
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {cursos.map((curs) => (
                <option key={curs} value={curs}>
                  {curs}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                Localització
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {localitzacions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                Estat
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {paymentStatuses.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-300 mb-1">
                Data Prevista <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="expectedDate"
                name="expectedDate"
                value={formData.expectedDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-300 mb-1">
                Mètode Pagament
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
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
            <span>Desar Pagament</span>{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditPaymentModal
