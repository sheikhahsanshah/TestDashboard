"use client"

import { useState, useRef } from "react"
import { ArrowLeft, MessageSquare, User, ChevronDown, XCircle } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// --- Dades de Mostra ---
const docents = [
  "Gabriela Soler",
  "David Martí",
  "Laura Puig",
  "Marc Font",
  "Anna Vidal",
  "Jordi Serra",
  "Clara Pons",
  "Pau Roca",
  "Marta Mas",
  "Xavier Gil",
]

// Component Barra Info Classe - Restored state and handlers
const ClassInfoBar = ({
  selectedAula,
  onAulaChange,
  onCloseView,
  onOpenComments,
  assignedTeacher,
  onTeacherAssign,
  onCancelSession,
}) => {
  const [isAulaDropdownOpen, setIsAulaDropdownOpen] = useState(false)
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false)
  const [teacherSearchTerm, setTeacherSearchTerm] = useState("")
  const aulas = [1, 2, 3, 4, 5]
  const aulaDropdownRef = useRef(null)
  const teacherDropdownRef = useRef(null)

  useOnClickOutside(aulaDropdownRef, () => setIsAulaDropdownOpen(false))
  useOnClickOutside(teacherDropdownRef, () => {
    setIsTeacherDropdownOpen(false)
    setTeacherSearchTerm("")
  })

  const handleSelectAula = (aula) => {
    onAulaChange(aula)
    setIsAulaDropdownOpen(false)
  }

  const handleSelectTeacher = (teacher) => {
    onTeacherAssign(teacher)
    setIsTeacherDropdownOpen(false)
    setTeacherSearchTerm("")
  }

  const filteredTeachers = docents.filter((docent) => docent.toLowerCase().includes(teacherSearchTerm.toLowerCase()))

  const handleCancelClick = () => {
    if (window.confirm("Estàs segur que vols cancel·lar aquesta sessió? Aquesta acció podria ser irreversible.")) {
      onCancelSession()
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-gray-800 text-gray-300 border-b border-gray-700 gap-y-3">
      <div className="flex items-center space-x-3">
        <button
          onClick={onCloseView}
          title="Tornar"
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-white flex items-center space-x-2">
            <span>Reforç - 3/4 ESO</span>
            <span className="bg-blue-600 text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">ACT TGN</span>
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">04 / 04 / 2025 - 18:30</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenComments}
          title="Comentaris de la Sessió"
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          <MessageSquare size={20} />
        </button>
        <div className="relative" ref={teacherDropdownRef}>
          <button
            onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            <User size={18} />
            <span className="text-sm font-medium truncate max-w-[100px]" title={assignedTeacher}>
              {assignedTeacher || "Sense Assignar"}
            </span>
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-200 flex-shrink-0 ${isTeacherDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isTeacherDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              <div className="p-2 border-b border-gray-600">
                <input
                  type="text"
                  placeholder="Cercar docent..."
                  value={teacherSearchTerm}
                  onChange={(e) => setTeacherSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 bg-gray-600 text-gray-200 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <ul className="py-1">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((docent) => (
                    <li key={docent}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handleSelectTeacher(docent)
                        }}
                        className={`block px-3 py-1.5 text-sm ${assignedTeacher === docent ? "bg-blue-600 text-white font-semibold" : "text-gray-300 hover:bg-gray-600 hover:text-white"}`}
                      >
                        {docent}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-1.5 text-sm text-gray-400 italic">No s'han trobat docents</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="relative" ref={aulaDropdownRef}>
          <button
            onClick={() => setIsAulaDropdownOpen(!isAulaDropdownOpen)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors w-full justify-between"
          >
            <span className="text-sm font-medium">Aula {selectedAula}</span>
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-200 ${isAulaDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isAulaDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {aulas.map((aula) => (
                  <li key={aula}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSelectAula(aula)
                      }}
                      className={`block px-4 py-2 text-sm ${selectedAula === aula ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-600 hover:text-white"}`}
                    >
                      Aula {aula}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={handleCancelClick}
          title="Cancel·lar Sessió"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-red-400 bg-gray-700 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
        >
          <XCircle size={20} />
          <span className="text-sm font-medium hidden sm:inline">Cancel·lar Sessió</span>
        </button>
      </div>
    </div>
  )
}

export default ClassInfoBar
