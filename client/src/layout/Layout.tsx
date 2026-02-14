import { Link, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import ErrorPopup from "../components/ErrorPopup"

export default function Layout() {
  const { user, logout } = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: any) => {
      setError(e.detail)
      setTimeout(() => setError(null), 4000)
    }

    window.addEventListener("api-error", handler)
    return () => window.removeEventListener("api-error", handler)
  }, [])

  return (
    <div className="flex min-h-screen bg-black text-gray-200">
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

      <aside className="fixed top-0 bottom-0 w-60 bg-gray-900 border-r border-gray-700 p-6">
        <h1 className="text-cyan-400 text-xl font-bold mb-6">Reconciliation</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:text-cyan-400">
            Dashboard
          </Link>

          {(user?.role === "admin" || user?.role === "analyst") && (
            <Link to="/upload" className="hover:text-cyan-400">
              Upload
            </Link>
          )}

          <Link to="/records" className="hover:text-cyan-400">
            Records
          </Link>
        </nav>

        <div className="mt-10 text-sm text-gray-400">
          Role: <span className="text-cyan-400">{user?.role}</span>
        </div>

        <button
          onClick={logout}
          className="mt-4 text-red-400 hover:text-red-300 text-sm">
          Logout
        </button>
      </aside>

      <main className="flex-1 ml-60 p-8 bg-gray-950">
        <Outlet />
      </main>
    </div>
  )
}
