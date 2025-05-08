"use client"

import { useState } from "react"
import { Filter, Plus, Pencil, Trash2, CalendarDays } from "lucide-react"
import FilterModal from "../shared/FilterModal"
import AddEditProfessorModal from "./AddEditProfessorModal"
import AvailabilityModal from "./AvailabilityModal"

// Sample Teacher Data
const sampleTeachers = [
  {
    id: "t1",
    name: "Gabriela Soler",
    status: "Actiu",
    email: "gsoler@academia.com",
    services: ["REF 3-4 ESO", "Mates Selectivitat"],
    availability: [
      { day: "Dll", startTime: "16:00", endTime: "20:00" },
      { day: "Dm", startTime: "16:00", endTime: "20:00" },
      { day: "Dc", startTime: "16:00", endTime: "20:00" },
      { day: "Dj", startTime: "16:00", endTime: "20:00" },
    ],
    hoursThisMonth: 65.5,
  },
  {
    id: "t2",
    name: "David Martí",
    status: "Actiu",
    email: "dmarti@academia.com",
    services: ["Ang 1-2 ESO", "Ang B2 Prep", "Francès A1"],
    availability: [
      { day: "Dm", startTime: "10:00", endTime: "13:00" },
      { day: "Dm", startTime: "16:00", endTime: "19:00" },
      { day: "Dc", startTime: "10:00", endTime: "13:00" },
      { day: "Dj", startTime: "16:00", endTime: "19:00" },
      { day: "Dv", startTime: "10:00", endTime: "13:00" },
    ],
    hoursThisMonth: 72.0,
  },
  {
    id: "t3",
    name: "Laura Puig",
    status: "Actiu",
    email: "lpuig@academia.com",
    services: ["Mates Selectivitat", "Física 1r BAT", "Química Selectivitat"],
    availability: [
      { day: "Dll", startTime: "17:00", endTime: "21:00" },
      { day: "Dc", startTime: "17:00", endTime: "21:00" },
      { day: "Dv", startTime: "17:00", endTime: "21:00" },
    ],
    hoursThisMonth: 58.0,
  },
  {
    id: "t4",
    name: "Marc Font",
    status: "Baixa",
    email: "mfont@academia.com",
    services: ["Català ESO"],
    availability: [],
    hoursThisMonth: 0,
  },
  {
    id: "t5",
    name: "Anna Vidal",
    status: "Actiu",
    email: "avidal@academia.com",
    services: ["Història BAT"],
    availability: [
      { day: "Dll", startTime: "16:30", endTime: "19:30" },
      { day: "Dc", startTime: "16:30", endTime: "19:30" },
      { day: "Dv", startTime: "16:30", endTime: "19:30" },
    ],
    hoursThisMonth: 45.0,
  },
]

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
const teacherStatuses = ["Actiu", "Inactiu", "Baixa"]

