"use client"

import { useState } from "react"
import MainSidebar from "../components/MainSidebar"
import TopBar from "../components/TopBar"
import CalendarView from "../components/calendar/CalendarView"
import StudentTrackingView from "../components/students/StudentTrackingView"
import AlumnesView from "../components/alumnes/AlumnesView"
import LocalitzacionsView from "../components/locations/LocalitzacionsView"
import StudentDetailView from "../components/students/StudentDetailView"
import CursosView from "../components/courses/CursosView"
import PagamentsView from "../components/payments/PagamentsView"
import ProfessorsView from "../components/professors/ProfessorsView"
import TitularsView from "../components/titulars/TitularsView"
import TitularDetailView from "../components/titulars/TitularDetailView"

// Sample data for detailed student information
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
    incident: null,
    // Detailed Courses for Student Detail View
    courses: [
      {
        id: "c1",
        name: "REF 3-4 ESO",
        tag: "ACT TGN",
        hoursPerSlot: 1,
        tariff: "Normal",
        price: "79 €",
        enrollmentFee: "Normal - 45 €",
        tutor: "Marta Torres",
        status: "Actiu",
        schedule: [
          { day: "Dll", time: "16:30" },
          { day: "DX", time: "16:30" },
        ],
      }, // Assuming 1 hour per slot
      {
        id: "c9",
        name: "Mates Selectivitat",
        tag: "CIÈNCIES",
        hoursPerSlot: 1.5,
        tariff: "Intensiu",
        price: "95 €",
        enrollmentFee: "Normal - 45 €",
        tutor: "Laura Puig",
        status: "Actiu",
        schedule: [{ day: "Dj", time: "19:30" }],
      }, // 1.5 hours per slot
    ],
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
    // Commercial Data
    commercialOpportunities: [
      { id: "op1", description: "Ampliar 1 hora més Mates", date: "2025-04-12", assignedTo: "Helena" },
      { id: "op2", description: "Proposar curs Anglès B1", date: "2025-05-01", assignedTo: "Marc" },
    ],
    commercialContacts: [
      {
        id: "cc1",
        dateTime: "2025-04-12T13:23:00",
        user: "Helena",
        notes:
          "He trucat per ampliar 1 hora, ja que al Pau li aniria bé. Em diu que s'ho pensa. Tornar a trucar el dia 15.",
      },
      {
        id: "cc2",
        dateTime: "2025-04-15T10:05:00",
        user: "Helena",
        notes: "Torno a trucar. Accepten ampliar 1 hora de Mates a partir de la setmana vinent.",
      },
    ],
    titularId: "tit1",
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
    courses: [
      {
        id: "c1",
        name: "REF 3-4 ESO",
        tag: "ACT TGN",
        hoursPerSlot: 1,
        tariff: "Normal",
        price: "79 €",
        enrollmentFee: "Normal - 45 €",
        tutor: "Marta Torres",
        status: "Actiu",
        schedule: [
          { day: "Dll", time: "16:30" },
          { day: "DX", time: "16:30" },
        ],
      },
      {
        id: "c2",
        name: "Ang 1-2 ESO",
        tag: "IDIOMES",
        hoursPerSlot: 1,
        tariff: "Normal",
        price: "55 €",
        enrollmentFee: "Normal - 45 €",
        tutor: "David Martí",
        status: "Actiu",
        schedule: [{ day: "Dm", time: "17:00" }],
      },
      {
        id: "c10",
        name: "Català ESO",
        tag: "LLETRES",
        hoursPerSlot: 1,
        tariff: "Normal",
        price: "55 €",
        enrollmentFee: "Gratuïta",
        tutor: "Anna Vidal",
        status: "Pendent",
        schedule: [{ day: "Dv", time: "18:00" }],
      },
    ],
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
    commercialOpportunities: [],
    commercialContacts: [],
    titularId: "tit2",
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
    courses: [
      {
        id: "c1",
        name: "REF 3-4 ESO",
        tag: "ACT TGN",
        hoursPerSlot: 1,
        tariff: "Normal",
        price: "79 €",
        enrollmentFee: "Normal - 45 €",
        tutor: "Marta Torres",
        status: "Actiu",
        schedule: [
          { day: "Dll", time: "16:30" },
          { day: "DX", time: "16:30" },
        ],
      },
    ],
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
    commercialOpportunities: [],
    commercialContacts: [],
    titularId: "tit3",
  },
]

// Sample Titular (Account Holder) Data
const sampleTitulars = [
  {
    id: "tit1",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "600111222",
    relatedStudentIds: [1, 5],
    avatarUrl: "https://placehold.co/40x40/7C3AED/FFFFFF?text=MG",
    dni: "12345678A",
    fiscalAddress: "C/ Major, 1, 43001 Tarragona",
    newsletter: true,
    iban: "ES91 2100 0418 4502 0005 1332",
  },
  {
    id: "tit2",
    name: "Joan Mercuri",
    email: "joan.mercuri@email.com",
    phone: "600333444",
    relatedStudentIds: [2, 4],
    avatarUrl: "https://placehold.co/40x40/DB2777/FFFFFF?text=JM",
    dni: "87654321B",
    fiscalAddress: "Av. Catalunya, 20, 43002 Tarragona",
    newsletter: false,
    iban: "ES80 0081 0123 4500 0123 4567",
  },
  {
    id: "tit3",
    name: "Carles Gimeno",
    email: "carles.gimeno@email.com",
    phone: "600555666",
    relatedStudentIds: [3],
    avatarUrl: "https://placehold.co/40x40/1D4ED8/FFFFFF?text=CG",
    dni: "11223344C",
    fiscalAddress: "Plaça Imperial, 5, 43005 Tarragona",
    newsletter: true,
    iban: "ES10 2038 1234 5600 1234 5678",
  },
]

