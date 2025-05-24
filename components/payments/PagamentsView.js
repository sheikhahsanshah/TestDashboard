"use client"

import { useState } from "react"
import { Filter, Plus, Pencil, Trash2, Send } from "lucide-react"
import FilterModal from "../shared/FilterModal"
import AddEditPaymentModal from "./AddEditPaymentModal"
import SendReceiptsModal from "./SendReceiptsModal"

// Sample Payment Data
const samplePayments = [
    {
        id: "p1",
        holderName: "Maria Garcia (Pau Torres)",
        price: 79.0,
        service: "REF 3-4 ESO",
        location: "ACT TGN",
        status: "Pagat",
        expectedDate: "2025-05-01",
        paymentMethod: "Rebut Domiciliat",
    },
    {
        id: "p2",
        holderName: "Maria Garcia (Pau Torres)",
        price: 95.0,
        service: "Mates Selectivitat",
        location: "ACT TGN",
        status: "Pagat",
        expectedDate: "2025-05-01",
        paymentMethod: "Rebut Domiciliat",
    },
    {
        id: "p3",
        holderName: "Joan Mercuri (Guillem Mercuri)",
        price: 79.0,
        service: "REF 3-4 ESO",
        location: "ACT TGN",
        status: "Pendent",
        expectedDate: "2025-05-05",
        paymentMethod: "Targeta",
    },
    {
        id: "p4",
        holderName: "Joan Mercuri (Guillem Mercuri)",
        price: 55.0,
        service: "Ang 1-2 ESO",
        location: "ACT CNS",
        status: "Pendent",
        expectedDate: "2025-05-05",
        paymentMethod: "Targeta",
    },
    {
        id: "p5",
        holderName: "Joan Mercuri (Guillem Mercuri)",
        price: 55.0,
        service: "Català ESO",
        location: "ACT TGN",
        status: "Pendent",
        expectedDate: "2025-05-05",
        paymentMethod: "Targeta",
    },
    {
        id: "p6",
        holderName: "Carles Gimeno (Helena Gimeno)",
        price: 79.0,
        service: "REF 3-4 ESO",
        location: "ACT TGN",
        status: "Impagat",
        expectedDate: "2025-04-05",
        paymentMethod: "Transferència",
    },
    {
        id: "p7",
        holderName: "Laura Vidal (Sofia Camps)",
        price: 65.0,
        service: "Ang B2 Prep",
        location: "Online",
        status: "Pagat",
        expectedDate: "2025-05-03",
        paymentMethod: "Efectiu",
    },
    {
        id: "p8",
        holderName: "Laura Vidal (Sofia Camps)",
        price: 50.0,
        service: "Ang B1",
        location: "Online",
        status: "Pagat",
        expectedDate: "2025-05-03",
        paymentMethod: "Efectiu",
    },
    {
        id: "p9",
        holderName: "Jordi López (Martí López)",
        price: 85.0,
        service: "Física 1r BAT",
        location: "ACT TGN",
        status: "Impagat",
        expectedDate: "2025-05-02",
        paymentMethod: "Rebut Domiciliat",
    },
]

const localitzacions = ["ACT TGN", "ACT CNS", "Calafell", "Centres Cívics", "Online"]
const cursos = [
    "REF 3-4 ESO",
    "Ang B2 Prep",
    "Mates Selectivitat",
    "Física 1r BAT",
    "Ang 1-2 ESO",
    "Ang B1",
    "Ref 1-2 BAT",
    "Francès A1",
    "Química Selectivitat",
    "Català ESO",
    "Història BAT",
    "Filosofia BAT",
    "Dibuix Tècnic",
]
const paymentMethods = ["Targeta", "Efectiu", "Rebut Domiciliat", "Transferència"]
const paymentStatuses = ["Pagat", "Pendent", "Impagat"]

