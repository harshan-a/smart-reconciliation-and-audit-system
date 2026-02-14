import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react"
import EmailValidation from "../../components/EmailValidation"
import { sendOTP, verifyOTP } from "../../api/otp"
import { SetIsLoading } from "../../context"

type VerifyOTPProps = {
  email: { mail: string; valid: boolean }
  setEmail: Dispatch<SetStateAction<{ mail: string; valid: boolean }>>
  setIsOTPVerified: Dispatch<SetStateAction<boolean>>
}

export default function VerifyOTP({
  email,
  setEmail,
  setIsOTPVerified,
}: VerifyOTPProps) {
  const [isOTPSend, setIsOTPSend] = useState(false)
  const [otp, setOtp] = useState("")
  const [message, setMessage] = useState({ text: "", success: false })

  const setIsLoading = useContext(SetIsLoading)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isOTPSend) {
        const { data } = await verifyOTP({ email: email.mail, otp })

        setIsOTPVerified(data.success)
        setMessage({ success: data.success, text: data.msg })
      } else {
        const { data } = await sendOTP({ email: email.mail })
        setIsOTPSend(data.success)
        setMessage({ success: data.success, text: data.msg })
      }
    } catch (err: any) {
      if (err.response?.data)
        setMessage({
          success: err.response.data?.success,
          text: err.response.data?.msg,
        })
      else
        setMessage({
          success: false,
          text: "Something error:(",
        })
    }
    setIsLoading(false)
  }
  return (
    <>
      <h2 className="text-center mb-5">
        {isOTPSend ? "Verify OTP" : "Send OTP"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={`${isOTPSend ? "opacity-50 pointer-events-none" : ""}`}>
          <EmailValidation input={email} setInput={setEmail} />
        </div>
        {isOTPSend && (
          <div className="mb-4">
            <input
              type="text"
              name="otp"
              placeholder="otp (only 6 digits)"
              value={otp}
              minLength={6}
              onChange={(e) =>
                setOtp((p) => {
                  if (
                    (Number(e.target.value) || e.target.value === "") &&
                    e.target.value.length <= 6
                  )
                    return e.target.value
                  return p
                })
              }
              required
              className="input-bar"
            />
          </div>
        )}
        <button
          className={`submit-btn ${email.valid ? "" : "pointer-events-none opacity-50"}`}
          inert={!email.valid}>
          {isOTPSend ? "Verify otp" : "Send otp"}
        </button>
      </form>

      {message && (
        <p className={`error-message ${message.success && "text-green-500"}`}>
          {message.text}
        </p>
      )}
    </>
  )
}
