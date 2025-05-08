"use client"

import { useState, useRef, useEffect } from "react"
import { Save, Send } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Modal Component for Reporting Incident - Restored state and handlers
const IncidentModal = ({ isOpen, onClose, onSaveIncident, studentName }) => {
  const [incidentTitle, setIncidentTitle] = useState("")
  const [incidentDescription, setIncidentDescription] = useState("")
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, onClose)

  const handleSave = (actionType) => {
    onSaveIncident(incidentTitle, incidentDescription, actionType)
    setIncidentTitle("")
    setIncidentDescription("")
  }

  useEffect(() => {
    if (isOpen) {
      setIncidentTitle("")
      setIncidentDescription("")
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-2">Reportar Incidència</h2>
        <p className="text-sm text-gray-400 mb-4">
          Per a: <span className="font-medium text-gray-200">{studentName}</span>
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="incidentTitle" className="block text-sm font-medium text-gray-300 mb-1">
              Títol:
            </label>
            <input
              type="text"
              id="incidentTitle"
              value={incidentTitle}
              onChange={(e) => setIncidentTitle(e.target.value)}
              placeholder="Ex: Comportament inadequat, Material oblidat..."
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-300 mb-1">
              Descripció:
            </label>
            <textarea
              id="incidentDescription"
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              rows="5"
              placeholder="Descriu detalladament què ha succeït..."
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            ></textarea>
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
            onClick={() => handleSave("save")}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500"
          >
            <Save size={16} />
            <span>Desar</span>
          </button>
          <button
            onClick={() => handleSave("notify")}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            <Send size={16} />
            <span>Notificar Coordinació</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncidentModal
