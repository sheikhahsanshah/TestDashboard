"use client"

import { useState, useRef } from "react"
import { ChevronDown, Pencil } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Color themes for different event types
const colorThemes = {
  blue: {
    bg: "bg-blue-700/90",
    border: "border-blue-500",
    tagBg: "bg-blue-600",
    tagText: "text-blue-100",
    teacherInitialBg: "bg-blue-500",
    buttonBg: "bg-gray-700/70",
    buttonHoverBg: "hover:bg-gray-600",
    capacityBg: "bg-gray-700/70",
    statusConfirmed: "text-green-400",
    statusPending: "text-yellow-400",
  },
  purple: {
    bg: "bg-purple-800/90",
    border: "border-purple-600",
    tagBg: "bg-purple-600",
    tagText: "text-purple-100",
    teacherInitialBg: "bg-purple-500",
    buttonBg: "bg-gray-700/70",
    buttonHoverBg: "hover:bg-gray-600",
    capacityBg: "bg-gray-700/70",
    statusConfirmed: "text-green-400",
    statusPending: "text-yellow-400",
  },
  orange: {
    bg: "bg-orange-800/90",
    border: "border-orange-600",
    tagBg: "bg-orange-600",
    tagText: "text-orange-100",
    teacherInitialBg: "bg-orange-500",
    buttonBg: "bg-gray-700/70",
    buttonHoverBg: "hover:bg-gray-600",
    capacityBg: "bg-gray-700/70",
    statusConfirmed: "text-green-400",
    statusPending: "text-yellow-400",
  },
  teal: {
    bg: "bg-teal-800/90",
    border: "border-teal-600",
    tagBg: "bg-teal-600",
    tagText: "text-teal-100",
    teacherInitialBg: "bg-teal-500",
    buttonBg: "bg-gray-700/70",
    buttonHoverBg: "hover:bg-gray-600",
    capacityBg: "bg-gray-700/70",
    statusConfirmed: "text-green-400",
    statusPending: "text-yellow-400",
  },
}

// Helper function to convert time to pixels for positioning
const timeToPixels = (time, hourSlotHeight = 100) => {
  const [hours, minutes] = time.split(":").map(Number)
  const totalMinutes = (hours - 17) * 60 + minutes
  const scaleFactor = hourSlotHeight / 60
  return totalMinutes * scaleFactor
}

