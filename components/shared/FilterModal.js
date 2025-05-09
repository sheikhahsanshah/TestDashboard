"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"
import FilterDropdown from "./FilterDropdown"
import { MapPin, Building, User, BookOpen, Palette, GraduationCap, CreditCard, CheckCircle } from "lucide-react"

// Additional filter options for professors
const teacherStatuses = ["Actiu", "Inactiu", "Baixa"]
const paymentMethods = ["Targeta", "Efectiu", "Rebut Domiciliat", "Transferència"]
const paymentStatuses = ["Pagat", "Pendent", "Impagat"]

// Sample data for filters
const localitzacions = ["ACT TGN", "ACT CNS", "Calafell", "Centres Cívics", "Online"]
const aulesOptions = [1, 2, 3, 4, 5]
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
const alumnes = [
    "Pau Torres",
    "Guillem Mercuri",
    "Helena Gimeno",
    "Sofia Camps",
    "Martí López",
    "Júlia Ferrer",
    "Nil Bosch",
    "Aina Solé",
    "Pol Romero",
    "Carla Esteve",
]
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
const groupByOptions = ["Localització", "Aules", "Docent", "Curs"]

// Modal Component for Filters
const FilterModal = ({ isOpen, onClose, onApplyFilters, initialFilters, title, showGroupBy = false }) => {
    const [localFilters, setLocalFilters] = useState(initialFilters || {})
    const modalRef = useRef(null)
    useOnClickOutside(modalRef, onClose)

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(initialFilters || {})
        }
    }, [isOpen, initialFilters])

    const handleSelectionChange = (filterName, value) => {
        setLocalFilters((prev) => ({ ...prev, [filterName]: value }))
    }

    const handleApply = () => {
        onApplyFilters(localFilters)
    }

    if (!isOpen) return null

    // Define filters based on title
    const renderFilters = () => {
        if (title === "Filtres Alumnes" || title === "Filtres Horaris") {
            return (
                <>
                    <FilterDropdown
                        title="Localització"
                        options={localitzacions}
                        icon={MapPin}
                        selectedValues={localFilters.localitzacions || []}
                        onSelectionChange={(val) => handleSelectionChange("localitzacions", val)}
                    />
                    <FilterDropdown
                        title="Aules"
                        options={aulesOptions.map(String)}
                        icon={Building}
                        selectedValues={localFilters.aules || []}
                        onSelectionChange={(val) => handleSelectionChange("aules", val)}
                    />
                    <FilterDropdown
                        title="Docent"
                        options={docents}
                        icon={User}
                        searchable={true}
                        selectedValues={localFilters.docents || []}
                        onSelectionChange={(val) => handleSelectionChange("docents", val)}
                    />
                    {title === "Filtres Horaris" && (
                        <FilterDropdown
                            title="Alumne"
                            options={alumnes}
                            icon={GraduationCap}
                            searchable={true}
                            selectedValues={localFilters.alumnes || []}
                            onSelectionChange={(val) => handleSelectionChange("alumnes", val)}
                        />
                    )}
                    <FilterDropdown
                        title="Curs"
                        options={cursos}
                        icon={BookOpen}
                        searchable={true}
                        selectedValues={localFilters.cursos || []}
                        onSelectionChange={(val) => handleSelectionChange("cursos", val)}
                    />
                    {showGroupBy && (
                        <div className="pt-4 border-t border-gray-700">
                            <FilterDropdown
                                title="Agrupa color per:"
                                options={groupByOptions}
                                icon={Palette}
                                selectedValues={localFilters.groupBy || "Aula"}
                                onSelectionChange={(val) => handleSelectionChange("groupBy", val)}
                            />
                        </div>
                    )}
                </>
            )
        } else if (title === "Filtres Professors") {
            return (
                <>
                    <FilterDropdown
                        title="Servei"
                        options={cursos}
                        icon={BookOpen}
                        searchable={true}
                        selectedValues={localFilters.servei || []}
                        onSelectionChange={(val) => handleSelectionChange("servei", val)}
                    />
                    <FilterDropdown
                        title="Estat"
                        options={teacherStatuses}
                        icon={User}
                        selectedValues={localFilters.estat || []}
                        onSelectionChange={(val) => handleSelectionChange("estat", val)}
                    />
                </>
            )
        } else if (title === "Filtres Cursos") {
            return (
                <>
                    <FilterDropdown
                        title="Localització"
                        options={localitzacions}
                        icon={MapPin}
                        selectedValues={localFilters.localitzacions || []}
                        onSelectionChange={(val) => handleSelectionChange("localitzacions", val)}
                    />
                    <FilterDropdown
                        title="Docent"
                        options={docents}
                        icon={User}
                        searchable={true}
                        selectedValues={localFilters.docents || []}
                        onSelectionChange={(val) => handleSelectionChange("docents", val)}
                    />
                    <FilterDropdown
                        title="Curs"
                        options={cursos}
                        icon={BookOpen}
                        searchable={true}
                        selectedValues={localFilters.cursos || []}
                        onSelectionChange={(val) => handleSelectionChange("cursos", val)}
                    />
                </>
            )
        } else if (title === "Filtres Pagaments") {
            return (
                <>
                    <FilterDropdown
                        title="Servei"
                        options={cursos}
                        icon={BookOpen}
                        searchable={true}
                        selectedValues={localFilters.servei || []}
                        onSelectionChange={(val) => handleSelectionChange("servei", val)}
                    />
                    <FilterDropdown
                        title="Localització"
                        options={localitzacions}
                        icon={MapPin}
                        selectedValues={localFilters.localitzacio || []}
                        onSelectionChange={(val) => handleSelectionChange("localitzacio", val)}
                    />
                    <FilterDropdown
                        title="Mètode Pagament"
                        options={paymentMethods}
                        icon={CreditCard}
                        selectedValues={localFilters.metode || []}
                        onSelectionChange={(val) => handleSelectionChange("metode", val)}
                    />
                    <FilterDropdown
                        title="Estat Pagament"
                        options={paymentStatuses}
                        icon={CheckCircle}
                        selectedValues={localFilters.estat || []}
                        onSelectionChange={(val) => handleSelectionChange("estat", val)}
                    />
                </>
            )
        }
        // Default case - return basic filters
        return (
            <>
                <FilterDropdown
                    title="Localització"
                    options={localitzacions}
                    icon={MapPin}
                    selectedValues={localFilters.localitzacions || []}
                    onSelectionChange={(val) => handleSelectionChange("localitzacions", val)}
                />
                <FilterDropdown
                    title="Curs"
                    options={cursos}
                    icon={BookOpen}
                    searchable={true}
                    selectedValues={localFilters.cursos || []}
                    onSelectionChange={(val) => handleSelectionChange("cursos", val)}
                />
            </>
        )
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    {renderFilters()}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                    >
                        Cancel·lar
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                    >
                        Aplicar Filtres
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilterModal
