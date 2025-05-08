"use client"

import { useRef } from "react"
import { X, Download } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// --- Modal Confirmació Enviar Rebuts ---
const SendReceiptsModal = ({ isOpen, onClose, selectedPayments }) => {
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)

  if (!isOpen) return null

  const totalReceipts = selectedPayments.length
  const totalAmount = selectedPayments.reduce((sum, payment) => sum + payment.price, 0)

  const handleDownload = () => {
    console.log("Downloading XLS for:", selectedPayments)
    // Placeholder for actual XLS download logic
    alert(`Descàrrega de ${totalReceipts} rebuts per un total de ${totalAmount.toFixed(2)} € iniciada (simulació).`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Confirmar Enviament Rebuts</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            {" "}
            <X size={20} />{" "}
          </button>
        </div>
        <div className="space-y-4 text-gray-300">
          <p>Estàs a punt de generar un fitxer per enviar els rebuts domiciliats seleccionats.</p>
          <div className="bg-gray-700 p-3 rounded">
            <p>
              <span className="font-semibold text-gray-200">Total Rebuts:</span> {totalReceipts}
            </p>
            <p>
              <span className="font-semibold text-gray-200">Import Total:</span> {totalAmount.toFixed(2)} €
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Aquesta acció generarà un fitxer .xls amb les dades necessàries per a la remesa bancària.
          </p>
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
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"
          >
            {" "}
            <Download size={16} />
            <span>Descarregar .xls</span>{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendReceiptsModal
