"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import ClassInfoBar from "../shared/ClassInfoBar"
import StudentRow from "./StudentRow"
import AddStudentModal from "./AddStudentModal"
import LateTimeModal from "./LateTimeModal"
import CommentsModal from "../shared/CommentsModal"
import FeedbackModal from "./FeedbackModal"
import IncidentModal from "./IncidentModal"

// --- Dades de Mostra ---
const initialStudents = [
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
]

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

// Vista Seguiment Alumnes - Restored state and handlers
const StudentTrackingView = ({ initialAula, onCloseView }) => {
  const [students, setStudents] = useState(initialStudents)
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [isLateModalOpen, setIsLateModalOpen] = useState(false)
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false)
  const [feedbackStudentIndex, setFeedbackStudentIndex] = useState(null)
  const [lateModalStudent, setLateModalStudent] = useState(null)
  const [incidentModalStudent, setIncidentModalStudent] = useState(null)
  const [sessionPrivateComment, setSessionPrivateComment] = useState("")
  const [sessionPublicComment, setSessionPublicComment] = useState("")
  const [selectedAula, setSelectedAula] = useState(initialAula)
  const [assignedTeacher, setAssignedTeacher] = useState(docents[0])
  // Removed sessionStatus state as the dropdown was replaced

  const handleAttendanceChange = (studentId, status) => {
    const student = students.find((s) => s.id === studentId)
    if (!student) return

    if (status === "late") {
      setLateModalStudent(student)
      setIsLateModalOpen(true)
    } else if (status === "incident") {
      setIncidentModalStudent(student)
      setIsIncidentModalOpen(true)
    } else {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? { ...s, attendance: s.attendance === status ? null : status, lateMinutes: 0, incident: null }
            : s,
        ),
      )

      if (lateModalStudent?.id === studentId) {
        setIsLateModalOpen(false)
        setLateModalStudent(null)
      }

      if (incidentModalStudent?.id === studentId) {
        setIsIncidentModalOpen(false)
        setIncidentModalStudent(null)
      }
    }
  }

  const handleTrackingChange = (studentId, type) => {
    if (type === "feedback") {
      const studentIndex = students.findIndex((s) => s.id === studentId)
      if (studentIndex !== -1) {
        setFeedbackStudentIndex(studentIndex)
        setIsFeedbackModalOpen(true)
      }
    } else {
      setStudents((prev) =>
        prev.map((s) => (s.id === studentId ? { ...s, tracking: { ...s.tracking, [type]: !s.tracking[type] } } : s)),
      )
    }
  }

  const handleDeleteStudent = (studentId) => setStudents((prev) => prev.filter((s) => s.id !== studentId))

  const handleOpenAssignStudentModal = () => {
    setIsAddStudentModalOpen(true)
  }

  const handleAssignStudent = (studentToAdd, scope) => {
    console.log("Assigning student:", studentToAdd, "Scope:", scope)
    if (!students.some((s) => s.id === studentToAdd.id)) {
      setStudents((prevStudents) => [
        ...prevStudents,
        {
          ...studentToAdd,
          attendance: null,
          tracking: { planning: false, feedback: false },
          lateMinutes: 0,
          feedbackRating: 0,
          sessionNotes: "",
          objectivesNotes: "",
          incident: null,
        },
      ])
    } else {
      console.log("Student already in this session.")
    }
    setIsAddStudentModalOpen(false)
  }

  const handleSaveLateTime = (delayTime, actionType) => {
    if (!lateModalStudent) return
    console.log(`Student ${lateModalStudent.name} marked late by ${delayTime} minutes. Action: ${actionType}`)
    setStudents((prev) =>
      prev.map((s) => (s.id === lateModalStudent.id ? { ...s, attendance: "late", lateMinutes: delayTime } : s)),
    )

    if (actionType === "notify") {
      console.log("   -> Sending notification...")
    }

    setIsLateModalOpen(false)
    setLateModalStudent(null)
  }

  const handleOpenCommentsModal = () => {
    setIsCommentsModalOpen(true)
  }

  const handleSaveComments = (privateComment, publicComment) => {
    console.log("Saving comments:", privateComment, publicComment)
    setSessionPrivateComment(privateComment)
    setSessionPublicComment(publicComment)
    setIsCommentsModalOpen(false)
  }

  // Updated save feedback handler (removed objectivesNotes)
  const handleSaveFeedback = (studentId, rating, sessionNotes) => {
    console.log(`Saving feedback for student ${studentId}: Rating=${rating}, SessionNotes=${sessionNotes}`)
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, feedbackRating: rating, sessionNotes: sessionNotes, tracking: { ...s.tracking, feedback: true } }
          : s,
      ),
    )
  }

  const handleNavigateStudent = (direction) => {
    if (feedbackStudentIndex === null) return

    let newIndex
    if (direction === "prev") {
      newIndex = feedbackStudentIndex === 0 ? students.length - 1 : feedbackStudentIndex - 1
    } else {
      newIndex = feedbackStudentIndex === students.length - 1 ? 0 : feedbackStudentIndex + 1
    }

    setFeedbackStudentIndex(newIndex)
  }

  const handleAulaChange = (aula) => setSelectedAula(aula)

  const handleTeacherAssign = (teacher) => {
    console.log("Assigning teacher:", teacher)
    setAssignedTeacher(teacher)
  }

  // Removed handleSessionStatusChange
  const handleSaveIncident = (title, description, actionType) => {
    if (!incidentModalStudent) return
    console.log(
      `Incident reported for ${incidentModalStudent.name}: Title=${title}, Desc=${description}, Action=${actionType}`,
    )
    setStudents((prev) =>
      prev.map((s) =>
        s.id === incidentModalStudent.id ? { ...s, attendance: "incident", incident: { title, description } } : s,
      ),
    )

    if (actionType === "notify") {
      console.log("   -> Notifying coordination...")
    }

    setIsIncidentModalOpen(false)
    setIncidentModalStudent(null)
  }

  const handleCancelSession = () => {
    console.log("TODO: Implement Cancel Session logic")
  }

  return (
    <div>
      <ClassInfoBar
        selectedAula={selectedAula}
        onAulaChange={handleAulaChange}
        onCloseView={onCloseView}
        onOpenComments={handleOpenCommentsModal}
        assignedTeacher={assignedTeacher}
        onTeacherAssign={handleTeacherAssign}
        onCancelSession={handleCancelSession} // Pass cancel handler
      />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="hidden md:grid grid-cols-3 gap-x-6 items-center px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-800 border-b border-gray-700 rounded-t-lg">
          <div>Alumne</div>
          <div>Registre d'assistència</div>
          <div className="text-left">Seguiment</div>
        </div>
        <div className="bg-gray-800 rounded-b-lg shadow-md overflow-hidden">
          {students.length > 0 ? (
            students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onAttendanceChange={handleAttendanceChange}
                onTrackingChange={handleTrackingChange}
                onDelete={handleDeleteStudent}
              />
            ))
          ) : (
            <div className="text-center p-10 text-gray-500">No hi ha alumnes assignats a aquesta sessió.</div>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={handleOpenAssignStudentModal}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
          >
            <Users size={20} />
            <span className="font-medium">Assignar Alumne</span>
          </button>
        </div>
      </div>
      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onAssignStudent={handleAssignStudent}
        isAssignMode={true}
      />
      <LateTimeModal
        isOpen={isLateModalOpen}
        onClose={() => {
          setIsLateModalOpen(false)
          setLateModalStudent(null)
        }}
        onSave={handleSaveLateTime}
        studentName={lateModalStudent?.name || ""}
      />
      <CommentsModal
        isOpen={isCommentsModalOpen}
        onClose={() => setIsCommentsModalOpen(false)}
        onSaveComments={handleSaveComments}
        initialPrivateComment={sessionPrivateComment}
        initialPublicComment={sessionPublicComment}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => {
          setIsFeedbackModalOpen(false)
          setFeedbackStudentIndex(null)
        }}
        student={feedbackStudentIndex !== null ? students[feedbackStudentIndex] : null}
        onSaveFeedback={handleSaveFeedback}
        onNavigateStudent={handleNavigateStudent}
        currentIndex={feedbackStudentIndex}
        totalStudents={students.length}
      />
      <IncidentModal
        isOpen={isIncidentModalOpen}
        onClose={() => {
          setIsIncidentModalOpen(false)
          setIncidentModalStudent(null)
        }}
        onSaveIncident={handleSaveIncident}
        studentName={incidentModalStudent?.name || ""}
      />
    </div>
  )
}

export default StudentTrackingView
