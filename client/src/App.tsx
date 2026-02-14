import { useState } from "react"
import { Route, Routes } from "react-router"

import LoadingGif from "./assets/icons/loading.gif"

import { SetIsLoading } from "./context"
import AuthForm from "./pages/auth/AuthForm"
import Dashboard from "./pages/dashboard/Dashboard"
import ProtectedRoute from "./components/ProtectedRouter"
import Layout from "./layout/Layout"
import Upload from "./pages/upload/Upload"
import Records from "./pages/records/Records"

function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <SetIsLoading.Provider value={setIsLoading}>
      {isLoading && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-[3px] cursor-wait">
          <img src={LoadingGif} alt="Loading..." className="w-12 h-12" />
        </div>
      )}

      <Routes>
        <Route path="/" element={<AuthForm />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/records" element={<Records />} />
          </Route>
        </Route>
      </Routes>
    </SetIsLoading.Provider>
  )
}

export default App
