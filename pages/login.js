"use client"

import { useRouter } from "next/router"
import LoginPage from "../components/auth/LoginPage"

export default function Login() {
    const router = useRouter()

    const handleLogin = (userData) => {
        // In a real app, you would store the user data in a state management solution
        // For this demo, we'll use localStorage
        localStorage.setItem("user", JSON.stringify(userData))

        // Redirect to the main page
        router.push("/")
    }

    return <LoginPage onLogin={handleLogin} />
}
