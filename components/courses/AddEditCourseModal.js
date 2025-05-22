"use client"

import { useState, useEffect, useRef } from "react"
import { X, Save, Clock } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Sample data for the dropdown
const localitzacions = ["ACT TGN", "ACT CNS", "Calafell", "Centres Cívics", "Online"]

// Days of the week
const weekdays = [
    { id: "monday", label: "Dilluns" },
    { id: "tuesday", label: "Dimarts" },
    { id: "wednesday", label: "Dimecres" },
    { id: "thursday", label: "Dijous" },
    { id: "friday", label: "Divendres" },
]

// Time slots
const timeSlots = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"]

const AddEditCourseModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        code: "",
        description: "",
        location: localitzacions[0] || "",
        startDate: "",
        endDate: "",
        courseObjectives: "",
        teacherInstructions: "",
        schedule: {},
    })
    const modalRef = useRef(null)
    useOnClickOutside(modalRef, onClose)

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Editing
                setFormData({
                    code: initialData.code || "",
                    description: initialData.description || "",
                    location: initialData.location || localitzacions[0] || "",
                    startDate: initialData.startDate || "",
                    endDate: initialData.endDate || "",
                    courseObjectives: initialData.courseObjectives || "",
                    teacherInstructions: initialData.teacherInstructions || "",
                    schedule: initialData.schedule || {},
                })
            } else {
                // Adding new
                setFormData({
                    code: "",
                    description: "",
                    location: localitzacions[0] || "",
                    startDate: "",
                    endDate: "",
                    courseObjectives: "",
                    teacherInstructions: "",
                    schedule: {},
                })
            }
        }
    }, [isOpen, initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleScheduleChange = (day, field, value) => {
        setFormData((prev) => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: {
                    ...(prev.schedule[day] || {}),
                    [field]: value,
                },
            },
        }))
    }

    const handleSaveClick = () => {
        if (!formData.code || !formData.description || !formData.location || !formData.startDate || !formData.endDate) {
            alert("Si us plau, omple tots els camps obligatoris (Codi, Descripció, Localització, Dates).")
            return
        }
        // Pass all editable fields to onSave
        onSave(formData)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
                ref={modalRef}
                className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 border border-gray-700 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">{initialData ? "Editar Curs" : "Nou Curs"}</h2>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
                        {" "}
                        <X size={20} />{" "}
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="courseCode" className="block text-sm font-medium text-gray-300 mb-1">
                                Codi <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="courseCode"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="courseLocation" className="block text-sm font-medium text-gray-300 mb-1">
                                Localització <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="courseLocation"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                {localitzacions.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-300 mb-1">
                            Descripció <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="courseDescription"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="courseStartDate" className="block text-sm font-medium text-gray-300 mb-1">
                                Data Inici <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="courseStartDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="courseEndDate" className="block text-sm font-medium text-gray-300 mb-1">
                                Data Fi <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="courseEndDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="border-t border-gray-700 pt-4 mt-4">
                        <h3 className="text-md font-medium text-white mb-3 flex items-center">
                            <Clock size={18} className="mr-2" />
                            Horari del curs
                        </h3>

                        <div className="space-y-4">
                            {weekdays.map((day) => (
                                <div key={day.id} className="p-3 bg-gray-700/50 rounded-md">
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">{day.label}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Hora d'inici</label>
                                            <select
                                                value={formData.schedule[day.id]?.startTime || ""}
                                                onChange={(e) => handleScheduleChange(day.id, "startTime", e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                            >
                                                <option value="">No assignat</option>
                                                {timeSlots.map((time) => (
                                                    <option key={`start-${time}`} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Hora de fi</label>
                                            <select
                                                value={formData.schedule[day.id]?.endTime || ""}
                                                onChange={(e) => handleScheduleChange(day.id, "endTime", e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                            >
                                                <option value="">No assignat</option>
                                                {timeSlots.map((time) => (
                                                    <option key={`end-${time}`} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Details */}
                    <div>
                        <label htmlFor="courseObjectives" className="block text-sm font-medium text-gray-300 mb-1">
                            Objectius del curs
                        </label>
                        <textarea
                            id="courseObjectives"
                            name="courseObjectives"
                            value={formData.courseObjectives}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="teacherInstructions" className="block text-sm font-medium text-gray-300 mb-1">
                            Indicacions per al professorat
                        </label>
                        <textarea
                            id="teacherInstructions"
                            name="teacherInstructions"
                            value={formData.teacherInstructions}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                    >
                        {" "}
                        Cancel·lar{" "}
                    </button>
                    <button
                        onClick={handleSaveClick}
                        className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                    >
                        {" "}
                        <Save size={16} />
                        <span>Desar Curs</span>{" "}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEditCourseModal
