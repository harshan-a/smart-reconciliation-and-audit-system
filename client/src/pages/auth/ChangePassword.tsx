import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react"
import PasswordBar from "../../components/PasswordBar"
import { SetIsLoading } from "../../context"
import { changePassword } from "../../api/auth"

type ChangePasswordProps = {
  email: string
  setForgotPassword: Dispatch<SetStateAction<boolean>>
}

export default function ChangePassword({
  email,
  setForgotPassword,
}: ChangePasswordProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState({ success: false, text: "" })

  const setIsLoading = useContext(SetIsLoading)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    if (password !== confirmPassword)
      return setMessage({ success: false, text: "Passwords do not match" })

    setIsLoading(true)
    try {
      const { data } = await changePassword({ email, password })
      setMessage({ success: data.success, text: data.msg })

      setTimeout(() => setForgotPassword(false), 200)
    } catch (err: any) {
      if (err.response?.data) {
        setMessage({
          success: err.response.data?.success,
          text: err.response.data?.msg,
        })
      } else setMessage({ success: false, text: "Something error:(" })
    }
    setIsLoading(false)
  }

  return (
    <>
      <h2 className="text-center mb-5">Enter New Password</h2>
      <form onSubmit={handleSubmit}>
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
        <button className={`submit-btn`}>Change Password</button>
      </form>

      {message.text && (
        <p className={`error-message ${message.success && "text-green-500"}`}>
          {message.text}
        </p>
      )}
    </>
  )
}
