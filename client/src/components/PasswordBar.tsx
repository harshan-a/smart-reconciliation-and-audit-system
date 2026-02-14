import { useState, type Dispatch, type SetStateAction } from "react"
import eyeCloseIcon from "../assets/icons/eye-close-icon.svg"
import eyeOpenIcon from "../assets/icons/eye-open-icon.svg"

type PasswordBarProps = {
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  placeHolder?: string
}

export default function PasswordBar({
  password,
  setPassword,
  placeHolder = "Password",
}: PasswordBarProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="mb-4 relative flex items-center">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder={placeHolder}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="input-bar pr-12"
      />
      <div
        className="absolute w-5 h-5 right-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault()
          setShowPassword((p) => !p)
        }}>
        <img src={showPassword ? eyeOpenIcon : eyeCloseIcon} alt="eye" />
      </div>
    </div>
  )
}
