"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"
import CalendarEventCard from "./CalendarEventCard"
import FilterModal from "../shared/FilterModal"

// --- Dades de Mostra ---
const sampleCalendarEvents = [
  {
    id: "session-123",
    title: "Reforç - 3/4 ESO",
    tag: "ACT TGN",
    teacher: "Gabriela Soler",
    teacherId: "teacher-gabriela",
    aula: 5,
    studentsCount: 2,
    studentsMax: 5,
    startTime: "17:30",
    endTime: "18:30",
    day: "Dilluns",
    status: "confirmed",
    colorTheme: "blue",
    concurrentCourses: [
      { id: "c1", name: "Ref 3-4 ESO", active: true },
      { id: "c2", name: "Ang 1-2 ESO", active: false },
      { id: "c3", name: "Ang B1", active: false },
      { id: "c4", name: "Ref 1-2 BAT", active: false },
      { id: "c5", name: "Extra Llarg", active: false },
      { id: "c6", name: "Un Altre", active: false },
    ],
  },
  {
    id: "session-456",
    title: "Anglès B2 Prep",
    tag: "IDIOMES",
    teacher: "David Martí",
    teacherId: "teacher-david",
    aula: 2,
    studentsCount: 4,
    studentsMax: 6,
    startTime: "18:30",
    endTime: "19:30",
    day: "Dimecres",
    status: "pending",
    colorTheme: "purple",
    concurrentCourses: [
      { id: "c7", name: "Ang B2 Prep", active: true },
      { id: "c8", name: "Francès A1", active: false },
    ],
  },
  {
    id: "session-789",
    title: "Mates Selectivitat",
    tag: "CIÈNCIES",
    teacher: "Laura Puig",
    teacherId: "teacher-laura",
    aula: 1,
    studentsCount: 5,
    studentsMax: 5,
    startTime: "19:30",
    endTime: "20:30",
    day: "Dijous",
    status: "confirmed",
    colorTheme: "orange",
    concurrentCourses: [{ id: "c9", name: "Mates Select.", active: true }],
  },
]

// Vista Calendari/Horari - Filters as Modal
const CalendarView = ({ onNavigateToTracking }) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [events, setEvents] = useState(sampleCalendarEvents)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("Setmana")
  const [selectedLocalitzacions, setSelectedLocalitzacions] = useState([])
  const [selectedAules, setSelectedAules] = useState([])
  const [selectedDocents, setSelectedDocents] = useState([])
  const [selectedAlumnes, setSelectedAlumnes] = useState([])
  const [selectedCursos, setSelectedCursos] = useState([])
  const [selectedGroupBy, setSelectedGroupBy] = useState("Aula")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePrevWeek = () => console.log("Previous Week")
  const handleNextWeek = () => console.log("Next Week")
  const handleToday = () => setCurrentDate(new Date())
  const allDaysOfWeek = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"]
  const daysToShow = windowWidth < 768 ? allDaysOfWeek.slice(0, 3) : allDaysOfWeek
  const gridColsClass = `grid-cols-${daysToShow.length}`
  const timeSlotsStartHour = 17
  const totalHours = 5
  const hourSlotHeight = 100

  const handleEventUpdate = (eventId, updatedData) => {
    setEvents((prevEvents) => prevEvents.map((event) => (event.id === eventId ? { ...event, ...updatedData } : event)))
    console.log(`Updated event ${eventId}:`, updatedData)
  }

  const handleApplyFilters = (filters) => {
    console.log("Applying Calendar Filters:", filters)
    setSelectedLocalitzacions(filters.localitzacions)
    setSelectedAules(filters.aules)
    setSelectedDocents(filters.docents)
    setSelectedAlumnes(filters.alumnes)
    setSelectedCursos(filters.cursos)
    setSelectedGroupBy(filters.groupBy)
    setIsFiltersModalOpen(false)
  }

  const filteredEvents = events // Placeholder

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <button onClick={handlePrevWeek} className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextWeek} className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
            <ChevronRight size={20} />
          </button>
          <button
            onClick={handleToday}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600"
          >
            Today
          </button>
        </div>
        <div className="text-lg font-semibold text-white text-center hidden sm:block">Setmana 18 - 25 de març 2025</div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-0.5">
            {["Dia", "Setmana", "Mes"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === mode ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:bg-gray-600 hover:text-gray-200"}`}
              >
                {mode}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsFiltersModalOpen(true)}
            className="p-2 rounded-lg text-gray-400 bg-gray-700 hover:bg-gray-600 hover:text-white"
            title="Filtrar Horaris"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 relative">
        <div className="absolute left-0 top-4 w-[45px] text-right text-xs text-gray-500 pr-1 z-[1]">
          {Array.from({ length: totalHours }).map((_, i) => (
            <div
              key={`time-${i}`}
              style={{ height: `${hourSlotHeight}px` }}
              className="flex justify-end items-start pt-0.5"
            >
              <span>{i + timeSlotsStartHour}:00</span>
            </div>
          ))}
        </div>
        <div className={`grid ${gridColsClass} gap-px bg-gray-700 border border-gray-700 ml-[50px]`}>
          {daysToShow.map((day, index) => {
            const isWeekend = allDaysOfWeek.indexOf(day) >= 5
            const eventsForDay = filteredEvents.filter((event) => event.day === day)
            return (
              <div
                key={day + "-col"}
                className={`relative ${isWeekend ? "bg-gray-800/50" : "bg-gray-800"} min-h-[${totalHours * hourSlotHeight}px]`}
              >
                {Array.from({ length: totalHours }).map((_, i) => (
                  <div
                    key={`line-${day}-${i}`}
                    className="absolute border-t border-gray-700/50 w-full"
                    style={{ top: `${(i + 1) * hourSlotHeight}px` }}
                  ></div>
                ))}
                {eventsForDay.map((event) => (
                  <CalendarEventCard
                    key={event.id}
                    event={event}
                    onNavigateToTracking={onNavigateToTracking}
                    onEventUpdate={handleEventUpdate}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
      <FilterModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={{
          localitzacions: selectedLocalitzacions,
          aules: selectedAules,
          docents: selectedDocents,
          alumnes: selectedAlumnes,
          cursos: selectedCursos,
          groupBy: selectedGroupBy,
        }}
        title="Filtres Horaris"
        showGroupBy={true}
      />
    </div>
  )
}

export default CalendarView
