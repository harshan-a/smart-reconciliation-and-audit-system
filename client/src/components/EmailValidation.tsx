import axios from "axios"
import {
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from "react"
import { checkEmailExists } from "../api/users"

type EmailValidationProps = {
  input: { valid: boolean; mail: string }
  setInput: Dispatch<SetStateAction<{ valid: boolean; mail: string }>>
}

export default function EmailValidation({
  input,
  setInput,
}: EmailValidationProps) {
  const [message, setMessage] = useState<{
    success: boolean
    text: string | JSX.Element
  }>({ success: false, text: "" })

  useEffect(() => {
    const controller = new AbortController()

    async function getUser() {
      try {
        const { data } = await checkEmailExists({
          email: input.mail,
          options: { signal: controller.signal },
        })
        console.log(data)
        setInput((p) => ({ ...p, valid: true }))
        setMessage({ success: true, text: <>Valid user &#10003;</> })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (axios.isCancel(err)) return
        else if (err.response?.data)
          setMessage({
            success: false,
            text: <>{err.response?.data.msg} &times;</>,
          })
        else
          setMessage({
            success: false,
            text: "something error, try again later...",
          })

        console.log(err)

        setInput((p) => ({ ...p, valid: false }))
      }
    }

    const timeOut = setTimeout(() => {
      if (input.mail.length > 3) {
        setInput((p) => ({ ...p, valid: false }))
        setMessage({ success: true, text: "Loading..." })
        getUser()
      } else {
        setInput((p) => ({ ...p, valid: false }))
        setMessage({ success: false, text: "" })
      }
    }, 500)

    return () => {
      controller.abort()
      clearTimeout(timeOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.mail])

  return (
    <div className="mb-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={input.mail}
        onChange={(e) => setInput((p) => ({ ...p, mail: e.target.value }))}
        required
        className="input-bar"
      />
      <p
        className={`${message.success ? "text-green-500" : "text-red-500"} text-xs leading-3.5 mt-1 ml-1`}>
        {message.text}
      </p>
    </div>
  )
}
