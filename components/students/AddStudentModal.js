"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// --- Dades de Mostra ---
const allStudentsList = [
  {
    id: 1,
    name: "Pau Torres",
    status: "Actiu",
    subjects: "Mates",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=PT",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["REF 3-4 ESO", "Mates Selectivitat"],
    lastContact: "2025-04-28",
    firstEnrollment: "2024-09-10",
  },
  {
    id: 2,
    name: "Guillem Mercuri",
    status: "Actiu",
    subjects: "Totes les assignatures",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=GM",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["REF 3-4 ESO", "Ang 1-2 ESO", "Català ESO"],
    lastContact: "2025-04-25",
    firstEnrollment: "2023-10-01",
  },
  {
    id: 3,
    name: "Helena Gimeno",
    status: "Actiu",
    subjects: "Mates",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=HG",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["REF 3-4 ESO"],
    lastContact: "2025-04-30",
    firstEnrollment: "2024-09-15",
  },
  {
    id: 4,
    name: "Sofia Camps",
    status: "Actiu",
    subjects: "Anglès",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=SC",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["Ang B2 Prep", "Ang B1"],
    lastContact: "2025-04-20",
    firstEnrollment: "2024-01-20",
  },
  {
    id: 5,
    name: "Martí López",
    status: "Actiu",
    subjects: "Física",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=ML",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["Física 1r BAT", "Mates Selectivitat"],
    lastContact: "2025-04-29",
    firstEnrollment: "2024-09-05",
  },
  {
    id: 6,
    name: "Júlia Ferrer",
    status: "Inactiu",
    subjects: "Química",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=JF",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["Química Selectivitat"],
    lastContact: "2025-03-10",
    firstEnrollment: "2023-09-12",
  },
  {
    id: 7,
    name: "Nil Bosch",
    status: "Actiu",
    subjects: "Català",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=NB",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["Català ESO"],
    lastContact: "2025-04-15",
    firstEnrollment: "2024-11-01",
  },
  {
    id: 8,
    name: "Aina Solé",
    status: "Actiu",
    subjects: "Història",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=AS",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["Història BAT"],
    lastContact: "2025-04-22",
    firstEnrollment: "2024-09-08",
  },
  {
    id: 9,
    name: "Pol Romero",
    status: "Actiu",
    subjects: "Filosofia",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=PR",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["Filosofia BAT"],
    lastContact: "2025-04-27",
    firstEnrollment: "2024-09-11",
  },
  {
    id: 10,
    name: "Carla Esteve",
    status: "Actiu",
    subjects: "Dibuix",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=CE",
    attendance: null,
    tracking: { planning: false, feedback: false },
    lateMinutes: 0,
    feedbackRating: 0,
    sessionNotes: "",
    objectivesNotes: "",
    incident: null,
    courses: ["Dibuix Tècnic"],
    lastContact: "2025-04-18",
    firstEnrollment: "2024-02-15",
  },
]

// Modal Component for Adding/Assigning Student (Restored state and handlers)
const AddStudentModal = ({ isOpen, onClose, onAssignStudent, isAssignMode = false }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudentId, setSelectedStudentId] = useState(null)
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, onClose)

  const filteredStudents = allStudentsList.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAssign = (scope) => {
    if (selectedStudentId) {
      const student = allStudentsList.find((s) => s.id === selectedStudentId)
      onAssignStudent(student, scope)
      setSearchTerm("")
      setSelectedStudentId(null)
    }
  }

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("")
      setSelectedStudentId(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">{isAssignMode ? "Assignar Alumne" : "Afegir Alumne"}</h2>
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cercar alumne..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-10 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="max-h-48 overflow-y-auto mb-6 border border-gray-700 rounded bg-gray-900/50">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-700 ${selectedStudentId === student.id ? "bg-blue-800/50" : ""}`}
              >
                <img
                  src={
                    student.avatarUrl ||
                    `https://placehold.co/32x32/374151/E5E7EB?text=${student.name.substring(0, 2).toUpperCase()}`
                  }
                  alt={student.name}
                  className="w-8 h-8 rounded-full mr-3 border border-gray-600"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/32x32/4B5563/9CA3AF?text=Err`
                  }}
                />
                <span className="text-sm text-gray-200">{student.name}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 p-3 text-center italic">No s'han trobat alumnes.</p>
          )}
        </div>
        {isAssignMode ? (
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 order-3 sm:order-1"
            >
              Cancel·lar
            </button>
            <button
              onClick={() => handleAssign("current")}
              disabled={!selectedStudentId}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white order-1 sm:order-2 ${!selectedStudentId ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"}`}
            >
              Assignar Sessió
            </button>
            <button
              onClick={() => handleAssign("future")}
              disabled={!selectedStudentId}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white order-2 sm:order-3 ${!selectedStudentId ? "bg-teal-800 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"}`}
            >
              Assignar Totes
            </button>
          </div>
        ) : (
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
            >
              Cancel·lar
            </button>
            <button
              onClick={() => console.log("TODO: Implement Add Student logic")}
              disabled={!selectedStudentId}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${!selectedStudentId ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"}`}
            >
              Afegir Alumne
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddStudentModal
