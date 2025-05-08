"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Send } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Modal Component for Setting Late Time - Restored state update logic
const LateTimeModal = ({ isOpen, onClose, onSave, studentName }) => {
  const [delayTime, setDelayTime] = useState(5)
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, onClose)

  const timeOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

  const handleSave = (actionType) => {
    onSave(delayTime, actionType)
  }

  useEffect(() => {
    if (isOpen) {
      setDelayTime(5)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-2">Marcar Retard</h2>
        <p className="text-sm text-gray-400 mb-4">
          Per a: <span className="font-medium text-gray-200">{studentName}</span>
        </p>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Minuts de retard:</label>
          <div className="grid grid-cols-4 gap-2">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => setDelayTime(time)}
                className={`px-2 py-1.5 rounded-md text-sm transition-colors ${
                  delayTime === time
                    ? "bg-orange-600 text-white ring-2 ring-offset-2 ring-offset-gray-800 ring-orange-500"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {time} min
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 order-3 sm:order-1"
          >
            Cancel·lar
          </button>
          <button
            onClick={() => handleSave("save")}
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 order-1 sm:order-2"
          >
            <Check size={16} />
            <span>Desar</span>
          </button>
          <button
            onClick={() => handleSave("notify")}
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 order-2 sm:order-3"
          >
            <Send size={16} />
            <span>Notificar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LateTimeModal