// --- Vista Pagaments ---
const PagamentsView = () => {
    const [payments, setPayments] = useState(samplePayments)
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [editingPayment, setEditingPayment] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)) // format YYYY-MM
    const [selectedPayments, setSelectedPayments] = useState(new Set()) // State for selected payment IDs
    const [selectAll, setSelectAll] = useState(false) // State for select all checkbox
    const [isSendReceiptsModalOpen, setIsSendReceiptsModalOpen] = useState(false) // State for confirmation modal
    const [sortColumn, setSortColumn] = useState(null)
    const [sortDirection, setSortDirection] = useState("asc")

    // State for filters
    const [filterLocation, setFilterLocation] = useState([])
    const [filterService, setFilterService] = useState([])
    const [filterStatus, setFilterStatus] = useState([])
    const [filterMethod, setFilterMethod] = useState([])

    const handleApplyFilters = (filters) => {
        console.log("Applying Pagaments Filters:", filters)
        setFilterLocation(filters.localitzacio || [])
        setFilterService(filters.servei || [])
        setFilterStatus(filters.estat || [])
        setFilterMethod(filters.metode || [])
        setIsFiltersModalOpen(false)
    }

    // Filter payments based on selectedMonth and other active filters
    const filteredPayments = payments.filter((p) => {
        const monthMatch = p.expectedDate.startsWith(selectedMonth)
        const locationMatch = filterLocation.length === 0 || filterLocation.includes(p.location)
        const serviceMatch = filterService.length === 0 || filterService.includes(p.service)
        const statusMatch = filterStatus.length === 0 || filterStatus.includes(p.status)
        const methodMatch = filterMethod.length === 0 || filterMethod.includes(p.paymentMethod)
        return monthMatch && locationMatch && serviceMatch && statusMatch && methodMatch
    })

    const handleOpenPaymentModal = (payment = null) => {
        setEditingPayment(payment)
        setIsPaymentModalOpen(true)
    }

    const handleSavePayment = (paymentData) => {
        console.log("Saving Payment:", paymentData)
        if (editingPayment) {
            setPayments((prev) => prev.map((p) => (p.id === editingPayment.id ? { ...p, ...paymentData } : p)))
        } else {
            const newPayment = { id: `p-${Date.now()}`, ...paymentData }
            setPayments((prev) => [...prev, newPayment])
        }
        setIsPaymentModalOpen(false)
        setEditingPayment(null)
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

    // --- Selection Logic ---
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked
        setSelectAll(isChecked)
        if (isChecked) {
            const allIds = new Set(filteredPayments.map((p) => p.id))
            setSelectedPayments(allIds)
        } else {
            setSelectedPayments(new Set())
        }
    }

    const handleSelectPayment = (paymentId) => {
        setSelectedPayments((prevSelected) => {
            const newSelected = new Set(prevSelected)
            if (newSelected.has(paymentId)) {
                newSelected.delete(paymentId)
            } else {
                newSelected.add(paymentId)
            }
            setSelectAll(newSelected.size === filteredPayments.length && filteredPayments.length > 0)
            return newSelected
        })
    }

    // --- Send Receipts Logic ---
    const handleOpenSendReceiptsModal = () => {
        if (selectedPayments.size > 0) {
            setIsSendReceiptsModalOpen(true)
        }
    }

    const getSelectedPaymentDetails = () => {
        return payments.filter((p) => selectedPayments.has(p.id))
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const getSortedPayments = (payments) => {
        if (!sortColumn) return payments

        return [...payments].sort((a, b) => {
            let aValue = a[sortColumn]
            let bValue = b[sortColumn]

            if (sortColumn === "expectedDate") {
                aValue = new Date(aValue || 0)
                bValue = new Date(bValue || 0)
            } else if (sortColumn === "price") {
                aValue = Number(aValue) || 0
                bValue = Number(bValue) || 0
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
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-white">Pagaments</h2>
                <div className="flex items-center space-x-2">
                    <label htmlFor="monthSelector" className="text-sm font-medium text-gray-400">
                        Mes:
                    </label>
                    <input
                        type="month"
                        id="monthSelector"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-3 py-1.5 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                    <button
                        onClick={() => setIsFiltersModalOpen(true)}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out text-sm"
                    >
                        <Filter size={16} /> <span className="hidden sm:inline">Filtrar</span>
                    </button>
                    <button
                        onClick={() => handleOpenPaymentModal()}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out text-sm"
                    >
                        <Plus size={16} /> <span className="hidden sm:inline">Afegir Pagament</span>
                    </button>
                    {/* Conditional Button for Sending Receipts */}
                    {selectedPayments.size > 0 && (
                        <button
                            onClick={handleOpenSendReceiptsModal}
                            className="flex items-center space-x-2 px-3 py-1.5 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out text-sm"
                        >
                            <Send size={16} /> <span>Enviar Rebuts ({selectedPayments.size})</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th scope="col" className="p-4 w-4">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    disabled={filteredPayments.length === 0}
                                />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("holderName")}
                            >
                                Titular <SortIcon column="holderName" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("price")}
                            >
                                Preu <SortIcon column="price" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("service")}
                            >
                                Servei <SortIcon column="service" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("location")}
                            >
                                Localització <SortIcon column="location" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("status")}
                            >
                                Estat <SortIcon column="status" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("expectedDate")}
                            >
                                Data Prevista <SortIcon column="expectedDate" />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort("paymentMethod")}
                            >
                                Mètode <SortIcon column="paymentMethod" />
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Accions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {getSortedPayments(filteredPayments).map((payment) => (
                            <tr
                                key={payment.id}
                                className={`hover:bg-gray-700/50 ${selectedPayments.has(payment.id) ? "bg-blue-900/30" : ""}`}
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                        checked={selectedPayments.has(payment.id)}
                                        onChange={() => handleSelectPayment(payment.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{payment.holderName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{payment.price.toFixed(2)} €</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{payment.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{payment.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                            payment.status,
                                        )}`}
                                    >
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {formatDate(payment.expectedDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{payment.paymentMethod}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleOpenPaymentModal(payment)}
                                        className="text-indigo-400 hover:text-indigo-300 mr-2 p-1 rounded hover:bg-gray-700"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => console.log("TODO: Delete payment", payment.id)}
                                        className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-gray-700"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {getSortedPayments(filteredPayments).length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center py-10 text-gray-500 italic">
                                    No hi ha pagaments per a aquest mes o amb els filtres seleccionats.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Filter Modal for Payments */}
            <FilterModal
                isOpen={isFiltersModalOpen}
                onClose={() => setIsFiltersModalOpen(false)}
                onApplyFilters={handleApplyFilters}
                initialFilters={{
                    // Pass current filter values
                    localitzacio: filterLocation,
                    servei: filterService,
                    estat: filterStatus,
                    metode: filterMethod,
                }}
                title="Filtres Pagaments"
            />
            {/* Add/Edit Payment Modal */}
            <AddEditPaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => {
                    setIsPaymentModalOpen(false)
                    setEditingPayment(null)
                }}
                onSave={handleSavePayment}
                initialData={editingPayment}
            />
            {/* Send Receipts Confirmation Modal */}
            <SendReceiptsModal
                isOpen={isSendReceiptsModalOpen}
                onClose={() => setIsSendReceiptsModalOpen(false)}
                selectedPayments={getSelectedPaymentDetails()}
            />
        </div>
    )
}

export default PagamentsView
