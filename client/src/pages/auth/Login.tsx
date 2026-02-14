import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react"

import { saveAccessToken } from "../../utils/token"

import EmailValidation from "../../components/EmailValidation"
import PasswordBar from "../../components/PasswordBar"
import { SetIsLoading } from "../../context"
import { login } from "../../api/auth"

type LoginProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setForgotPassword: Dispatch<SetStateAction<boolean>>
}

export default function Login({ setIsLogin, setForgotPassword }: LoginProps) {
  const [email, setEmail] = useState({ valid: false, mail: "" })
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const setIsLoading = useContext(SetIsLoading)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await login({ email: email.mail, password })

      saveAccessToken(data.token)
      setErrorMessage("")
      window.location.href = "/dashboard"
      console.log(data)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data) setErrorMessage(err.response?.data.msg)
      else setErrorMessage("Something error:(")
      console.log(err.response?.data)
    }
    setIsLoading(false)
  }

  return (
    <>
      <h2 className="text-center mb-5">Login</h2>

      <form onSubmit={handleSubmit}>
        <EmailValidation input={email} setInput={setEmail} />
        <PasswordBar password={password} setPassword={setPassword} />
        <button
          type="submit"
          className={`submit-btn ${email.valid ? "" : "pointer-events-none opacity-50"}`}
          inert={!email.valid}>
          Login
        </button>

        <p
          className="form-secondary-action"
          onClick={() => setForgotPassword(true)}>
          Forgot password?
        </p>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <span
          className="underline cursor-pointer text-cyan-400"
          onClick={() => setIsLogin(false)}>
          Signup
        </span>
      </p>
    </>
  )
}
