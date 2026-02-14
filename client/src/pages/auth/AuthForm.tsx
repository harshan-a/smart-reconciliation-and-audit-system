import { useEffect, useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword"
import Header from "../../components/Header"
import { getAccessToken } from "../../utils/token"
import { useNavigate } from "react-router"

export default function Form() {
  const [isLogin, setIsLogin] = useState(true)
  const [forgotPassword, setForgotPassword] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = getAccessToken()
    if (token) navigate("/dashboard")
  }, [])

  return (
    <>
      <Header />
      <div className="min-w-85 w-1/2 max-w-120 mx-auto mt-5 py-5 px-8 border-box border border-cyan-700 rounded-lg bg-gray-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit ring-5 ring-cyan-400 transition-all duration-250 ease-linear hover:scale-105">
        {forgotPassword ? (
          <>
            <ForgotPassword setForgotPassword={setForgotPassword} />
          </>
        ) : isLogin ? (
          <Login
            setIsLogin={setIsLogin}
            setForgotPassword={setForgotPassword}
          />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </div>
    </>
  )
}
