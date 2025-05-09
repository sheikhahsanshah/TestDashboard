"use client"
import {
    CalendarDays,
    MapPin,
    BookOpen,
    GraduationCap,
    CreditCard,
    ChevronsLeft,
    ChevronsRight,
    Users,
} from "lucide-react"

// Updated mainNavItems to include Professors with a distinct icon
const mainNavItems = [
    { id: "horaris", label: "Horaris", icon: CalendarDays },
    { id: "localitzacions", label: "Localitzacions", icon: MapPin },
    { id: "cursos", label: "Cursos", icon: BookOpen },
    { id: "alumnes", label: "Alumnes", icon: GraduationCap },
    { id: "pagaments", label: "Pagaments", icon: CreditCard },
    { id: "professors", label: "Professors", icon: Users }, // Added Professors with Users icon
]

// Component Main Sidebar Navigation
const MainSidebar = ({ activeView, onNavigate, isMainMenuOpen, onToggleMainMenu }) => {
    return (
        <aside
            className={`bg-gray-800 text-gray-300 flex flex-col h-screen fixed top-0 left-0 z-30 border-r border-gray-700 transition-all duration-300 ease-in-out ${isMainMenuOpen ? "w-60" : "w-20"}`}
        >
            <div
                className={`h-[68px] flex items-center justify-between border-b border-gray-700 ${isMainMenuOpen ? "px-6" : "px-2"}`}
            >
                <span
                    className={`text-xl font-semibold text-white transition-opacity duration-200 whitespace-nowrap ${isMainMenuOpen ? "opacity-100 delay-200" : "opacity-0 absolute pointer-events-none"}`}
                >
                    Acadèmia
                </span>
                <span
                    className={`text-xl font-bold text-white transition-opacity duration-200 whitespace-nowrap ${!isMainMenuOpen ? "opacity-100" : "opacity-0 absolute pointer-events-none"}`}
                >
                    A
                </span>
                <button
                    onClick={onToggleMainMenu}
                    className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                    title={isMainMenuOpen ? "Contraure Menú" : "Expandir Menú"}
                >
                    {isMainMenuOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
                </button>
            </div>
            <nav className="flex-1 mt-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
                {mainNavItems.map((item) => (
                    <a
                        key={item.id}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            onNavigate(item.id)
                        }}
                        title={item.label}
                        className={`flex items-center space-x-3 px-3 py-2.5 text-sm rounded-md transition-colors ${activeView === item.id
                                ? "bg-blue-600 text-white font-medium shadow-sm"
                                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                            } ${!isMainMenuOpen ? "justify-center" : ""}`}
                    >
                        <item.icon size={18} className="flex-shrink-0" />
                        {isMainMenuOpen && (
                            <span className={`transition-opacity duration-200 delay-150 whitespace-nowrap`}>{item.label}</span>
                        )}
                    </a>
                ))}
            </nav>
        </aside>
    )
}

export default MainSidebar
