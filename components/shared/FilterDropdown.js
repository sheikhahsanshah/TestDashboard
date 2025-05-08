"use client"

import React, { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Component Filtre Desplegable Reutilitzable - Restored state and handlers
const FilterDropdown = ({ title, options, icon, searchable = false, selectedValues, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)

  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false)
    setSearchTerm("")
  })

  const filteredOptions = searchable
    ? options.filter((option) => option?.toLowerCase().includes(searchTerm.toLowerCase()))
    : options

  const handleToggle = (option) => {
    if (!Array.isArray(selectedValues)) {
      onSelectionChange(option)
      setIsOpen(false)
      return
    }

    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option]

    onSelectionChange(newSelection)
  }

  const getDisplayValue = () => {
    if (!Array.isArray(selectedValues)) {
      const baseTitle = title.includes(":") ? title.substring(0, title.indexOf(":") + 1) : title
      return `${baseTitle} ${selectedValues}`
    }

    if (selectedValues.length === 0) return title
    if (selectedValues.length === 1) return selectedValues[0]
    return `${title} (${selectedValues.length})`
  }

  const isChecked = (option) => {
    return Array.isArray(selectedValues) ? selectedValues.includes(option) : selectedValues === option
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-gray-300 hover:text-white py-2 px-1 rounded hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-2 overflow-hidden">
          {icon && React.createElement(icon, { size: 16, className: "flex-shrink-0 text-gray-400" })}
          <span
            className={`font-medium truncate ${
              (Array.isArray(selectedValues) ? selectedValues.length > 0 : !!selectedValues) ? "text-blue-400" : ""
            }`}
            title={getDisplayValue()}
          >
            {getDisplayValue()}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-full max-w-xs bg-gray-700 border border-gray-600 rounded-md shadow-lg z-30 max-h-60 overflow-y-auto">
          {searchable && (
            <div className="p-2 border-b border-gray-600">
              <input
                type="text"
                placeholder={`Cercar ${title}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 bg-gray-600 text-gray-200 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
          <ul className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className="px-3 py-1.5 hover:bg-gray-600 cursor-pointer flex items-center space-x-2"
                  onClick={() => handleToggle(option)}
                >
                  {Array.isArray(selectedValues) ? (
                    <input
                      type="checkbox"
                      checked={isChecked(option)}
                      readOnly
                      className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                    />
                  ) : (
                    <div
                      className={`h-4 w-4 rounded-full border border-gray-500 flex items-center justify-center ${isChecked(option) ? "bg-blue-500" : "bg-gray-600"}`}
                    >
                      {isChecked(option) && <div className="h-1.5 w-1.5 rounded-full bg-white"></div>}
                    </div>
                  )}
                  <span className="text-sm text-gray-200">{option}</span>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-400 italic">No s'han trobat resultats</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
