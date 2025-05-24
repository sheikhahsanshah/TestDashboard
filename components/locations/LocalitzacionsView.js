"use client"

import React from "react"

import { useState, useRef } from "react"
import { Plus, Building, Pencil, Trash2, ChevronDown } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Sample data for Locations View
const sampleLocations = [
    {
        id: "loc-1",
        name: "ACT TGN",
        color: "bg-blue-600",
        studentCount: 85,
        aules: [
            { id: "a1", name: "Aula 1" },
            { id: "a2", name: "Aula 2" },
            { id: "a5", name: "Aula 5" },
        ],
    },
    {
        id: "loc-2",
        name: "ACT CNS",
        color: "bg-purple-600",
        studentCount: 62,
        aules: [
            { id: "a3", name: "Aula 3" },
            { id: "a4", name: "Aula 4" },
        ],
    },
    {
        id: "loc-3",
        name: "Calafell",
        color: "bg-green-600",
        studentCount: 48,
        aules: [{ id: "a6", name: "Aula Principal" }],
    },
    {
        id: "loc-4",
        name: "Centres Cívics TGN",
        color: "bg-yellow-600",
        studentCount: 35,
        aules: [{ id: "a7", name: "Sala Polivalent" }],
    },
    { id: "loc-5", name: "Online", color: "bg-teal-600", studentCount: 112, aules: [] },
]

// --- Vista Localitzacions ---

const AddLocationModal = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState("")
    const [color, setColor] = useState("#3b82f6") // Default blue-600 hex code

    const modalRef = useRef()
    useOnClickOutside(modalRef, onClose)

    if (!isOpen) return null

    const handleSubmit = () => {
        if (name.trim() === "") return // Prevent empty names
        onSave({ name, color })
        setName("")
        setColor("#3b82f6") // Reset to default
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-900 border-gray-700">
                <div ref={modalRef}>
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-white">Afegir Localització</h3>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Nom de la localització"
                                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="color"
                                className="mt-3 w-full h-10 rounded-md border-gray-600 bg-gray-800"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            onClick={handleSubmit}
                        >
                            Afegir
                        </button>
                        <button
                            className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            onClick={onClose}
                        >
                            Cancel·lar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LocalitzacionsView = () => {
    const [locations, setLocations] = useState(sampleLocations)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [expandedLocationId, setExpandedLocationId] = useState(null)
    const [sortColumn, setSortColumn] = useState(null)
    const [sortDirection, setSortDirection] = useState("asc")

    const handleAddLocation = (newLocationData) => {
        console.log("Adding new location:", newLocationData)
        const newLocation = { id: `loc-${Date.now()}`, ...newLocationData, studentCount: 0, aules: [] }
        setLocations((prev) => [...prev, newLocation])
        setIsAddModalOpen(false)
    }
    const toggleRowExpansion = (locationId) => {
        setExpandedLocationId((prevId) => (prevId === locationId ? null : locationId))
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const getSortedLocations = (locations) => {
        if (!sortColumn) return locations

        return [...locations].sort((a, b) => {
            let aValue = a[sortColumn]
            let bValue = b[sortColumn]

            if (typeof aValue === "string") {
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
                <h2 className="text-xl font-semibold text-white">Localitzacions</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
                >
                    <Plus size={20} /> <span className="font-medium">Nova Localització</span>
                </button>
            </div>
            <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
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
                                onClick={() => handleSort("color")}
                            >
                                Color <SortIcon column="color" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("studentCount")}
                            >
                                Núm. Alumnes <SortIcon column="studentCount" />
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                {" "}
                                <span className="sr-only">Accions</span>{" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {getSortedLocations(locations).map((location) => (
                            <React.Fragment key={location.id}>
                                <tr className="hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{location.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-block h-4 w-4 rounded-full ${location.color || "bg-gray-500"}`}
                                            title={location.color}
                                        ></span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{location.studentCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {/* Button to toggle expansion */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleRowExpansion(location.id)
                                            }}
                                            className="text-gray-400 hover:text-white mr-4 p-1 rounded hover:bg-gray-700"
                                            title={expandedLocationId === location.id ? "Tancar Aules" : "Veure Aules"}
                                        >
                                            <Building size={16} className="inline mr-1" />
                                            <ChevronDown
                                                size={16}
                                                className={`inline-block transition-transform duration-200 ${expandedLocationId === location.id ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                console.log("Edit location", location.id)
                                            }}
                                            className="text-indigo-400 hover:text-indigo-300 mr-4 p-1 rounded hover:bg-gray-700"
                                        >
                                            {" "}
                                            <Pencil size={16} />{" "}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                console.log("Delete location", location.id)
                                            }}
                                            className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-gray-700"
                                        >
                                            {" "}
                                            <Trash2 size={16} />{" "}
                                        </button>
                                    </td>
                                </tr>
                                {/* Expanded Row for Aula Management */}
                                {expandedLocationId === location.id && (
                                    <tr className="bg-gray-700/30">
                                        <td colSpan="4" className="px-6 py-4">
                                            <div className="p-4 bg-gray-700 rounded-md">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="text-md font-semibold text-gray-200">Aules ({location.aules?.length || 0})</h4>
                                                    <button className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 bg-gray-600 px-2 py-1 rounded hover:bg-gray-500">
                                                        <Plus size={14} />
                                                        <span>Afegir Aula</span>
                                                    </button>
                                                </div>
                                                {location.aules && location.aules.length > 0 ? (
                                                    <table className="min-w-full divide-y divide-gray-600">
                                                        <thead className="bg-gray-600/50">
                                                            <tr>
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                                    Nom Aula
                                                                </th>
                                                                <th className="relative px-4 py-2">
                                                                    <span className="sr-only">Accions</span>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-600">
                                                            {location.aules.map((aula) => (
                                                                <tr key={aula.id} className="hover:bg-gray-600/50">
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{aula.name}</td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm">
                                                                        <button className="text-indigo-400 hover:text-indigo-300 mr-2 p-1 rounded hover:bg-gray-500/50">
                                                                            {" "}
                                                                            <Pencil size={14} />{" "}
                                                                        </button>
                                                                        <button className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-gray-500/50">
                                                                            {" "}
                                                                            <Trash2 size={14} />{" "}
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p className="text-sm text-gray-400 italic mt-2">
                                                        No hi ha aules definides per a aquesta localització.
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        {locations.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-500 italic">
                                    No hi ha localitzacions definides.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Add Location Modal */}
            <AddLocationModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAddLocation} />
        </div>
    )
}

export default LocalitzacionsView
