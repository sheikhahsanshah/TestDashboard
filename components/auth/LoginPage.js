"use client"

import { useState } from "react"
import { Eye, EyeOff, LogIn } from "lucide-react"

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Simulate authentication delay
        setTimeout(() => {
            // Simple frontend validation
            if (!username || !password) {
                setError("Si us plau, introdueix nom d'usuari i contrasenya")
                setIsLoading(false)
                return
            }

            // Mock authentication - in a real app, this would be an API call
            if (username === "helena" && password === "password") {
                // Successful login
                onLogin({ username, name: "Helena", avatar: "H" })
            } else {
                // Failed login
                setError("Nom d'usuari o contrasenya incorrectes")
            }
            setIsLoading(false)
        }, 800)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Acadèmia</h1>
                    <p className="mt-2 text-gray-400">Accedeix al teu compte</p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-200 bg-red-900/40 border border-red-800 rounded-md">{error}</div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                                Nom d'usuari
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Introdueix el teu nom d'usuari"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Contrasenya
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Introdueix la teva contrasenya"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-300">
                                Recorda'm
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="text-blue-400 hover:text-blue-300">
                                Has oblidat la contrasenya?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            ) : (
                                <LogIn size={18} className="mr-2" />
                            )}
                            Iniciar sessió
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-400 bg-gray-800">O continua amb</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600">
                            Google
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600">
                            Microsoft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