// --- Vista Professors ---
const ProfessorsView = () => {
  const [teachers, setTeachers] = useState(sampleTeachers)
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isProfessorModalOpen, setIsProfessorModalOpen] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)) // format YYYY-MM
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [editingAvailabilityProfessor, setEditingAvailabilityProfessor] = useState(null)

  // State for filters
  const [filterService, setFilterService] = useState([])
  const [filterStatus, setFilterStatus] = useState([])

  const handleApplyFilters = (filters) => {
    console.log("Applying Professors Filters:", filters)
    setFilterService(filters.servei || [])
    setFilterStatus(filters.estat || [])
    setIsFiltersModalOpen(false)
  }

  // Filter logic
  const filteredTeachers = teachers.filter((teacher) => {
    const serviceMatch = filterService.length === 0 || teacher.services.some((s) => filterService.includes(s))
    const statusMatch = filterStatus.length === 0 || filterStatus.includes(teacher.status)
    // TODO: Add logic to filter hours based on selectedMonth if needed
    return serviceMatch && statusMatch
  })

  const handleOpenProfessorModal = (professor = null) => {
    setEditingProfessor(professor)
    setIsProfessorModalOpen(true)
  }

  const handleSaveProfessor = (professorData) => {
    console.log("Saving Professor:", professorData)
    if (editingProfessor) {
      // Preserve existing availability when editing general info
      setTeachers((prev) =>
        prev.map((t) => (t.id === editingProfessor.id ? { ...t, ...professorData, availability: t.availability } : t)),
      )
    } else {
      const newProfessor = { id: `t-${Date.now()}`, hoursThisMonth: 0, availability: [], ...professorData } // Add default availability for new prof
      setTeachers((prev) => [...prev, newProfessor])
    }
    setIsProfessorModalOpen(false)
    setEditingProfessor(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Actiu":
        return "bg-green-800 text-green-100"
      case "Inactiu":
        return "bg-gray-700 text-gray-300"
      case "Baixa":
        return "bg-red-800 text-red-100"
      default:
        return "bg-gray-700 text-gray-400"
    }
  }

  const getServiceChipColor = (serviceName) => {
    let hash = 0
    for (let i = 0; i < serviceName.length; i++) {
      hash = serviceName.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash
    }
    const colors = [
      "bg-blue-800 text-blue-100",
      "bg-purple-800 text-purple-100",
      "bg-green-800 text-green-100",
      "bg-yellow-800 text-yellow-100",
      "bg-red-800 text-red-100",
      "bg-indigo-800 text-indigo-100",
      "bg-pink-800 text-pink-100",
      "bg-teal-800 text-teal-100",
    ]
    const index = Math.abs(hash % colors.length)
    return colors[index]
  }

  const handleOpenAvailabilityModal = (professor) => {
    setEditingAvailabilityProfessor(professor)
    setIsAvailabilityModalOpen(true)
  }

  const handleSaveAvailability = (professorId, newAvailability) => {
    console.log("Saving Availability for:", professorId, newAvailability)
    setTeachers((prevTeachers) =>
      prevTeachers.map((t) => (t.id === professorId ? { ...t, availability: newAvailability } : t)),
    )
    setIsAvailabilityModalOpen(false)
    setEditingAvailabilityProfessor(null)
  }

  // --- Availability Summary Component ---
  const AvailabilitySummary = ({ availability }) => {
    const days = ["Dll", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg"]
    const summary = { M: Array(7).fill(false), T: Array(7).fill(false) } // Matí, Tarda

    availability?.forEach((slot) => {
      const dayIndex = days.indexOf(slot.day)
      if (dayIndex !== -1) {
        const startHour = Number.parseInt(slot.startTime.split(":")[0], 10)
        const endHour = Number.parseInt(slot.endTime.split(":")[0], 10)
        // Check morning (e.g., before 14:00)
        if (startHour < 14) summary.M[dayIndex] = true
        // Check afternoon (e.g., 14:00 onwards)
        if (endHour > 14 || startHour >= 14) summary.T[dayIndex] = true
      }
    })

    return (
      <div className="flex space-x-1">
        {days.map((day, index) => (
          <div key={day} className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-0.5">{day}</span>
            <div className="flex flex-col space-y-px">
              {" "}
              {/* Changed to flex-col */}
              <div
                className={`w-1.5 h-1.5 rounded-full ${summary.M[index] ? "bg-green-500" : "bg-red-700"}`}
                title={`${day} Matí ${summary.M[index] ? "Disponible" : "No Disponible"}`}
              ></div>
              <div
                className={`w-1.5 h-1.5 rounded-full ${summary.T[index] ? "bg-green-500" : "bg-red-700"}`}
                title={`${day} Tarda ${summary.T[index] ? "Disponible" : "No Disponible"}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-white">Llista de Professors ({filteredTeachers.length})</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="monthSelectorProf" className="text-sm font-medium text-gray-400">
            Mes:
          </label>
          <input
            type="month"
            id="monthSelectorProf"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={() => setIsFiltersModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out text-sm"
          >
            <Filter size={16} /> <span className="hidden sm:inline">Filtrar</span>
          </button>
          <button
            onClick={() => handleOpenProfessorModal()}
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out text-sm"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Afegir Professor</span>
          </button>
        </div>
      </div>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Nom
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Estat
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Correu Electrònic
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Serveis
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Disponibilitat
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Hores Mes
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Accions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      teacher.status,
                    )}`}
                  >
                    {teacher.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {teacher.services?.map((service) => (
                      <span
                        key={service}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getServiceChipColor(
                          service,
                        )}`}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <AvailabilitySummary availability={teacher.availability} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                  {teacher.hoursThisMonth?.toFixed(1)} h
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenAvailabilityModal(teacher)}
                    className="text-blue-400 hover:text-blue-300 mr-2 p-1 rounded hover:bg-gray-700"
                    title="Configurar Disponibilitat"
                  >
                    <CalendarDays size={16} />
                  </button>
                  <button
                    onClick={() => handleOpenProfessorModal(teacher)}
                    className="text-indigo-400 hover:text-indigo-300 mr-2 p-1 rounded hover:bg-gray-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => console.log("TODO: Delete teacher", teacher.id)}
                    className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-gray-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredTeachers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500 italic">
                  No hi ha professors que coincideixin amb els filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Filter Modal for Professors */}
      <FilterModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={{
          // Pass current filter values
          servei: filterService,
          estat: filterStatus,
        }}
        title="Filtres Professors"
      />
      {/* Add/Edit Professor Modal */}
      <AddEditProfessorModal
        isOpen={isProfessorModalOpen}
        onClose={() => {
          setIsProfessorModalOpen(false)
          setEditingProfessor(null)
        }}
        onSave={handleSaveProfessor}
        initialData={editingProfessor}
      />
      {/* Availability Modal */}
      <AvailabilityModal
        isOpen={isAvailabilityModalOpen}
        onClose={() => setIsAvailabilityModalOpen(false)}
        professor={editingAvailabilityProfessor}
        onSave={handleSaveAvailability}
      />
    </div>
  )
}

export default ProfessorsView
