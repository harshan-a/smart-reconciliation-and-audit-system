import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { getAccessToken, removeAccessToken } from "../utils/token"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      const decoded: any = jwtDecode(token)
      setUser({
        id: decoded.userId,
        role: decoded.role,
        isActive: decoded.isActive,
      })
    }
  }, [])

  const logout = () => {
    removeAccessToken()
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
