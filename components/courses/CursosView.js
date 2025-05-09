"use client"

import React from "react"

import { useState } from "react"
import { Filter, Plus, ChevronDown, Pencil, Trash2, Save } from "lucide-react"
import FilterModal from "../shared/FilterModal"
import AddEditCourseModal from "./AddEditCourseModal"

// Sample Course Data with courseObjectives and teacherInstructions
const sampleCourses = [
    {
        id: "c1",
        code: "REF 3-4 ESO",
        description: "Reforç alumnes 3r i 4rt d'ESO",
        location: "ACT TGN",
        studentCount: 25,
        teacherCount: 3,
        startDate: "2024-09-15",
        endDate: "2025-06-20",
        courseObjectives: "Assolir els conceptes clau de matemàtiques i física. Millorar tècniques d'estudi.",
        teacherInstructions:
            "Repassar setmanalment els dubtes principals. Preparar exercicis addicionals per qui vagi més avançat. Fomentar la participació.",
    },
    {
        id: "c2",
        code: "Ang 1-2 ESO",
        description: "Anglès per a 1r i 2n d'ESO",
        location: "ACT CNS",
        studentCount: 18,
        teacherCount: 2,
        startDate: "2024-09-16",
        endDate: "2025-06-21",
        courseObjectives: "Millorar la comprensió oral i escrita. Ampliar vocabulari bàsic.",
        teacherInstructions: "Utilitzar jocs i activitats dinàmiques. Corregir la pronunciació individualment.",
    },
    {
        id: "c7",
        code: "Ang B2 Prep",
        description: "Preparació examen B2 Cambridge",
        location: "Online",
        studentCount: 15,
        teacherCount: 1,
        startDate: "2025-01-10",
        endDate: "2025-05-30",
        courseObjectives: "Superar l'examen oficial B2 First.",
        teacherInstructions:
            "Treballar totes les parts de l'examen (Reading, Writing, Listening, Speaking). Fer simulacres regulars.",
    },
    {
        id: "c9",
        code: "Mates Selectivitat",
        description: "Matemàtiques per a la Selectivitat (Ciències)",
        location: "ACT TGN",
        studentCount: 12,
        teacherCount: 1,
        startDate: "2025-01-10",
        endDate: "2025-06-05",
        courseObjectives: "Dominar el temari de Selectivitat i obtenir una bona nota.",
        teacherInstructions: "Resolució de models d'examen d'anys anteriors. Aclariment de dubtes específics.",
    },
]

