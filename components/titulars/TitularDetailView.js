"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, FileText, Users2, Pencil, Save, ChevronDown } from "lucide-react"

// Sample data for payments
const samplePayments = [
  {
    id: "p1",
    studentId: 1,
    holderName: "Maria Garcia (Pau Torres)",
    price: 79.0,
    service: "REF 3-4 ESO",
    location: "ACT TGN",
    status: "Pagat",
    expectedDate: "2025-05-01",
    paymentMethod: "Rebut Domiciliat",
    academicYear: "2024/25",
  },
  {
    id: "p2",
    studentId: 1,
    holderName: "Maria Garcia (Pau Torres)",
    price: 95.0,
    service: "Mates Selectivitat",
    location: "ACT TGN",
    status: "Pagat",
    expectedDate: "2025-05-01",
    paymentMethod: "Rebut Domiciliat",
    academicYear: "2024/25",
  },
  {
    id: "p3",
    studentId: 2,
    holderName: "Joan Mercuri (Guillem Mercuri)",
    price: 79.0,
    service: "REF 3-4 ESO",
    location: "ACT TGN",
    status: "Pendent",
    expectedDate: "2025-05-05",
    paymentMethod: "Targeta",
    academicYear: "2024/25",
  },
  {
    id: "p4",
    studentId: 2,
    holderName: "Joan Mercuri (Guillem Mercuri)",
    price: 55.0,
    service: "Ang 1-2 ESO",
    location: "ACT CNS",
    status: "Pendent",
    expectedDate: "2025-05-05",
    paymentMethod: "Targeta",
    academicYear: "2024/25",
  },
  {
    id: "p5",
    studentId: 2,
    holderName: "Joan Mercuri (Guillem Mercuri)",
    price: 55.0,
    service: "Català ESO",
    location: "ACT TGN",
    status: "Pendent",
    expectedDate: "2025-05-05",
    paymentMethod: "Targeta",
    academicYear: "2024/25",
  },
  {
    id: "p6",
    studentId: 3,
    holderName: "Carles Gimeno (Helena Gimeno)",
    price: 79.0,
    service: "REF 3-4 ESO",
    location: "ACT TGN",
    status: "Impagat",
    expectedDate: "2025-04-05",
    paymentMethod: "Transferència",
    academicYear: "2024/25",
  },
  {
    id: "p7",
    studentId: 4,
    holderName: "Joan Mercuri (Sofia Camps)",
    price: 65.0,
    service: "Ang B2 Prep",
    location: "Online",
    status: "Pagat",
    expectedDate: "2025-05-03",
    paymentMethod: "Efectiu",
    academicYear: "2024/25",
  },
  {
    id: "p8",
    studentId: 4,
    holderName: "Joan Mercuri (Sofia Camps)",
    price: 50.0,
    service: "Ang B1",
    location: "Online",
    status: "Pagat",
    expectedDate: "2024-10-03",
    paymentMethod: "Efectiu",
    academicYear: "2023/24",
  },
  {
    id: "p9",
    studentId: 1,
    holderName: "Maria Garcia (Pau Torres)",
    price: 79.0,
    service: "REF 3-4 ESO",
    location: "ACT TGN",
    status: "Impagat",
    expectedDate: "2025-05-01",
    paymentMethod: "Rebut Domiciliat",
    academicYear: "2024/25",
  },
  {
    id: "p10",
    studentId: 5,
    holderName: "Maria Garcia (Miquel Torres)",
    price: 55.0,
    service: "Ang 1-2 ESO",
    location: "ACT CNS",
    status: "Pagat",
    expectedDate: "2025-05-01",
    paymentMethod: "Rebut Domiciliat",
    academicYear: "2024/25",
  },
]

