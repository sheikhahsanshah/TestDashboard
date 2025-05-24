"use client"

import { useState } from "react"
import { Filter, Plus } from "lucide-react"
import FilterModal from "../shared/FilterModal"
import AddNewStudentModal from "./AddNewStudentModal"

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
        birthDate: "2008-05-15",
        school: "Institut Martí Franquès",
        email: "pau.torres@email.com",
        imageAuth: true,
        emergencyName: "Maria Garcia",
        emergencyRelation: "Mare",
        emergencyPhone: "600111222",
        objective: "Millorar nota Mates",
        currentCourseLevel: "4t ESO",
        attendanceStats: { percentage: 75, averageRating: 4.6 },
        observations: "Intentar que no miri el mòbil durant la classe",
        nese: "Cap detectada",
        referringTeacher: "Gabriela Soler",
        incidents: [
            {
                date: "2025-04-12T18:32:00",
                reporter: "Gabriela Gómez",
                title: "Material oblidat",
                description: "L'alumne no porta el material a classe. Fa dies que passa, sol·licitem avisar als pares.",
            },
            {
                date: "2025-04-05T17:45:00",
                reporter: "Marta Pons",
                title: "Incidència de comportament",
                description: "El Pau intentava mirar el mòbil durant tota la hora.",
            },
        ],
        pastSessions: [
            { date: "2025-04-04", rating: 5, progressNotes: "Progrés de gegant", type: "feedback" },
            { date: "2025-04-06", rating: 3, progressNotes: "Ha fet exercicis de derivades", type: "feedback" },
            { date: "2025-04-07", rating: null, progressNotes: "Examen Matemàtiques", type: "exam" },
            { date: "2025-04-08", rating: 4, progressNotes: "Millora en equacions", type: "feedback" },
            { date: "2025-04-11", rating: null, progressNotes: "", type: "session" },
            { date: "2025-04-13", rating: null, progressNotes: "Examen Català", type: "exam" },
            { date: "2025-04-23", rating: null, progressNotes: "Examen Física", type: "exam" },
        ],
        objectiveHistory: [
            { date: "2024-09-10", value: "Adaptació inicial" },
            { date: "2025-01-15", value: "Millorar nota Mates" },
        ],
        observationsHistory: [
            { date: "2025-02-20", value: "Es distreu fàcilment." },
            { date: "2025-04-05", value: "Intentar que no miri el mòbil durant la classe" },
        ],
        neseHistory: [{ date: "2024-09-10", value: "Cap detectada" }],
        referringTeacherHistory: [
            { date: "2024-09-10", value: "David Martí" },
            { date: "2025-01-01", value: "Gabriela Soler" },
        ],
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
        birthDate: "2009-02-10",
        school: "Col·legi Sant Pau",
        email: "guillem.mercuri@email.com",
        imageAuth: false,
        emergencyName: "Joan Mercuri",
        emergencyRelation: "Pare",
        emergencyPhone: "600333444",
        objective: "Reforç general",
        currentCourseLevel: "3r ESO",
        attendanceStats: { percentage: 90, averageRating: 4.1 },
        observations: "",
        nese: "",
        referringTeacher: "David Martí",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2008-11-20",
        school: "Institut Campclar",
        email: "helena.gimeno@email.com",
        imageAuth: true,
        emergencyName: "Carles Gimeno",
        emergencyRelation: "Pare",
        emergencyPhone: "600555666",
        objective: "Aprovar Mates",
        currentCourseLevel: "4t ESO",
        attendanceStats: { percentage: 95, averageRating: 4.8 },
        observations: "",
        nese: "",
        referringTeacher: "Gabriela Soler",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2006-07-01",
        school: "Institut Pons d'Icart",
        email: "sofia.camps@email.com",
        imageAuth: true,
        emergencyName: "Laura Vidal",
        emergencyRelation: "Mare",
        emergencyPhone: "600777888",
        objective: "Preparar B2",
        currentCourseLevel: "1r BATX",
        attendanceStats: { percentage: 88, averageRating: 4.2 },
        observations: "",
        nese: "",
        referringTeacher: "David Martí",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2006-03-25",
        school: "La Salle Tarragona",
        email: "marti.lopez@email.com",
        imageAuth: true,
        emergencyName: "Jordi López",
        emergencyRelation: "Pare",
        emergencyPhone: "600999000",
        objective: "Pujar nota Física",
        currentCourseLevel: "1r BATX",
        attendanceStats: { percentage: 92, averageRating: 4.5 },
        observations: "",
        nese: "",
        referringTeacher: "Laura Puig",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2005-09-12",
        school: "Institut Martí Franquès",
        email: "julia.ferrer@email.com",
        imageAuth: false,
        emergencyName: "Anna Martí",
        emergencyRelation: "Mare",
        emergencyPhone: "601111222",
        objective: "Selectivitat",
        currentCourseLevel: "2n BATX",
        attendanceStats: { percentage: 80, averageRating: 3.9 },
        observations: "",
        nese: "",
        referringTeacher: "Laura Puig",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2010-01-30",
        school: "Col·legi Sant Pau",
        email: "nil.bosch@email.com",
        imageAuth: true,
        emergencyName: "Marta Puig",
        emergencyRelation: "Mare",
        emergencyPhone: "601333444",
        objective: "Millorar redacció",
        currentCourseLevel: "1r ESO",
        attendanceStats: { percentage: 98, averageRating: 4.9 },
        observations: "",
        nese: "",
        referringTeacher: "Marc Font",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2006-12-05",
        school: "Institut Pons d'Icart",
        email: "aina.sole@email.com",
        imageAuth: true,
        emergencyName: "David Sol��",
        emergencyRelation: "Pare",
        emergencyPhone: "601555666",
        objective: "Selectivitat Història",
        currentCourseLevel: "2n BATX",
        attendanceStats: { percentage: 85, averageRating: 4.0 },
        observations: "",
        nese: "",
        referringTeacher: "Anna Vidal",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2007-06-18",
        school: "La Salle Tarragona",
        email: "pol.romero@email.com",
        imageAuth: false,
        emergencyName: "Eva Sans",
        emergencyRelation: "Mare",
        emergencyPhone: "601777888",
        objective: "Entendre Plató",
        currentCourseLevel: "1r BATX",
        attendanceStats: { percentage: 91, averageRating: 4.3 },
        observations: "",
        nese: "",
        referringTeacher: "Jordi Serra",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
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
        birthDate: "2007-10-08",
        school: "Institut Martí Franquès",
        email: "carla.esteve@email.com",
        imageAuth: true,
        emergencyName: "Robert Esteve",
        emergencyRelation: "Pare",
        emergencyPhone: "601999000",
        objective: "Millorar perspectiva",
        currentCourseLevel: "1r BATX",
        attendanceStats: { percentage: 93, averageRating: 4.7 },
        observations: "",
        nese: "",
        referringTeacher: "Clara Pons",
        incidents: [],
        pastSessions: [],
        objectiveHistory: [],
        observationsHistory: [],
        neseHistory: [],
        referringTeacherHistory: [],
    },
]

