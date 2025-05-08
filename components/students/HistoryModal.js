"use client"

import { useRef } from "react"
import { X } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// --- Modal Històric ---
const HistoryModal = ({ isOpen, onClose, title, historyData }) => {
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-700 max-h-[80vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {historyData && historyData.length > 0 ? (
            <ul className="space-y-3">
              {historyData.map((entry, index) => (
                <li key={index} className="text-sm border-b border-gray-700 pb-2 last:border-b-0">
                  <p className="text-gray-400 text-xs mb-1">{new Date(entry.date).toLocaleDateString("ca-ES")}</p>
                  <p className="text-gray-200">{entry.value}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No hi ha historial disponible.</p>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
          >
            {" "}
            Tancar{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryModal
