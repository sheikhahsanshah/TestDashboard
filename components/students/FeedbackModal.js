"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"
import StarRating from "./StarRating"

// Modal Component for Student Feedback - Restored state and handlers, removed objectives
const FeedbackModal = ({
  isOpen,
  onClose,
  student,
  onSaveFeedback,
  onNavigateStudent,
  currentIndex,
  totalStudents,
}) => {
  const [rating, setRating] = useState(0)
  const [sessionNotes, setSessionNotes] = useState("")
  // Removed objectivesNotes state
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, onClose)

  useEffect(() => {
    if (student) {
      setRating(student.feedbackRating || 0)
      setSessionNotes(student.sessionNotes || "")
    } else {
      setRating(0)
      setSessionNotes("")
    }
  }, [student])

  const handleSave = () => {
    onSaveFeedback(student.id, rating, sessionNotes)
  } // Removed objectivesNotes from call

  if (!isOpen || !student) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => onNavigateStudent("prev")}
            disabled={currentIndex === 0}
            className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="Alumne Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-white text-center">
            Feedback Sessió <br />
            <span className="text-lg font-medium text-blue-400">{student.name}</span>
          </h2>
          <button
            onClick={() => onNavigateStudent("next")}
            disabled={currentIndex === totalStudents - 1}
            className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="Alumne Següent"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Grau d'aprofitament:</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div>
            <label htmlFor={`sessionNotes-${student.id}`} className="block text-sm font-medium text-gray-300 mb-1">
              Què s'ha treballat?
            </label>
            <textarea
              id={`sessionNotes-${student.id}`}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              rows="4"
              placeholder="Descriu breument el contingut de la sessió, exercicis, dificultats, etc."
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            ></textarea>
          </div>
          {/* Removed Objectives Notes Section */}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
          >
            Tancar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            <Save size={16} />
            <span>Desar Feedback</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