// --- Vista Alumnes --- - Filters as Modal
const AlumnesView = ({ navigateToStudentDetail }) => {
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
    const [selectedStudents, setSelectedStudents] = useState(new Set())
    const [selectAll, setSelectAll] = useState(false)
    const [isAddNewStudentModalOpen, setIsAddNewStudentModalOpen] = useState(false)
    const [selectedLocalitzacions, setSelectedLocalitzacions] = useState([])
    const [selectedAules, setSelectedAules] = useState([])
    const [selectedDocents, setSelectedDocents] = useState([])
    const [selectedCursos, setSelectedCursos] = useState([])

    // Sorting state
    const [sortColumn, setSortColumn] = useState(null)
    const [sortDirection, setSortDirection] = useState("asc")

    const filteredStudentList = allStudentsList // Placeholder

    // Sorting functions
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const getSortedStudents = (students) => {
        if (!sortColumn) return students

        return [...students].sort((a, b) => {
            let aValue, bValue

            switch (sortColumn) {
                case "name":
                    aValue = a.name?.toLowerCase() || ""
                    bValue = b.name?.toLowerCase() || ""
                    break
                case "courses":
                    aValue = a.courses?.length || 0
                    bValue = b.courses?.length || 0
                    break
                case "lastContact":
                    aValue = a.lastContact ? new Date(a.lastContact) : new Date(0)
                    bValue = b.lastContact ? new Date(b.lastContact) : new Date(0)
                    break
                case "firstEnrollment":
                    aValue = a.firstEnrollment ? new Date(a.firstEnrollment) : new Date(0)
                    bValue = b.firstEnrollment ? new Date(b.firstEnrollment) : new Date(0)
                    break
                default:
                    return 0
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
            return 0
        })
    }

    const getSortIcon = (column) => {
        if (sortColumn !== column) {
            return <span className="text-gray-500 ml-1">↕</span>
        }
        return <span className="text-blue-400 ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
    }

    const sortedStudentList = getSortedStudents(filteredStudentList)

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked
        setSelectAll(isChecked)
        if (isChecked) {
            const allIds = new Set(sortedStudentList.map((s) => s.id))
            setSelectedStudents(allIds)
        } else {
            setSelectedStudents(new Set())
        }
    }

    const handleSelectStudent = (studentId) => {
        setSelectedStudents((prevSelected) => {
            const newSelected = new Set(prevSelected)
            if (newSelected.has(studentId)) {
                newSelected.delete(studentId)
            } else {
                newSelected.add(studentId)
            }
            setSelectAll(newSelected.size === sortedStudentList.length && sortedStudentList.length > 0)
            return newSelected
        })
    }

    const handleCreateNewStudent = (newStudentData) => {
        console.log("Creating new student:", newStudentData)
        setIsAddNewStudentModalOpen(false)
    }

    const handleApplyFilters = (filters) => {
        console.log("Applying Alumnes Filters:", filters)
        setSelectedLocalitzacions(filters.localitzacions)
        setSelectedAules(filters.aules)
        setSelectedDocents(filters.docents)
        setSelectedCursos(filters.cursos)
        setIsFiltersModalOpen(false)
    }

    const getCourseChipColor = (courseName) => {
        let hash = 0
        for (let i = 0; i < courseName.length; i++) {
            hash = courseName.charCodeAt(i) + ((hash << 5) - hash)
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

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-x-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Llista d'Alumnes ({sortedStudentList.length})</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setIsFiltersModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                        >
                            <Filter size={20} /> <span className="font-medium hidden sm:inline">Filtrar</span>
                        </button>
                        <button
                            onClick={() => setIsAddNewStudentModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                        >
                            <Plus size={20} /> <span className="font-medium">Afegir Alumne</span>
                        </button>
                    </div>
                </div>
                <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col" className="p-4">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                                    onClick={() => handleSort("name")}
                                >
                                    <div className="flex items-center">
                                        Nom
                                        {getSortIcon("name")}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                                    onClick={() => handleSort("courses")}
                                >
                                    <div className="flex items-center">
                                        Cursos
                                        {getSortIcon("courses")}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                                    onClick={() => handleSort("lastContact")}
                                >
                                    <div className="flex items-center">
                                        Últim Contacte
                                        {getSortIcon("lastContact")}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                                    onClick={() => handleSort("firstEnrollment")}
                                >
                                    <div className="flex items-center">
                                        Primera Alta
                                        {getSortIcon("firstEnrollment")}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {sortedStudentList.map((student) => (
                                <tr
                                    key={student.id}
                                    className="hover:bg-gray-700/50 cursor-pointer"
                                    onClick={() => navigateToStudentDetail(student.id)}
                                >
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                            checked={selectedStudents.has(student.id)}
                                            onChange={(e) => {
                                                e.stopPropagation()
                                                handleSelectStudent(student.id)
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full border border-gray-600"
                                                    src={student.avatarUrl || "/placeholder.svg"}
                                                    alt={student.name}
                                                    onError={(e) => {
                                                        e.target.src = `https://placehold.co/40x40/4B5563/9CA3AF?text=Err`
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-100">{student.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                            {student.courses?.map((course) => (
                                                <span
                                                    key={course}
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCourseChipColor(course)}`}
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{student.lastContact || "-"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {student.firstEnrollment || "-"}
                                    </td>
                                </tr>
                            ))}
                            {sortedStudentList.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500 italic">
                                        No s'han trobat alumnes amb els filtres seleccionats.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddNewStudentModal
                isOpen={isAddNewStudentModalOpen}
                onClose={() => setIsAddNewStudentModalOpen(false)}
                onSave={handleCreateNewStudent}
            />
            <FilterModal
                isOpen={isFiltersModalOpen}
                onClose={() => setIsFiltersModalOpen(false)}
                onApplyFilters={handleApplyFilters}
                initialFilters={{
                    localitzacions: selectedLocalitzacions,
                    aules: selectedAules,
                    docents: selectedDocents,
                    cursos: selectedCursos,
                }}
                title="Filtres Alumnes"
                showGroupBy={false}
            />
        </div>
    )
}

export default AlumnesView
