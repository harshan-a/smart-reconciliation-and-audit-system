import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react"

import type { Role } from "../../types"
import { saveAccessToken } from "../../utils/token"

import PasswordBar from "../../components/PasswordBar"
import { SetIsLoading } from "../../context"
import { signup } from "../../api/auth"

type SignupProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function Signup({ setIsLogin }: SignupProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<Role>("viewer")
  const [roleSecret, setRoleSecret] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const setIsLoading = useContext(SetIsLoading)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await signup({
        name,
        email,
        password,
        role,
        roleSecret,
      })

      saveAccessToken(data.token)
      setErrorMessage("")
      window.location.href = "/dashboard"

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
      <h2 className="text-center mb-5">Signup</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="input-bar"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-bar"
          />
        </div>
        <PasswordBar password={password} setPassword={setPassword} />
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-bar"
          />
        </div>
        <div className="mb-4 flex items-center gap-x-2 px-1">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            className="flex-1 input-bar px-1 py-1"
            onChange={(e) => setRole(e.target.value as Role)}>
            <option value="viewer">Viewer</option>
            <option value="analyst">Analyst</option>
            <option value="admin">Admim</option>
          </select>
        </div>
        {role !== "viewer" && (
          <div className="">
            <PasswordBar
              password={roleSecret}
              setPassword={setRoleSecret}
              placeHolder="Role secret"
            />
          </div>
        )}
        <button type="submit" className="submit-btn">
          Signup
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="text-center mt-4 ">
        Already have an account?{" "}
        <span
          className="underline cursor-pointer text-cyan-400"
          onClick={() => setIsLogin(true)}>
          Login
        </span>
      </p>
    </>
  )
}
