"use client"

import { useState } from "react"
import { Filter, Plus, Pencil, Trash2 } from "lucide-react"
import FilterModal from "../shared/FilterModal"
import AddEditTitularModal from "./AddEditTitularModal"

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

// Sample student data for filtering
const initialStudents = [
    {
        id: 1,
        name: "Pau Torres",
        titularId: "tit1",
    },
    {
        id: 2,
        name: "Guillem Mercuri",
        titularId: "tit2",
    },
    {
        id: 3,
        name: "Helena Gimeno",
        titularId: "tit3",
    },
    {
        id: 4,
        name: "Sofia Camps",
        titularId: "tit2",
    },
    {
        id: 5,
        name: "Miquel Torres",
        titularId: "tit1",
    },
]

// --- Vista Titulars ---
const TitularsView = ({ navigateToTitularDetail }) => {
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
    const [isTitularModalOpen, setIsTitularModalOpen] = useState(false) // State for Add/Edit modal
    const [editingTitular, setEditingTitular] = useState(null) // State for titular being edited
    const [titulars, setTitulars] = useState(sampleTitulars) // Manage titulars data
    const [sortColumn, setSortColumn] = useState(null)
    const [sortDirection, setSortDirection] = useState("asc")

    // TODO: Add state for filters if needed for Titulars
    const [filterAlumne, setFilterAlumne] = useState([])

    const handleApplyFilters = (filters) => {
        console.log("Applying Titulars Filters:", filters)
        setFilterAlumne(filters.alumneRelacionat || [])
        // TODO: Implement filtering logic for titulars based on filters
        setIsFiltersModalOpen(false)
    }

    // TODO: Replace with actual titular data fetching and filtering logic
    const filteredTitulars = titulars.filter((titular) => {
        // Example filter: by related student name (if filterAlumne contains student names)
        const alumneMatch =
            filterAlumne.length === 0 ||
            titular.relatedStudentIds.some((studentId) => {
                const student = initialStudents.find((s) => s.id === studentId)
                return student && filterAlumne.includes(student.name)
            })
        return alumneMatch
    })

    const handleOpenTitularModal = (titular = null) => {
        setEditingTitular(titular)
        setIsTitularModalOpen(true)
    }

    const handleSaveTitular = (titularData) => {
        console.log("Saving Titular:", titularData)
        if (editingTitular) {
            setTitulars((prev) => prev.map((t) => (t.id === editingTitular.id ? { ...t, ...titularData } : t)))
        } else {
            const newTitular = { id: `tit-${Date.now()}`, relatedStudentIds: [], ...titularData } // Add default related students
            setTitulars((prev) => [...prev, newTitular])
        }
        setIsTitularModalOpen(false)
        setEditingTitular(null)
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const getSortedTitulars = (titulars) => {
        if (!sortColumn) return titulars

        return [...titulars].sort((a, b) => {
            let aValue = a[sortColumn]
            let bValue = b[sortColumn]

            if (sortColumn === "relatedStudentIds") {
                aValue = aValue?.length || 0
                bValue = bValue?.length || 0
            } else if (typeof aValue === "string") {
                aValue = aValue.toLowerCase()
                bValue = bValue.toLowerCase()
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
            return 0
        })
    }

    const SortIcon = ({ column }) => {
        if (sortColumn !== column) return <span className="text-gray-500 ml-1">↕</span>
        return <span className="text-blue-400 ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Llista de Titulars ({filteredTitulars.length})</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsFiltersModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                    >
                        <Filter size={20} /> <span className="font-medium hidden sm:inline">Filtrar</span>
                    </button>
                    <button
                        onClick={() => handleOpenTitularModal()}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                    >
                        <Plus size={20} /> <span className="font-medium">Afegir Titular</span>
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            {/* Define table headers for Titulars */}
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("name")}
                            >
                                Nom <SortIcon column="name" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("email")}
                            >
                                Correu Electrònic <SortIcon column="email" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("phone")}
                            >
                                Telèfon <SortIcon column="phone" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("relatedStudentIds")}
                            >
                                Alumnes Relacionats <SortIcon column="relatedStudentIds" />
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Accions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {getSortedTitulars(filteredTitulars).map((titular) => (
                            <tr
                                key={titular.id}
                                className="hover:bg-gray-700/50 cursor-pointer"
                                onClick={() => navigateToTitularDetail(titular.id)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full border border-gray-600"
                                                src={
                                                    titular.avatarUrl ||
                                                    `https://placehold.co/40x40/4B5563/E5E7EB?text=${titular.name.substring(0, 2).toUpperCase() || "/placeholder.svg"}`
                                                }
                                                alt={titular.name}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-100">{titular.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{titular.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{titular.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {titular.relatedStudentIds?.length || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleOpenTitularModal(titular)
                                        }}
                                        className="text-indigo-400 hover:text-indigo-300 mr-2 p-1 rounded hover:bg-gray-700"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("TODO: Delete titular", titular.id)
                                        }}
                                        className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-gray-700"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {getSortedTitulars(filteredTitulars).length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500 italic">
                                    No hi ha titulars definits.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Filter Modal for Titulars */}
            <FilterModal
                isOpen={isFiltersModalOpen}
                onClose={() => setIsFiltersModalOpen(false)}
                onApplyFilters={handleApplyFilters}
                initialFilters={{
                    alumneRelacionat: filterAlumne, // Pass current filter state
                }}
                title="Filtres Titulars"
            />
            {/* Add/Edit Titular Modal */}
            <AddEditTitularModal
                isOpen={isTitularModalOpen}
                onClose={() => {
                    setIsTitularModalOpen(false)
                    setEditingTitular(null)
                }}
                onSave={handleSaveTitular}
                initialData={editingTitular}
            />
        </div>
    )
}

export default TitularsView