// --- Component Principal App ---
function App() {
  const [activeView, setActiveView] = useState("professors") // Default to Professors view now
  const [selectedSessionId, setSelectedSessionId] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedAulaForTracking, setSelectedAulaForTracking] = useState(5)
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true)
  // Manage the detailed student list in App state
  const [studentsData, setStudentsData] = useState(initialStudents)
  // Add state for titulars
  const [titularsData, setTitularsData] = useState(sampleTitulars)
  const [selectedTitularId, setSelectedTitularId] = useState(null)

  const navigateToTracking = (sessionId, initialAula = 5) => {
    setSelectedSessionId(sessionId)
    setSelectedAulaForTracking(initialAula)
    setActiveView("tracking")
    console.log("Navigating to tracking for session:", sessionId)
  }

  const navigateToCalendar = () => {
    setActiveView("horaris")
    setSelectedSessionId(null)
    setSelectedStudent(null)
    console.log("Navigating back to calendar")
  }

  const navigateToAlumnes = () => {
    setActiveView("alumnes")
    setSelectedSessionId(null)
    setSelectedStudent(null)
    setSelectedTitularId(null)
    console.log("Navigating to Alumnes list")
  }

  const navigateToTitulars = () => {
    setActiveView("titulars")
    setSelectedSessionId(null)
    setSelectedStudent(null)
    setSelectedTitularId(null)
    console.log("Navigating to Titulars list")
  }

  const navigateToStudentDetail = (studentId) => {
    const studentData = studentsData.find((s) => s.id === studentId) // Find student in App's state
    setSelectedStudent(studentData) // Set the full student data
    setSelectedTitularId(null) // Clear titular selection
    setActiveView("studentDetail")
    console.log("Navigating to student detail:", studentId)
  }

  const navigateToTitularDetail = (titularId) => {
    setSelectedTitularId(titularId)
    setSelectedStudent(null) // Clear student selection
    setActiveView("titularDetail")
    console.log("Navigating to titular detail:", titularId)
  }

  // Function to update student data (passed down to StudentDetailView)
  const handleUpdateStudent = (studentId, updatedFields) => {
    console.log("Updating student in App:", studentId, updatedFields)
    setStudentsData((prevStudents) =>
      prevStudents.map((student) => (student.id === studentId ? { ...student, ...updatedFields } : student)),
    )
    // Update selectedStudent as well if it's the one being edited
    if (selectedStudent?.id === studentId) {
      setSelectedStudent((prev) => ({ ...prev, ...updatedFields }))
    }
  }

  // Function to update titular data
  const handleUpdateTitular = (titularId, updatedFields) => {
    console.log("Updating titular in App:", titularId, updatedFields)
    setTitularsData((prevTitulars) =>
      prevTitulars.map((titular) => (titular.id === titularId ? { ...titular, ...updatedFields } : titular)),
    )
  }

  const handleMainNavigate = (viewId) => {
    if (viewId === "tracking" && !selectedSessionId) {
      console.log("Select a session from the calendar first.")
      return
    }
    if (viewId !== "tracking") {
      setSelectedSessionId(null)
    }
    if (viewId !== "studentDetail") {
      setSelectedStudent(null)
    }
    if (viewId !== "titularDetail") {
      setSelectedTitularId(null)
    }
    setActiveView(viewId)
    console.log("Navigating to main view:", viewId)
  }

  const toggleMainMenu = () => setIsMainMenuOpen(!isMainMenuOpen)

  const renderActiveView = () => {
    // Find the selected data based on ID when needed
    const selectedStudentData = studentsData.find((s) => s.id === selectedStudent?.id)
    const selectedTitularData = titularsData.find((t) => t.id === selectedTitularId)

    switch (activeView) {
      case "horaris":
        return <CalendarView onNavigateToTracking={navigateToTracking} />
      case "tracking":
        return (
          <StudentTrackingView
            initialAula={selectedAulaForTracking}
            onCloseView={navigateToCalendar}
            key={selectedSessionId}
          />
        )
      case "alumnes":
        return <AlumnesView navigateToStudentDetail={navigateToStudentDetail} /> // Pass navigation function
      case "studentDetail":
        return (
          <StudentDetailView
            student={selectedStudentData}
            onNavigateBack={navigateToAlumnes}
            onUpdateStudent={handleUpdateStudent}
          />
        ) // Pass update handler
      case "localitzacions":
        return <LocalitzacionsView />
      case "cursos":
        return <CursosView />
      case "pagaments":
        return <PagamentsView />
      case "professors":
        return <ProfessorsView />
      case "titulars":
        return <TitularsView navigateToTitularDetail={navigateToTitularDetail} />
      case "titularDetail":
        return (
          <TitularDetailView
            titular={selectedTitularData}
            onNavigateBack={navigateToTitulars}
            onUpdateTitular={handleUpdateTitular}
          />
        )
      default:
        return <ProfessorsView />
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <MainSidebar
        activeView={activeView}
        onNavigate={handleMainNavigate}
        isMainMenuOpen={isMainMenuOpen}
        onToggleMainMenu={toggleMainMenu}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isMainMenuOpen ? "ml-60" : "ml-20"
        }`}
      >
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-gray-900">{renderActiveView()}</div>
      </div>
    </div>
  )
}

export default App
