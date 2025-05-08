"use client"
import { Check, X, AlertTriangle, Clock, Calendar, Star, Trash2 } from "lucide-react"

// Component Fila Alumne - Restored helper functions
const StudentRow = ({ student, onAttendanceChange, onTrackingChange, onDelete }) => {
  const getAttendanceButtonClass = (type) => {
    const base =
      "p-2 rounded-lg flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 focus:ring-opacity-75"
    const active = student.attendance === type
    const ring = active ? "ring-2 ring-offset-gray-800 ring-blue-500" : ""

    switch (type) {
      case "attends":
        return `${base} ${active ? "bg-green-600 text-white shadow-md" : "bg-gray-600 text-gray-400 hover:bg-green-500 hover:text-white"} ${ring}`
      case "late":
        return `${base} ${active ? "bg-orange-500 text-white shadow-md" : "bg-gray-600 text-gray-400 hover:bg-orange-500 hover:text-white"} ${ring}`
      case "absent":
        return `${base} ${active ? "bg-red-600 text-white shadow-md" : "bg-gray-600 text-gray-400 hover:bg-red-500 hover:text-white"} ${ring}`
      case "incident":
        return `${base} ${active ? "bg-yellow-500 text-gray-900 shadow-md" : "bg-gray-600 text-gray-400 hover:bg-yellow-500 hover:text-gray-900"} ${ring}`
      default:
        return `${base} bg-gray-600 text-gray-400`
    }
  }

  const getTrackingButtonClass = (type) => {
    const base =
      "p-2 rounded-lg flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 focus:ring-opacity-75"
    const active = student.tracking[type]
    const ring = active ? "ring-2 ring-offset-gray-800 ring-blue-500" : ""
    return `${base} ${active ? "bg-blue-600 text-white shadow-md" : "bg-gray-600 text-gray-400 hover:bg-blue-500 hover:text-white"} ${ring}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 items-center px-5 py-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-150 ease-in-out">
      <div className="flex items-center space-x-4">
        <img
          src={student.avatarUrl || "/placeholder.svg"}
          alt={student.name}
          className="w-10 h-10 rounded-full border border-gray-600"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "https://placehold.co/40x40/4B5563/9CA3AF?text=Err"
          }}
        />
        <div>
          <div className="font-medium text-gray-100">
            {student.name}
            <span
              className={`text-xs font-medium ml-2 px-2 py-0.5 rounded-full ${student.status === "Actiu" ? "bg-green-800 text-green-200" : "bg-gray-700 text-gray-400"}`}
            >
              {student.status}
            </span>
          </div>
          <div className="text-sm text-gray-400">{student.subjects}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          title="Assisteix"
          className={getAttendanceButtonClass("attends")}
          onClick={() => onAttendanceChange(student.id, "attends")}
        >
          <Check size={18} />
        </button>
        <button
          title={`Retard ${student.lateMinutes > 0 ? "(" + student.lateMinutes + " min)" : ""}`}
          className={getAttendanceButtonClass("late")}
          onClick={() => onAttendanceChange(student.id, "late")}
        >
          <Clock size={18} />
        </button>
        <button
          title="Falta"
          className={getAttendanceButtonClass("absent")}
          onClick={() => onAttendanceChange(student.id, "absent")}
        >
          <X size={18} />
        </button>
        <button
          title="Incidència"
          className={getAttendanceButtonClass("incident")}
          onClick={() => onAttendanceChange(student.id, "incident")}
        >
          <AlertTriangle size={18} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            title="Planificació"
            className={getTrackingButtonClass("planning")}
            onClick={() => onTrackingChange(student.id, "planning")}
          >
            <Calendar size={18} />
          </button>
          <button
            title="Feedback"
            className={getTrackingButtonClass("feedback")}
            onClick={() => onTrackingChange(student.id, "feedback")}
          >
            <Star size={18} />
          </button>
        </div>
        <button
          title="Eliminar Alumne"
          className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform hover:scale-110"
          onClick={() => onDelete(student.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

export default StudentRow
