"use client"

import { useState, useRef } from "react"
import { Search, Bell, ChevronDown } from "lucide-react"
import { useOnClickOutside } from "../utils/hooks"

// --- Dades de Mostra ---
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

// Component Top Bar - Restored state and handlers
const TopBar = () => {
  const [isScopeDropdownOpen, setIsScopeDropdownOpen] = useState(false)
  const [selectedScope, setSelectedScope] = useState("Tot")
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const scopeOptions = ["Tot", "Localitzacions", "Aules", "Docents", "Alumnes", "Cursos"]
  const scopeDropdownRef = useRef(null)
  const searchContainerRef = useRef(null)

  useOnClickOutside(scopeDropdownRef, () => setIsScopeDropdownOpen(false))
  useOnClickOutside(searchContainerRef, () => setIsSuggestionsOpen(false))

  const handleSelectScope = (scope) => {
    setSelectedScope(scope)
    setIsScopeDropdownOpen(false)
    setSearchTerm("")
    setSuggestions([])
    setIsSuggestionsOpen(false)
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    if (value.length > 1) {
      let foundSuggestions = []
      if (selectedScope === "Tot" || selectedScope === "Alumnes") {
        foundSuggestions = foundSuggestions.concat(
          alumnes
            .filter((a) => a.toLowerCase().includes(value.toLowerCase()))
            .map((a) => ({ id: `alumne-${a}`, name: a, type: "Alumne" })),
        )
      }
      if (selectedScope === "Tot" || selectedScope === "Cursos") {
        foundSuggestions = foundSuggestions.concat(
          cursos
            .filter((c) => c.toLowerCase().includes(value.toLowerCase()))
            .map((c) => ({ id: `curs-${c}`, name: c, type: "Curs" })),
        )
      }
      setSuggestions(foundSuggestions.slice(0, 10))
      setIsSuggestionsOpen(foundSuggestions.length > 0)
    } else {
      setSuggestions([])
      setIsSuggestionsOpen(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name)
    setSuggestions([])
    setIsSuggestionsOpen(false)
    console.log("Selected suggestion:", suggestion)
  }

  return (
    <div className="flex items-center justify-between p-3 h-[68px] bg-gray-800 text-gray-300 border-b border-gray-700 shadow-sm sticky top-0 z-10">
      <div className="relative" ref={searchContainerRef}>
        <div className="flex items-center bg-gray-700 rounded-lg">
          <div className="relative" ref={scopeDropdownRef}>
            <button
              onClick={() => setIsScopeDropdownOpen(!isScopeDropdownOpen)}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-400 hover:text-gray-200 border-r border-gray-600 focus:outline-none rounded-l-lg"
            >
              <span>{selectedScope}</span>
              <ChevronDown
                size={14}
                className={`transform transition-transform duration-200 ${isScopeDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isScopeDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-30">
                <ul className="py-1">
                  {scopeOptions.map((scope) => (
                    <li key={scope}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handleSelectScope(scope)
                        }}
                        className={`block px-4 py-2 text-sm ${selectedScope === scope ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-600 hover:text-white"}`}
                      >
                        {scope}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative flex-grow">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder={`Buscar a ${selectedScope}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length > 1 && setIsSuggestionsOpen(true)}
              className="bg-transparent text-gray-200 placeholder-gray-500 rounded-r-lg py-2 pl-10 pr-4 w-64 focus:outline-none"
            />
          </div>
        </div>
        {isSuggestionsOpen && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg z-30 max-h-60 overflow-y-auto">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                >
                  <span className="text-sm text-gray-200">{suggestion.name}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      suggestion.type === "Alumne"
                        ? "bg-purple-600 text-purple-100"
                        : suggestion.type === "Curs"
                          ? "bg-green-600 text-green-100"
                          : "bg-gray-500 text-gray-100"
                    }`}
                  >
                    {suggestion.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
          <Bell size={21} />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-gray-700">
          <img
            src="https://placehold.co/32x32/374151/E5E7EB?text=H"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-gray-600"
          />
          <span className="text-sm font-medium text-gray-200 hidden sm:inline">Helena</span>
        </div>
      </div>
    </div>
  )
}

export default TopBar
