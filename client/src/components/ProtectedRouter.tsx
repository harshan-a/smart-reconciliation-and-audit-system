import { Outlet } from "react-router"
import { getAccessToken } from "../utils/token"

export default function ProtectedRoute() {
  const token = getAccessToken()
  if (!token) {
    return (window.location.href = "/")
  }

  return <Outlet />
}
