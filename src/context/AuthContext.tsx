import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
    id: string
    email: string
    username: string
    plan: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    register: (email: string, password: string, username: string, name: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE = 'http://localhost:3001/api'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [isLoading, setIsLoading] = useState(true)

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const savedToken = localStorage.getItem('token')
            if (savedToken) {
                try {
                    const res = await fetch(`${API_BASE}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${savedToken}` }
                    })
                    if (res.ok) {
                        const userData = await res.json()
                        setUser({
                            id: userData._id,
                            email: userData.email,
                            username: userData.username,
                            plan: userData.plan
                        })
                        setToken(savedToken)
                    } else {
                        localStorage.removeItem('token')
                        setToken(null)
                    }
                } catch {
                    localStorage.removeItem('token')
                    setToken(null)
                }
            }
            setIsLoading(false)
        }
        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()

            if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                setUser(data.user)
                return { success: true }
            } else {
                return { success: false, error: data.error }
            }
        } catch {
            return { success: false, error: 'Network error. Please try again.' }
        }
    }

    const register = async (email: string, password: string, username: string, name: string) => {
        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username, name })
            })
            const data = await res.json()

            if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                setUser(data.user)
                return { success: true }
            } else {
                return { success: false, error: data.error }
            }
        } catch {
            return { success: false, error: 'Network error. Please try again.' }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