const CalendarEventCard = ({ event, onNavigateToTracking, onEventUpdate }) => {
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false)
  const [isAulaDropdownOpen, setIsAulaDropdownOpen] = useState(false)
  const [teacherSearchTerm, setTeacherSearchTerm] = useState("")
  const teacherDropdownRef = useRef(null)
  const aulaDropdownRef = useRef(null)

  useOnClickOutside(teacherDropdownRef, () => {
    setIsTeacherDropdownOpen(false)
    setTeacherSearchTerm("")
  })

  useOnClickOutside(aulaDropdownRef, () => {
    setIsAulaDropdownOpen(false)
  })

  // Sample data for dropdowns
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
  const aulas = [1, 2, 3, 4, 5]

  const handleTeacherDropdownToggle = () => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)
  const handleAulaDropdownToggle = () => setIsAulaDropdownOpen(!isAulaDropdownOpen)

  const handleSelectTeacher = (newTeacherName) => {
    console.log(`Assigning teacher ${newTeacherName} to session ${event.id}`)
    if (onEventUpdate) {
      onEventUpdate(event.id, { teacher: newTeacherName })
    }
    setIsTeacherDropdownOpen(false)
    setTeacherSearchTerm("")
  }

  const handleSelectAula = (newAula) => {
    console.log(`Changing aula to ${newAula} for session ${event.id}`)
    if (onEventUpdate) {
      onEventUpdate(event.id, { aula: newAula })
    }
    setIsAulaDropdownOpen(false)
  }

  const handleCourseTabClick = (courseId) => {
    console.log("Course tab clicked:", courseId)
    // Update active course
    if (onEventUpdate) {
      const updatedCourses = event.concurrentCourses.map((course) => ({
        ...course,
        active: course.id === courseId,
      }))
      onEventUpdate(event.id, { concurrentCourses: updatedCourses })
    }
  }

  const filteredTeachers = docents.filter((docent) => docent.toLowerCase().includes(teacherSearchTerm.toLowerCase()))

  const theme = colorThemes[event.colorTheme] || colorThemes.blue
  const hourSlotHeight = 100
  const topPosition = timeToPixels(event.startTime, hourSlotHeight)

  // Calculate duration in minutes
  const getEventDuration = () => {
    const [startHours, startMinutes] = event.startTime.split(":").map(Number)
    const [endHours, endMinutes] = event.endTime.split(":").map(Number)

    const startTotalMinutes = startHours * 60 + startMinutes
    const endTotalMinutes = endHours * 60 + endMinutes

    return endTotalMinutes - startTotalMinutes
  }

  const duration = getEventDuration()
  const height = (duration / 60) * hourSlotHeight

  return (
    <div
      className={`absolute ${theme.bg} border ${theme.border} rounded-lg p-2 text-white shadow-lg m-1 flex flex-col space-y-1.5 w-[calc(100%-8px)] z-[5] `}
      style={{ top: `${topPosition}px`, height: `${height}px`, minHeight: "170px" }}
    >
      {/* Course tabs */}
      <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 -mx-1 -mt-1 mb-1 pb-1 flex-shrink-0">
        <div className="flex space-x-1">
          {event.concurrentCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseTabClick(course.id)}
              className={`flex-shrink-0 px-2 py-0.5 text-xs rounded-t ${
                course.active
                  ? "bg-gray-800 text-gray-200 font-medium"
                  : "bg-gray-600 text-gray-400 hover:bg-gray-500 hover:text-gray-200"
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>
      </div>

      {/* Title and tag */}
      <div className="flex justify-between items-center flex-shrink-0">
        <p className="text-sm font-semibold truncate" title={event.title}>
          {event.title}
        </p>
        <span className={`text-xs ${theme.tagBg} ${theme.tagText} px-1.5 py-0.5 rounded flex-shrink-0`}>
          {event.tag}
        </span>
      </div>

      {/* Teacher dropdown */}
      <div className="flex items-center justify-between space-x-2 flex-shrink-0">
        <div className="relative flex-1 min-w-0" ref={teacherDropdownRef}>
          <button
            onClick={handleTeacherDropdownToggle}
            className={`w-full flex items-center justify-between text-left ${theme.buttonBg} ${theme.buttonHoverBg} px-2 py-1 rounded text-sm`}
          >
            <div className="flex items-center space-x-1.5 overflow-hidden">
              <span
                className={`flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full ${theme.teacherInitialBg} text-xs font-bold`}
              >
                {event.teacher.substring(0, 2).toUpperCase()}
              </span>
              <span className="truncate" title={event.teacher}>
                {event.teacher}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 flex-shrink-0 ml-1 transform transition-transform duration-200 ${
                isTeacherDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isTeacherDropdownOpen && (
            <div className="absolute w-28 left-0 mt-1  bg-gray-600 border border-gray-500 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
              <div className="p-2 border-b border-gray-500">
                <input
                  type="text"
                  placeholder="Cercar docent..."
                  value={teacherSearchTerm}
                  onChange={(e) => setTeacherSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 bg-gray-500 text-gray-200 rounded border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <ul className="py-1 w-20">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((docent) => (
                    <li key={docent}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handleSelectTeacher(docent)
                        }}
                        className={`block pl-3 py-1.5  text-sm text-gray-200 hover:bg-gray-500 ${
                          event.teacher === docent ? "bg-blue-700 font-semibold" : ""
                        }`}
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
        <button
          onClick={() => onNavigateToTracking(event.id, event.aula)}
          title="Editar Sessió"
          className={`p-1.5 ${theme.buttonBg} ${theme.buttonHoverBg} rounded flex-shrink-0`}
        >
          <Pencil size={14} />
        </button>
      </div>

      {/* Classroom dropdown and capacity */}
      <div className="flex items-center justify-between space-x-2 text-sm flex-shrink-0 mt-auto">
        <div className="relative flex-1 min-w-0" ref={aulaDropdownRef}>
          <button
            onClick={handleAulaDropdownToggle}
            className={`flex items-center justify-between ${theme.buttonBg} ${theme.buttonHoverBg} px-2 py-1 rounded flex-1 text-left min-w-0`}
          >
            <span className="truncate">Aula {event.aula}</span>
            <ChevronDown
              size={14}
              className={`text-gray-400 flex-shrink-0 ml-1 transform transition-transform duration-200 ${
                isAulaDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isAulaDropdownOpen && (
            <div className="absolute left-0 mt-1 w-full bg-gray-600 border border-gray-500 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {aulas.map((aula) => (
                  <li key={aula}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSelectAula(aula)
                      }}
                      className={`block px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-500 ${
                        event.aula === aula ? "bg-blue-700 font-semibold" : ""
                      }`}
                    >
                      Aula {aula}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={`${theme.capacityBg} px-2 py-1 rounded text-xs flex-shrink-0`}>
          {event.studentsCount}/{event.studentsMax}
        </div>
      </div>

      {/* Time display */}
      <div className="text-xs text-gray-300">
        {event.startTime} - {event.endTime}
      </div>
    </div>
  )
}

export default CalendarEventCard