// --- Vista Cursos ---
const CursosView = () => {
    const [courses, setCourses] = useState(sampleCourses)
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
    const [expandedCourseId, setExpandedCourseId] = useState(null)
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState(null)
    const [editingCourseDetails, setEditingCourseDetails] = useState({}) // State for expanded edits
    const [selectedLocalitzacions, setSelectedLocalitzacions] = useState([])
    const [selectedDocents, setSelectedDocents] = useState([])
    const [selectedCursos, setSelectedCursos] = useState([])

    const toggleCourseExpansion = (courseId) => {
        const isCurrentlyExpanded = expandedCourseId === courseId
        setExpandedCourseId(isCurrentlyExpanded ? null : courseId)
        // If expanding, initialize editing state for that course
        if (!isCurrentlyExpanded) {
            const course = courses.find((c) => c.id === courseId)
            setEditingCourseDetails((prev) => ({
                ...prev,
                [courseId]: {
                    courseObjectives: course?.courseObjectives || "",
                    teacherInstructions: course?.teacherInstructions || "",
                },
            }))
        } else {
            // Optionally remove from editing state when collapsing
            setEditingCourseDetails((prev) => {
                const newState = { ...prev }
                delete newState[courseId]
                return newState
            })
        }
    }

    const handleApplyFilters = (filters) => {
        console.log("Applying Cursos Filters:", filters)
        setSelectedLocalitzacions(filters.localitzacions || [])
        setSelectedDocents(filters.docents || [])
        setSelectedCursos(filters.cursos || [])
        setIsFiltersModalOpen(false)
    }

    const handleOpenCourseModal = (course = null) => {
        setEditingCourse(course)
        setIsCourseModalOpen(true)
    }

    const handleSaveCourse = (courseData) => {
        console.log("Saving Course:", courseData)
        if (editingCourse) {
            // Update existing course - keep existing counts
            setCourses((prevCourses) =>
                prevCourses.map((c) =>
                    c.id === editingCourse.id
                        ? { ...c, ...courseData, studentCount: c.studentCount, teacherCount: c.teacherCount }
                        : c,
                ),
            )
        } else {
            // Add new course
            const newCourse = {
                id: `c-${Date.now()}`, // Simple ID generation
                ...courseData,
                studentCount: 0, // Default values
                teacherCount: 0,
            }
            setCourses((prevCourses) => [...prevCourses, newCourse])
        }
        setIsCourseModalOpen(false)
        setEditingCourse(null)
    }

    // Handle changes in the expanded textareas
    const handleDetailChange = (courseId, field, value) => {
        setEditingCourseDetails((prev) => ({
            ...prev,
            [courseId]: {
                ...(prev[courseId] || {}), // Keep existing edits for this course
                [field]: value,
            },
        }))
    }

    // Save changes made in the expanded view
    const handleSaveDetails = (courseId) => {
        const detailsToSave = editingCourseDetails[courseId]
        if (!detailsToSave) return // No changes to save

        setCourses((prevCourses) => prevCourses.map((c) => (c.id === courseId ? { ...c, ...detailsToSave } : c)))
        // Clear editing state for this course
        setEditingCourseDetails((prev) => {
            const newState = { ...prev }
            delete newState[courseId]
            return newState
        })
        console.log("Details saved for course:", courseId, detailsToSave)
        // TODO: Add API call here if needed
    }

    const formatDate = (dateString) => (dateString ? new Date(dateString).toLocaleDateString("ca-ES") : "-")

    // Apply filters to courses
    const filteredCourses = courses.filter((course) => {
        const locationMatch = selectedLocalitzacions.length === 0 || selectedLocalitzacions.includes(course.location)

        // For teacher filtering, we would need teacher data in the course objects
        // This is a placeholder - adjust based on your actual data structure
        const teacherMatch = selectedDocents.length === 0

        // For course filtering, check if the course code or description matches
        const courseMatch =
            selectedCursos.length === 0 ||
            selectedCursos.includes(course.code) ||
            selectedCursos.some((c) => course.description.includes(c))

        return locationMatch && teacherMatch && courseMatch
    })

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Llista de Cursos ({courses.length})</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsFiltersModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                    >
                        <Filter size={20} /> <span className="font-medium hidden sm:inline">Filtrar</span>
                    </button>
                    <button
                        onClick={() => handleOpenCourseModal()}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                    >
                        <Plus size={20} /> <span className="font-medium">Afegir Curs</span>
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-10"
                            ></th>{" "}
                            {/* Columna per a la fletxa */}
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Codi
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Descripció
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Localització
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Alumnes
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Professors
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                Periode
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Accions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {filteredCourses.map((course) => (
                            <React.Fragment key={course.id}>
                                <tr className="hover:bg-gray-700/50 cursor-pointer" onClick={() => toggleCourseExpansion(course.id)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <ChevronDown
                                            size={16}
                                            className={`text-gray-400 transition-transform duration-200 ${expandedCourseId === course.id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{course.code}</td>
                                    <td
                                        className="px-6 py-4 whitespace-normal text-sm text-gray-400 max-w-xs truncate"
                                        title={course.description}
                                    >
                                        {course.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{course.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                                        {course.studentCount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                                        {course.teacherCount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {formatDate(course.startDate)} - {formatDate(course.endDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleOpenCourseModal(course)
                                            }}
                                            className="text-indigo-400 hover:text-indigo-300 mr-2 p-1 rounded hover:bg-gray-700"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                console.log("TODO: Delete course", course.id)
                                            }}
                                            className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-gray-700"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                                {/* Expanded Row */}
                                {expandedCourseId === course.id && (
                                    <tr className="bg-gray-700/30">
                                        <td colSpan="8" className="px-6 py-4">
                                            {" "}
                                            {/* Updated colSpan to 8 */}
                                            <div className="p-4 bg-gray-700 rounded-md space-y-4">
                                                <div>
                                                    <label
                                                        htmlFor={`courseObjectives-${course.id}`}
                                                        className="block text-sm font-semibold text-gray-200 mb-1"
                                                    >
                                                        Objectius del curs
                                                    </label>
                                                    <textarea
                                                        id={`courseObjectives-${course.id}`}
                                                        value={editingCourseDetails[course.id]?.courseObjectives ?? course.courseObjectives}
                                                        onChange={(e) => handleDetailChange(course.id, "courseObjectives", e.target.value)}
                                                        rows="3"
                                                        className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
                                                        placeholder="Descriu els objectius principals del curs..."
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor={`teacherInstructions-${course.id}`}
                                                        className="block text-sm font-semibold text-gray-200 mb-1"
                                                    >
                                                        Indicacions per al professorat
                                                    </label>
                                                    <textarea
                                                        id={`teacherInstructions-${course.id}`}
                                                        value={editingCourseDetails[course.id]?.teacherInstructions ?? course.teacherInstructions}
                                                        onChange={(e) => handleDetailChange(course.id, "teacherInstructions", e.target.value)}
                                                        rows="4"
                                                        className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
                                                        placeholder="Afegeix indicacions o detalls rellevants per als professors que imparteixin aquest curs..."
                                                    />
                                                </div>
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={() => handleSaveDetails(course.id)}
                                                        disabled={
                                                            !editingCourseDetails[course.id] ||
                                                            (editingCourseDetails[course.id]?.courseObjectives === course.courseObjectives &&
                                                                editingCourseDetails[course.id]?.teacherInstructions === course.teacherInstructions)
                                                        }
                                                        className={`flex items-center space-x-1 px-3 py-1 rounded text-xs ${!editingCourseDetails[course.id] ||
                                                                (
                                                                    editingCourseDetails[course.id]?.courseObjectives === course.courseObjectives &&
                                                                    editingCourseDetails[course.id]?.teacherInstructions === course.teacherInstructions
                                                                )
                                                                ? "bg-gray-500 text-gray-400 cursor-not-allowed"
                                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                                            }`}
                                                    >
                                                        <Save size={14} /> <span>Desar Detalls</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        {filteredCourses.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-gray-500 italic">
                                    No hi ha cursos definits.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Filter Modal for Courses */}
            <FilterModal
                isOpen={isFiltersModalOpen}
                onClose={() => setIsFiltersModalOpen(false)}
                onApplyFilters={handleApplyFilters}
                initialFilters={{
                    localitzacions: selectedLocalitzacions,
                    docents: selectedDocents,
                    cursos: selectedCursos,
                }}
                title="Filtres Cursos"
                showGroupBy={false}
            />
            {/* Add/Edit Course Modal */}
            <AddEditCourseModal
                isOpen={isCourseModalOpen}
                onClose={() => {
                    setIsCourseModalOpen(false)
                    setEditingCourse(null)
                }}
                onSave={handleSaveCourse}
                initialData={editingCourse}
            />
        </div>
    )
}

export default CursosView
