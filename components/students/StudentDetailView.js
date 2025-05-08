"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, BarChart2, BookOpen, Briefcase, Star, FileText, ChevronLeft, ChevronRight, ChevronDown, History, Clock, CreditCard, Trash2, Plus, Pencil, X, Save } from 'lucide-react'
import HistoryModal from "../modals/HistoryModal"

// --- Vista Detall Alumne ---
const StudentDetailView = ({ student: studentProp, onNavigateBack, onUpdateStudent }) => {
    const [activeTab, setActiveTab] = useState("comercial")
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
    const [historyModalTitle, setHistoryModalTitle] = useState("")
    const [historyModalData, setHistoryModalData] = useState([])
    const [currentStudentData, setCurrentStudentData] = useState(studentProp)

    useEffect(() => {
        setCurrentStudentData(studentProp)
    }, [studentProp])

    if (!currentStudentData) {
        return <div className="p-8 text-center text-gray-400">Alumne no trobat. Torna a la llista d'alumnes.</div>
    }

    const tabs = [
        { id: "comercial", label: "Contracte", icon: Briefcase },
        { id: "seguiment", label: "Seguiment", icon: BarChart2 },
        { id: "gestio_cursos", label: "Gestió de cursos", icon: BookOpen },
        { id: "avaluacio", label: "Avaluació", icon: Star },
        { id: "dades", label: "Dades", icon: FileText },
    ]

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

    const openHistoryModal = (title, data) => {
        setHistoryModalTitle(title)
        setHistoryModalData(data || [])
        setIsHistoryModalOpen(true)
    }

    const handleLocalStudentUpdate = (updatedFields) => {
        const updatedStudent = { ...currentStudentData, ...updatedFields }
        setCurrentStudentData(updatedStudent)
        if (onUpdateStudent) {
            onUpdateStudent(currentStudentData.id, updatedFields)
        }
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "seguiment":
                return <SeguimentTabContent student={currentStudentData} openHistoryModal={openHistoryModal} />
            case "gestio_cursos":
                return <GestioCursosTabContent student={currentStudentData} onUpdateStudent={handleLocalStudentUpdate} />
            case "comercial":
                return <ComercialTabContent student={currentStudentData} onUpdateStudent={handleLocalStudentUpdate} />
            case "avaluacio":
                return <AvaluacioTabContent student={currentStudentData} onUpdateStudent={handleLocalStudentUpdate} />
            case "dades":
                return <DadesTabContent student={currentStudentData} onUpdateStudent={handleLocalStudentUpdate} />
            default:
                return null
        }
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 text-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-700">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <button
                        onClick={onNavigateBack}
                        title="Tornar a Alumnes"
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <img
                        src={
                            currentStudentData.avatarUrl ||
                            `https://placehold.co/64x64/374151/E5E7EB?text=${currentStudentData.name.substring(0, 2).toUpperCase() || "/placeholder.svg"
                            }`
                        }
                        alt={currentStudentData.name}
                        className="w-16 h-16 rounded-full border-2 border-gray-600"
                        onError={(e) => {
                            e.target.src = `https://placehold.co/64x64/4B5563/9CA3AF?text=Err`
                        }}
                    />
                    <div>
                        <h2 className="text-2xl font-semibold text-white">{currentStudentData.name}</h2>
                        <p className="text-sm text-gray-400">{currentStudentData.currentCourseLevel || "Nivell no especificat"}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
                    <p className="text-sm text-gray-400">
                        <span className="font-medium text-gray-300">Objectiu:</span> {currentStudentData.objective || "No definit"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                        <span className="text-sm font-medium text-gray-300 mr-1">Cursos:</span>
                        {currentStudentData.courses?.map((course) => (
                            <span
                                key={course.id || course}
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCourseChipColor(
                                    course.name || course,
                                )}`}
                            >
                                {course.name || course}
                            </span>
                        )) || <span className="text-sm text-gray-400 italic">Cap curs assignat</span>}
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-3 px-3 border-b-2 font-medium text-sm flex items-center space-x-2 focus:outline-none transition-colors ${tab.id === "comercial"
                                    ? activeTab === tab.id
                                        ? "bg-blue-600 text-white rounded-t-lg border-blue-600"
                                        : "bg-gray-700 text-gray-300 rounded-t-lg border-gray-700 hover:bg-gray-600"
                                    : activeTab === tab.id
                                        ? "border-blue-500 text-blue-400"
                                        : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500"
                                }`}
                        >
                            <tab.icon size={16} /> <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
            <div>{renderTabContent()}</div>
            <HistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                title={historyModalTitle}
                historyData={historyModalData}
            />
        </div>
    )
}

// --- Contingut Pestanya Seguiment ---
const SeguimentTabContent = ({ student, openHistoryModal }) => {
    const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date(2025, 3, 1)) // Start with April 2025

    const daysInMonth = new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth(), 1).getDay()
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const getSessionForDate = (day) => {
        const dateStr = `${currentDisplayDate.getFullYear()}-${String(currentDisplayDate.getMonth() + 1).padStart(
            2,
            "0",
        )}-${String(day).padStart(2, "0")}`
        return student.pastSessions?.find((s) => s.date === dateStr) || null
    }

    const changeMonth = (offset) => {
        setCurrentDisplayDate((prevDate) => {
            const newDate = new Date(prevDate)
            newDate.setMonth(newDate.getMonth() + offset)
            return newDate
        })
    }

    return (
        <div className="space-y-6">
            {/* Calendar Section */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-1 rounded-md hover:bg-gray-700">
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-lg font-semibold text-white">
                        {currentDisplayDate.toLocaleString("ca-ES", { month: "long", year: "numeric" })}
                    </h3>
                    <button onClick={() => changeMonth(1)} className="p-1 rounded-md hover:bg-gray-700">
                        <ChevronRight size={20} />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-2">
                    <div>Dl</div> <div>Dt</div> <div>Dc</div> <div>Dj</div> <div>Dv</div> <div>Ds</div> <div>Dg</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-24 bg-gray-700/30 rounded"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const session = getSessionForDate(day)
                        return (
                            <div
                                key={day}
                                className="h-24 bg-gray-700 rounded p-1.5 text-left relative overflow-hidden flex flex-col"
                            >
                                <span className="text-xs font-semibold self-start mb-1">{day}</span>
                                {session && (
                                    <div
                                        className={`mt-auto p-1.5 rounded text-xs ${session.type === "exam" ? "bg-blue-600/80" : session.rating ? "bg-teal-600/80" : "bg-gray-600/80"
                                            } text-white`}
                                    >
                                        {session.type === "feedback" && session.rating && (
                                            <div className="flex items-center mb-0.5">
                                                <span className="font-semibold mr-1">Rend:</span>
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        size={10}
                                                        fill={starIndex < session.rating ? "currentColor" : "none"}
                                                        className="text-yellow-400"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        {session.type === "exam" && <p className="font-semibold leading-tight">Examen:</p>}
                                        <p className="leading-tight text-xs break-words">{session.progressNotes}</p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Estadístiques</h3>
                <div className="flex space-x-6 text-center">
                    <div>
                        <p className="text-2xl font-bold text-green-400">{student.attendanceStats?.percentage || "--"}%</p>
                        <p className="text-xs text-gray-400 uppercase">Assistència</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-400">
                            {student.attendanceStats?.averageRating?.toFixed(1) || "--"}
                        </p>
                        <p className="text-xs text-gray-400 uppercase">Aprofitament</p>
                    </div>
                </div>
            </div>

            {/* Student Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-300">Objectiu de l'alumne</h4>
                        <button
                            onClick={() => openHistoryModal("Històric d'Objectius", student.objectiveHistory)}
                            className="text-xs text-blue-400 hover:underline flex items-center"
                        >
                            <History size={12} className="mr-1" /> Històric
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 bg-gray-700 p-2 rounded">{student.objective || "No definit"}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-300">Observacions de l'alumne</h4>
                        <button
                            onClick={() => openHistoryModal("Històric d'Observacions", student.observationsHistory)}
                            className="text-xs text-blue-400 hover:underline flex items-center"
                        >
                            <History size={12} className="mr-1" /> Històric
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 bg-gray-700 p-2 rounded">{student.observations || "Cap observació"}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-300">NESE's</h4>
                        <button
                            onClick={() => openHistoryModal("Històric de NESE", student.neseHistory)}
                            className="text-xs text-blue-400 hover:underline flex items-center"
                        >
                            <History size={12} className="mr-1" /> Històric
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 bg-gray-700 p-2 rounded">{student.nese || "Cap detectada"}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-300">Professor referent</h4>
                        <button
                            onClick={() => openHistoryModal("Històric de Professor Referent", student.referringTeacherHistory)}
                            className="text-xs text-blue-400 hover:underline flex items-center"
                        >
                            <History size={12} className="mr-1" /> Històric
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
                        <span
                            className={`flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gray-600 text-xs font-bold`}
                        >
                            {student.referringTeacher?.substring(0, 2).toUpperCase() || "N/A"}
                        </span>
                        <span className="text-sm text-gray-300">{student.referringTeacher || "No assignat"}</span>
                        <ChevronDown size={16} className="ml-auto text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Incident Log Section */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-white mb-3">Registre d'incidències</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
                    {student.incidents && student.incidents.length > 0 ? (
                        student.incidents.map((inc, index) => (
                            <div key={index} className="text-sm border-b border-gray-700 pb-2 last:border-b-0">
                                <p className="text-gray-400 text-xs mb-1">
                                    {new Date(inc.date).toLocaleString("ca-ES")} -{" "}
                                    <span className="font-medium text-gray-300">{inc.reporter}</span>
                                </p>
                                <p className="text-gray-200 font-medium">{inc.title}</p>
                                <p className="text-gray-400">{inc.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 italic">No hi ha incidències registrades.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

// --- Contingut Pestanya Gestió de Cursos ---
const GestioCursosTabContent = ({ student, onUpdateStudent }) => {
    const [expandedCourseId, setExpandedCourseId] = useState(null)

    // Sample available time slots
    const availableTimeSlots = [
        { day: "Dll", time: "16:30" },
        { day: "Dll", time: "17:30" },
        { day: "Dll", time: "18:30" },
        { day: "Dll", time: "19:30" },
        { day: "Dm", time: "16:30" },
        { day: "Dm", time: "17:30" },
        { day: "Dm", time: "18:30" },
        { day: "Dm", time: "19:30" },
        { day: "Dc", time: "16:30" },
        { day: "Dc", time: "17:30" },
        { day: "Dc", time: "18:30" },
        { day: "Dc", time: "19:30" },
        { day: "Dj", time: "16:30" },
        { day: "Dj", time: "17:30" },
        { day: "Dj", time: "18:30" },
        { day: "Dj", time: "19:30" },
        { day: "Dv", time: "16:30" },
        { day: "Dv", time: "17:30" },
        { day: "Dv", time: "18:30" },
        { day: "Dv", time: "19:30" },
    ]

    const toggleCourseExpansion = (courseId) => {
        setExpandedCourseId((prevId) => (prevId === courseId ? null : courseId))
    }

    // Function to calculate total hours string
    const calculateTotalHours = (schedule, hoursPerSlot = 1) => {
        const total = (schedule?.length || 0) * hoursPerSlot
        // Format the string (e.g., "1 hora / set", "2.5 hores / set")
        if (total === 1) return "1 hora / set"
        return `${total.toString().replace(".", ",")} hores / set`
    }

    const handleScheduleChange = (courseId, slotIndex, newValue) => {
        const [newDay, newTime] = newValue.split(" - ")
        const updatedCourses = student.courses.map((course) => {
            if (course.id === courseId) {
                const updatedSchedule = course.schedule.map((slot, index) =>
                    index === slotIndex ? { day: newDay, time: newTime } : slot,
                )
                // Recalculate hours string after schedule change
                const newHoursString = calculateTotalHours(updatedSchedule, course.hoursPerSlot)
                return { ...course, schedule: updatedSchedule, hours: newHoursString }
            }
            return course
        })
        onUpdateStudent({ courses: updatedCourses })
    }

    const handleDeleteHour = (courseId, slotIndex) => {
        const updatedCourses = student.courses.map((course) => {
            if (course.id === courseId) {
                const updatedSchedule = course.schedule.filter((_, index) => index !== slotIndex)
                // Recalculate hours string after schedule change
                const newHoursString = calculateTotalHours(updatedSchedule, course.hoursPerSlot)
                return { ...course, schedule: updatedSchedule, hours: newHoursString }
            }
            return course
        })
        onUpdateStudent({ courses: updatedCourses })
    }

    const handleAddHour = (courseId) => {
        const defaultSlot = availableTimeSlots[0] || { day: "?", time: "?" }
        const updatedCourses = student.courses.map((course) => {
            if (course.id === courseId) {
                const updatedSchedule = [...(course.schedule || []), defaultSlot]
                // Recalculate hours string after schedule change
                const newHoursString = calculateTotalHours(updatedSchedule, course.hoursPerSlot)
                return { ...course, schedule: updatedSchedule, hours: newHoursString }
            }
            return course
        })
        onUpdateStudent({ courses: updatedCourses })
    }

    const getStatusChipColor = (status) => {
        switch (status) {
            case "Actiu":
                return "bg-green-800 text-green-100"
            case "Pendent":
                return "bg-yellow-800 text-yellow-100"
            case "Finalitzat":
                return "bg-gray-600 text-gray-300"
            case "Cancel·lat":
                return "bg-red-800 text-red-100"
            default:
                return "bg-gray-700 text-gray-400"
        }
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
        <div className="space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={() => console.log("TODO: Open Add Course Modal")}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                >
                    <Plus size={20} /> <span className="font-medium">Afegir curs</span>
                </button>
            </div>

            {student.courses?.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
                    {/* Collapsed View */}
                    <div
                        className={`flex flex-wrap items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50 ${expandedCourseId === course.id ? "border-b border-gray-700" : ""
                            }`}
                        onClick={() => toggleCourseExpansion(course.id)}
                    >
                        <div className="flex items-center space-x-3 mb-2 md:mb-0">
                            <span
                                className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getCourseChipColor(
                                    course.name,
                                )}`}
                            >
                                {course.name}
                            </span>
                            {course.tag && (
                                <span className="px-2 ml-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-600 text-gray-300">
                                    {course.tag}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            {/* Display calculated hours */}
                            <span>
                                <Clock size={14} className="inline mr-1" />
                                {calculateTotalHours(course.schedule, course.hoursPerSlot)}
                            </span>
                            <span>
                                <CreditCard size={14} className="inline mr-1" />
                                {course.price}
                            </span>
                            <span
                                className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipColor(
                                    course.status,
                                )}`}
                            >
                                {course.status}
                            </span>
                        </div>
                        <ChevronDown
                            size={20}
                            className={`ml-auto text-gray-400 transition-transform duration-200 ${expandedCourseId === course.id ? "rotate-180" : ""
                                }`}
                        />
                    </div>

                    {/* Expanded View */}
                    {expandedCourseId === course.id && (
                        <div className="p-4 bg-gray-700/30">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Tarifa</label>
                                    <select
                                        defaultValue={course.tariff}
                                        onChange={(e) => console.log("Tariff changed", e.target.value)}
                                        className="w-full px-3 py-1.5 bg-gray-600 text-gray-200 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                    >
                                        <option>Normal</option>
                                        <option>Intensiu</option>
                                        <option>Personalitzat</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Matrícula</label>
                                    <select
                                        defaultValue={course.enrollmentFee}
                                        onChange={(e) => console.log("Enrollment Fee changed", e.target.value)}
                                        className="w-full px-3 py-1.5 bg-gray-600 text-gray-200 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                    >
                                        <option>Normal - 45 €</option>
                                        <option>Gratuïta</option>
                                        <option>Reduïda - 25 €</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Titular</label>
                                    <div className="flex items-center space-x-2 bg-gray-600 p-1.5 rounded border border-gray-500">
                                        <span
                                            className={`flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-gray-500 text-xs font-bold`}
                                        >
                                            {course.tutor?.substring(0, 2).toUpperCase() || "N/A"}
                                        </span>
                                        <span className="text-sm text-gray-300 truncate">{course.tutor || "No assignat"}</span>
                                        <ChevronDown size={16} className="ml-auto text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Estat</label>
                                    {/* Display status as text, not select */}
                                    <span
                                        className={`px-2 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusChipColor(
                                            course.status,
                                        )}`}
                                    >
                                        {course.status}
                                    </span>
                                </div>
                                {/* Schedule Slots */}
                                {course.schedule?.map((slot, index) => (
                                    <div key={index}>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Hora {index + 1}</label>
                                        <div className="flex items-center space-x-1">
                                            <select
                                                value={`${slot.day} - ${slot.time}`}
                                                onChange={(e) => handleScheduleChange(course.id, index, e.target.value)}
                                                className="w-full px-3 py-1.5 bg-gray-600 text-gray-200 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                            >
                                                {availableTimeSlots.map((ts) => (
                                                    <option key={`${ts.day}-${ts.time}`} value={`${ts.day} - ${ts.time}`}>
                                                        {ts.day} - {ts.time}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleDeleteHour(course.id, index)}
                                                className="p-1.5 text-red-500 hover:text-red-400 bg-gray-600 rounded hover:bg-gray-500"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end space-x-3 mt-4">
                                {/* Always show Add Hour button */}
                                <button
                                    onClick={() => handleAddHour(course.id)}
                                    className="flex items-center space-x-2 px-3 py-1.5 bg-gray-600 text-blue-400 rounded-lg shadow-md hover:bg-gray-500 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 text-sm"
                                >
                                    <Plus size={16} />
                                    <span>Afegir hora</span>
                                </button>
                                <button className="flex items-center space-x-2 px-3 py-1.5 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 text-sm">
                                    <Trash2 size={16} />
                                    <span>Baixa curs</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {(!student.courses || student.courses.length === 0) && (
                <p className="text-center text-gray-500 italic py-4">L'alumne no està inscrit a cap curs.</p>
            )}
        </div>
    )
}

// --- Contingut Pestanya Comercial ---
const ComercialTabContent = ({ student, onUpdateStudent }) => {
    const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false)
    const [editingOpportunity, setEditingOpportunity] = useState(null)
    const [isContactLogModalOpen, setIsContactLogModalOpen] = useState(false)

    const handleOpenOpportunityModal = (opportunity = null) => {
        setEditingOpportunity(opportunity)
        setIsOpportunityModalOpen(true)
    }

    const handleSaveOpportunity = (opportunityData) => {
        const updatedOpportunities = editingOpportunity
            ? student.commercialOpportunities?.map((op) =>
                op.id === editingOpportunity.id ? { ...op, ...opportunityData } : op,
            )
            : [...(student.commercialOpportunities || []), { id: `op-${Date.now()}`, ...opportunityData }]
        onUpdateStudent({ commercialOpportunities: updatedOpportunities })
        setIsOpportunityModalOpen(false)
        setEditingOpportunity(null)
    }

    const handleSaveContactLog = (logData) => {
        const newLog = {
            id: `cc-${Date.now()}`,
            dateTime: new Date().toISOString(),
            user: "Helena", // TODO: Get current logged-in user
            notes: logData.notes,
        }
        const updatedContacts = [...(student.commercialContacts || []), newLog]
        onUpdateStudent({ commercialContacts: updatedContacts })
        setIsContactLogModalOpen(false)
    }

    return (
        <div className="space-y-6">
            {/* Oportunitats Comercials */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white">Oportunitats Comercials</h3>
                    <button
                        onClick={() => handleOpenOpportunityModal()}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 text-sm"
                    >
                        <Plus size={16} /> <span>Nova Oportunitat</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    Descripció
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    Data
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    Assignat a
                                </th>
                                <th scope="col" className="relative px-4 py-2">
                                    <span className="sr-only">Accions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {student.commercialOpportunities?.map((op) => (
                                <tr key={op.id} className="hover:bg-gray-700/50">
                                    <td className="px-4 py-2 whitespace-normal text-sm text-gray-200">{op.description}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
                                        {new Date(op.date).toLocaleDateString("ca-ES")}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{op.assignedTo}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm">
                                        <button
                                            onClick={() => handleOpenOpportunityModal(op)}
                                            className="text-indigo-400 hover:text-indigo-300 mr-2 p-1 rounded hover:bg-gray-600/50"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => console.log("TODO: Delete opportunity", op.id)}
                                            className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-gray-600/50"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(!student.commercialOpportunities || student.commercialOpportunities.length === 0) && (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500 italic">
                                        No hi ha oportunitats comercials.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Contactes Comercials */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white">Contactes Comercials</h3>
                    <button
                        onClick={() => setIsContactLogModalOpen(true)}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 text-sm"
                    >
                        <Plus size={16} /> <span>Nou Contacte</span>
                    </button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
                    {student.commercialContacts?.map((contact) => (
                        <div key={contact.id} className="text-sm border-b border-gray-700 pb-2 last:border-b-0">
                            <p className="text-gray-400 text-xs mb-1">
                                {new Date(contact.dateTime).toLocaleString("ca-ES")} -{" "}
                                <span className="font-medium text-gray-300">{contact.user}</span>
                            </p>
                            <p className="text-gray-200">{contact.notes}</p>
                        </div>
                    ))}
                    {(!student.commercialContacts || student.commercialContacts.length === 0) && (
                        <p className="text-sm text-gray-500 italic">No hi ha contactes registrats.</p>
                    )}
                </div>
            </div>
            {/* Modals for Commercial Tab */}
            <OpportunityModal
                isOpen={isOpportunityModalOpen}
                onClose={() => {
                    setIsOpportunityModalOpen(false)
                    setEditingOpportunity(null)
                }}
                onSave={handleSaveOpportunity}
                initialData={editingOpportunity}
            />
            <ContactLogModal
                isOpen={isContactLogModalOpen}
                onClose={() => setIsContactLogModalOpen(false)}
                onSave={handleSaveContactLog}
            />
        </div>
    )
}

const OpportunityModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [description, setDescription] = useState(initialData?.description || "")
    const [date, setDate] = useState(initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : "")
    const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || "")

    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description || "")
            setDate(initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : "")
            setAssignedTo(initialData.assignedTo || "")
        } else {
            // Reset form when creating a new opportunity
            setDescription("")
            setDate("")
            setAssignedTo("")
        }
    }, [initialData, isOpen])

    const handleSave = () => {
        onSave({ description, date, assignedTo })
    }

    return (
        <div className={`fixed z-50 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-white">
                                    {initialData ? "Editar Oportunitat" : "Nova Oportunitat"}
                                </h3>
                                <div className="mt-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                        Descripció
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 bg-gray-700 text-gray-200 rounded-md"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                                        Data
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 bg-gray-700 text-gray-200 rounded-md"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-300">
                                        Assignat a
                                    </label>
                                    <input
                                        type="text"
                                        name="assignedTo"
                                        id="assignedTo"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 bg-gray-700 text-gray-200 rounded-md"
                                        value={assignedTo}
                                        onChange={(e) => setAssignedTo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSave}
                        >
                            <Save size={16} className="mr-2" />
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            <X size={16} className="mr-2" />
                            Cancel·lar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContactLogModal = ({ isOpen, onClose, onSave }) => {
    const [notes, setNotes] = useState("")

    const handleSave = () => {
        onSave({ notes })
    }

    return (
        <div className={`fixed z-50 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-white">Nou Contacte</h3>
                                <div className="mt-2">
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300">
                                        Notes
                                    </label>
                                    <textarea
                                        name="notes"
                                        id="notes"
                                        rows="3"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 bg-gray-700 text-gray-200 rounded-md"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSave}
                        >
                            <Save size={16} className="mr-2" />
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            <X size={16} className="mr-2" />
                            Cancel·lar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Contingut Pestanya Avaluació ---
const AvaluacioTabContent = ({ student, onUpdateStudent }) => {
    const [selectedTrimester, setSelectedTrimester] = useState("1")

    // Sample evaluation data
    const evaluationData = {
        "1": [
            { subject: "Matemàtiques", grade: 7.5, comments: "Bon progrés en àlgebra, necessita reforç en geometria" },
            { subject: "Català", grade: 8.2, comments: "Excel·lent comprensió lectora, millorar expressió escrita" },
            { subject: "Anglès", grade: 6.8, comments: "Bona participació oral, reforçar gramàtica" }
        ],
        "2": [
            { subject: "Matemàtiques", grade: 7.8, comments: "Millora en geometria, continuar reforçant" },
            { subject: "Català", grade: 8.5, comments: "Molt bona evolució en expressió escrita" },
            { subject: "Anglès", grade: 7.2, comments: "Progrés notable en gramàtica" }
        ],
        "3": [
            { subject: "Matemàtiques", grade: 8.0, comments: "Bon nivell general, preparat per al següent curs" },
            { subject: "Català", grade: 8.7, comments: "Nivell excel·lent en totes les competències" },
            { subject: "Anglès", grade: 7.5, comments: "Bona evolució general durant el curs" }
        ]
    }

    const calculateAverage = (grades) => {
        if (!grades || grades.length === 0) return 0
        const sum = grades.reduce((total, subject) => total + subject.grade, 0)
        return (sum / grades.length).toFixed(1)
    }

    const getGradeColor = (grade) => {
        if (grade >= 8.5) return "text-green-400"
        if (grade >= 7) return "text-blue-400"
        if (grade >= 5) return "text-yellow-400"
        return "text-red-400"
    }

    return (
        <div className="space-y-6">
            {/* Trimester Selection */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Avaluació per Trimestre</h3>
                    <div className="flex space-x-2">
                        {["1", "2", "3"].map((trimester) => (
                            <button
                                key={trimester}
                                onClick={() => setSelectedTrimester(trimester)}
                                className={`px-4 py-2 rounded-md ${selectedTrimester === trimester
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {trimester}T
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grades Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Assignatura
                                </th>
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Nota
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Comentaris
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {evaluationData[selectedTrimester]?.map((subject, index) => (
                                <tr key={index} className="hover:bg-gray-700/50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-200">
                                        {subject.subject}
                                    </td>
                                    <td className={`px-4 py-3 whitespace-nowrap text-sm font-bold text-center ${getGradeColor(subject.grade)}`}>
                                        {subject.grade.toFixed(1)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-300">
                                        {subject.comments}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-700/30">
                            <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-300">
                                    Mitjana Trimestral
                                </td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm font-bold text-center ${getGradeColor(parseFloat(calculateAverage(evaluationData[selectedTrimester])))
                                    }`}>
                                    {calculateAverage(evaluationData[selectedTrimester])}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-400">
                                    {parseFloat(calculateAverage(evaluationData[selectedTrimester])) >= 7
                                        ? "Bon rendiment general"
                                        : "Necessita millorar en algunes àrees"}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-white mb-4">Evolució del Rendiment</h3>
                <div className="h-64 flex items-end space-x-4 px-4">
                    {["1", "2", "3"].map((trimester) => {
                        const average = parseFloat(calculateAverage(evaluationData[trimester]))
                        const height = `${Math.max(10, (average / 10) * 100)}%`
                        return (
                            <div key={trimester} className="flex-1 flex flex-col items-center">
                                <div className="w-full bg-gray-700 rounded-t-md relative" style={{ height }}>
                                    <div className={`absolute inset-0 ${getGradeColor(average)} opacity-50 rounded-t-md`}></div>
                                    <span className="absolute top-0 left-0 right-0 -mt-7 text-center font-bold text-lg">
                                        {average}
                                    </span>
                                </div>
                                <div className="mt-2 text-gray-400 font-medium">Trimestre {trimester}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Teacher Comments */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-white mb-3">Comentaris del Professorat</h3>
                <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-300">Maria Puig (Tutora)</span>
                            <span className="text-xs text-gray-400">15/03/2025</span>
                        </div>
                        <p className="text-gray-200 text-sm">
                            En {student.name} mostra una bona actitud a classe i participa activament. Ha millorat notablement en matemàtiques aquest trimestre.
                            Recomanem continuar amb el reforç en anglès per consolidar els coneixements gramaticals.
                        </p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-300">Jordi Valls (Anglès)</span>
                            <span className="text-xs text-gray-400">10/03/2025</span>
                        </div>
                        <p className="text-gray-200 text-sm">
                            Bona evolució en comprensió oral. Necessita practicar més la redacció i ampliar vocabulari.
                            Participa activament en les activitats de grup.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Contingut Pestanya Dades ---
const DadesTabContent = ({ student, onUpdateStudent }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        fullName: student.name || "",
        birthDate: "2008-05-15",
        dni: "49384756X",
        address: "Carrer Major, 23, 3r 2a",
        city: "Barcelona",
        postalCode: "08015",
        phone: "634 567 890",
        email: "guillem.mercuri@gmail.com",
        parentName: "Marc Mercuri",
        parentPhone: "678 123 456",
        parentEmail: "marc.mercuri@gmail.com",
        school: "IES Montserrat",
        allergies: "Cap",
        medicalNotes: "Miopia lleu, porta ulleres"
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSave = () => {
        onUpdateStudent({
            name: formData.fullName,
            // In a real app, you would update all the other fields too
        })
        setIsEditing(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Dades Personals</h3>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 text-sm ${isEditing
                            ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                >
                    {isEditing ? (
                        <>
                            <X size={16} /> <span>Cancel·lar</span>
                        </>
                    ) : (
                        <>
                            <Pencil size={16} /> <span>Editar</span>
                        </>
                    )}
                </button>
            </div>

            {/* Personal Data Form */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Nom complet</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.fullName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Data de naixement</label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">
                                {new Date(formData.birthDate).toLocaleDateString("ca-ES")}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">DNI/NIE</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.dni}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Telèfon</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.phone}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Correu electrònic</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Centre escolar</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="school"
                                value={formData.school}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.school}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Address */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-gray-300 mb-3">Adreça</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Carrer i número</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.address}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Codi postal</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.postalCode}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Població</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.city}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-gray-300 mb-3">Informació del Tutor/a Legal</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Nom del tutor/a</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.parentName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Telèfon</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.parentPhone}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Correu electrònic</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="parentEmail"
                                value={formData.parentEmail}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.parentEmail}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Medical Information */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-gray-300 mb-3">Informació Mèdica</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Al·lèrgies</label>
                        {isEditing ? (
                            <textarea
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            ></textarea>
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.allergies}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Notes mèdiques</label>
                        {isEditing ? (
                            <textarea
                                name="medicalNotes"
                                value={formData.medicalNotes}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            ></textarea>
                        ) : (
                            <p className="text-gray-200 bg-gray-700 p-2 rounded">{formData.medicalNotes}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            {isEditing && (
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500"
                    >
                        <Save size={18} /> <span>Guardar Canvis</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default StudentDetailView