// Sample student data
const initialStudents = [
  {
    id: 1,
    name: "Pau Torres",
    status: "Actiu",
    subjects: "Mates",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=PT",
    courses: [
      { id: "c1", name: "REF 3-4 ESO", academicYear: "2024/25" },
      { id: "c9", name: "Mates Selectivitat", academicYear: "2024/25" },
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
    titularId: "tit1",
  },
  {
    id: 2,
    name: "Guillem Mercuri",
    status: "Actiu",
    subjects: "Totes les assignatures",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=GM",
    courses: [
      { id: "c1", name: "REF 3-4 ESO", academicYear: "2024/25" },
      { id: "c2", name: "Ang 1-2 ESO", academicYear: "2024/25" },
      { id: "c10", name: "Català ESO", academicYear: "2024/25" },
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
    titularId: "tit2",
  },
  {
    id: 3,
    name: "Helena Gimeno",
    status: "Actiu",
    subjects: "Mates",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=HG",
    courses: [{ id: "c1", name: "REF 3-4 ESO", academicYear: "2024/25" }],
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
    titularId: "tit3",
  },
  {
    id: 4,
    name: "Sofia Camps",
    status: "Actiu",
    subjects: "Anglès",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=SC",
    courses: [
      { id: "c7", name: "Ang B2 Prep", academicYear: "2024/25" },
      { id: "c8", name: "Ang B1", academicYear: "2023/24" },
    ],
    lastContact: "2025-04-20",
    firstEnrollment: "2024-01-20",
    birthDate: "2006-07-01",
    school: "Institut Pons d'Icart",
    email: "sofia.camps@email.com",
    imageAuth: true,
    emergencyName: "Joan Mercuri",
    emergencyRelation: "Pare",
    emergencyPhone: "600333444",
    objective: "Preparar B2",
    currentCourseLevel: "1r BATX",
    titularId: "tit2",
  },
  {
    id: 5,
    name: "Miquel Torres",
    status: "Actiu",
    subjects: "Anglès",
    avatarUrl: "https://placehold.co/40x40/374151/E5E7EB?text=MT",
    courses: [{ id: "c2", name: "Ang 1-2 ESO", academicYear: "2024/25" }],
    lastContact: "2025-05-01",
    firstEnrollment: "2024-09-10",
    birthDate: "2010-03-22",
    school: "Institut Martí Franquès",
    email: "miquel.torres@email.com",
    imageAuth: true,
    emergencyName: "Maria Garcia",
    emergencyRelation: "Mare",
    emergencyPhone: "600111222",
    objective: "Millorar speaking",
    currentCourseLevel: "2n ESO",
    titularId: "tit1",
  },
]

const academicYears = ["2024/25", "2023/24", "2022/23"] // Example academic years

// --- Vista Detall Titular ---
const TitularDetailView = ({ titular, onNavigateBack, onUpdateTitular }) => {
  const [activeTab, setActiveTab] = useState("dades")
  const [isEditing, setIsEditing] = useState(false) // State for editing mode in Dades tab
  const [currentTitularData, setCurrentTitularData] = useState(titular) // Local state for optimistic updates

  // Update local state if the main titular prop changes (e.g., after saving)
  useEffect(() => {
    setCurrentTitularData(titular)
  }, [titular])

  // Handler to update titular data locally and propagate up if needed
  const handleLocalTitularUpdate = (updatedFields) => {
    const updatedTitular = { ...currentTitularData, ...updatedFields }
    setCurrentTitularData(updatedTitular) // Update local state for immediate feedback
    if (onUpdateTitular) {
      onUpdateTitular(currentTitularData.id, updatedFields) // Propagate to App state
    }
  }

  if (!currentTitularData) {
    // Check local state
    return <div className="p-8 text-center text-gray-400">Titular no trobat. Torna a la llista de titulars.</div>
  }

  const tabs = [
    { id: "dades", label: "Dades", icon: FileText },
    { id: "alumnes", label: "Alumnes Relacionats", icon: Users2 },
  ]

  // --- Contingut Pestanya Dades ---
  const TitularDadesTabContent = ({ titularData, onUpdate }) => {
    // Renamed props for clarity
    const [editableData, setEditableData] = useState({
      name: titularData.name || "",
      dni: titularData.dni || "",
      fiscalAddress: titularData.fiscalAddress || "",
      email: titularData.email || "",
      phone: titularData.phone || "",
      newsletter: titularData.newsletter || false,
      iban: titularData.iban || "",
    })

    useEffect(() => {
      if (!isEditing && titularData) {
        setEditableData({
          name: titularData.name || "",
          dni: titularData.dni || "",
          fiscalAddress: titularData.fiscalAddress || "",
          email: titularData.email || "",
          phone: titularData.phone || "",
          newsletter: titularData.newsletter || false,
          iban: titularData.iban || "",
        })
      }
    }, [titularData, isEditing])

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setEditableData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    const handleSave = () => {
      onUpdate(editableData) // Pass updated data to the handler passed as prop
      setIsEditing(false)
    }

    const handleCancel = () => {
      setIsEditing(false)
      setEditableData({
        name: titularData.name || "",
        dni: titularData.dni || "",
        fiscalAddress: titularData.fiscalAddress || "",
        email: titularData.email || "",
        phone: titularData.phone || "",
        newsletter: titularData.newsletter || false,
        iban: titularData.iban || "",
      })
    }

    const renderField = (label, value, name, type = "text", required = false) => (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {isEditing ? (
          type === "checkbox" ? (
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={editableData[name]}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
            />
          ) : type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={editableData[name]}
              onChange={handleChange}
              rows="3"
              required={required}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={editableData[name]}
              onChange={handleChange}
              required={required}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
          )
        ) : type === "checkbox" ? (
          <span
            className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
              value ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"
            }`}
          >
            {value ? "Sí" : "No"}
          </span>
        ) : (
          <p className="text-sm text-gray-400 bg-gray-700 p-2 rounded min-h-[38px]">{value || "-"}</p>
        )}
      </div>
    )

    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">Dades del Titular</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
            >
              <Pencil size={14} />
              <span>Editar Dades</span>
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          {renderField("Nom i cognoms", titularData.name, "name", "text", true)}
          {renderField("DNI", titularData.dni, "dni")}
          {renderField("Correu electrònic", titularData.email, "email", "email")}
          {renderField("Telèfon", titularData.phone, "phone", "tel")}
          {renderField("Direcció Fiscal", titularData.fiscalAddress, "fiscalAddress", "textarea")}
          {renderField("IBAN", titularData.iban, "iban")}
          {renderField("Subscrit Newsletter", titularData.newsletter, "newsletter", "checkbox")}
        </div>
        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
            >
              {" "}
              Cancel·lar{" "}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              {" "}
              <Save size={16} />
              <span>Desar Canvis</span>{" "}
            </button>
          </div>
        )}
      </div>
    )
  }

  // --- Contingut Pestanya Alumnes Relacionats ---
  const TitularAlumnesTabContent = ({ titular }) => {
    const [selectedAcademicYear, setSelectedAcademicYear] = useState(academicYears[0])
    const [expandedStudentId, setExpandedStudentId] = useState(null)

    const relatedStudents = initialStudents.filter((student) => titular.relatedStudentIds?.includes(student.id))

    const toggleStudentExpansion = (studentId) => {
      setExpandedStudentId((prevId) => (prevId === studentId ? null : studentId))
    }

    // Helper functions needed within this component
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
    const getStatusColor = (status) => {
      switch (status) {
        case "Pagat":
          return "bg-green-800 text-green-100"
        case "Pendent":
          return "bg-yellow-800 text-yellow-100"
        case "Impagat":
          return "bg-red-800 text-red-100"
        default:
          return "bg-gray-700 text-gray-300"
      }
    }
    const formatDate = (dateString) => (dateString ? new Date(dateString).toLocaleDateString("ca-ES") : "-")

    return (
      <div className="space-y-4">
        <div className="flex justify-end mb-4">
          <select
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
            className="px-3 py-1.5 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          >
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {relatedStudents.length > 0 ? (
          relatedStudents.map((student) => {
            const studentCoursesForYear = student.courses.filter((c) => c.academicYear === selectedAcademicYear)
            const studentPaymentsForYear = samplePayments.filter(
              (p) =>
                p.studentId === student.id &&
                studentCoursesForYear.some((c) => c.name === p.service) && // Match service name
                p.academicYear === selectedAcademicYear, // Match academic year for payments too
            )

            return (
              <div key={student.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
                {/* Student Card Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
                  onClick={() => toggleStudentExpansion(student.id)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-10 w-10 rounded-full border border-gray-600"
                      src={student.avatarUrl || "/placeholder.svg"}
                      alt={student.name}
                      onError={(e) => {
                        e.target.src = `https://placehold.co/40x40/4B5563/9CA3AF?text=Err`
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-100">{student.name}</p>
                      <p className="text-xs text-gray-400">{student.currentCourseLevel || "Nivell no especificat"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {studentCoursesForYear.map((course) => (
                        <span
                          key={course.id}
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCourseChipColor(
                            course.name,
                          )}`}
                        >
                          {course.name}
                        </span>
                      ))}
                      {studentCoursesForYear.length === 0 && (
                        <span className="text-xs text-gray-500 italic">Cap curs ({selectedAcademicYear})</span>
                      )}
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-200 ${
                        expandedStudentId === student.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {/* Expanded Content (Payments Table) */}
                {expandedStudentId === student.id && (
                  <div className="p-4 bg-gray-700/30 border-t border-gray-700">
                    <h4 className="text-md font-semibold text-gray-200 mb-2">Pagaments ({selectedAcademicYear})</h4>
                    {studentPaymentsForYear.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-600">
                          <thead className="bg-gray-600/50">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Servei
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Preu
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Estat
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Data Prevista
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                              >
                                Mètode
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-600">
                            {studentPaymentsForYear.map((payment) => (
                              <tr key={payment.id}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{payment.service}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                  {payment.price.toFixed(2)} €
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                      payment.status,
                                    )}`}
                                  >
                                    {payment.status}
                                  </span>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
                                  {formatDate(payment.expectedDate)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
                                  {payment.paymentMethod}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No hi ha pagaments registrats per a aquest alumne i any acadèmic.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <p className="text-sm text-gray-500 italic">No hi ha alumnes relacionats amb aquest titular.</p>
        )}
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "dades":
        return <TitularDadesTabContent titularData={currentTitularData} onUpdate={handleLocalTitularUpdate} />
      case "alumnes":
        return <TitularAlumnesTabContent titular={currentTitularData} />
      default:
        return null
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 text-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-700">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button
            onClick={onNavigateBack}
            title="Tornar a Titulars"
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            {" "}
            <ArrowLeft size={20} />{" "}
          </button>
          <img
            src={
              currentTitularData.avatarUrl ||
              `https://placehold.co/64x64/4B5563/E5E7EB?text=${currentTitularData.name.substring(0, 2).toUpperCase() || "/placeholder.svg"}`
            }
            alt={currentTitularData.name}
            className="w-16 h-16 rounded-full border-2 border-gray-600"
            onError={(e) => {
              e.target.src = `https://placehold.co/64x64/4B5563/9CA3AF?text=Err`
            }}
          />
          <div>
            {" "}
            <h2 className="text-2xl font-semibold text-white">{currentTitularData.name}</h2>{" "}
            <p className="text-sm text-gray-400">{currentTitularData.email || "Email no disponible"}</p>{" "}
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
          <p className="text-sm text-gray-400">
            <span className="font-medium text-gray-300">Telèfon:</span> {currentTitularData.phone || "-"}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium text-gray-300">Alumnes:</span>{" "}
            {currentTitularData.relatedStudentIds?.length || 0}
          </p>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 focus:outline-none transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500"
              }`}
            >
              <tab.icon size={16} /> <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div> {renderTabContent()} </div>
      {/* Modals (if any are needed for this view later) */}
    </div>
  )
}

export default TitularDetailView
