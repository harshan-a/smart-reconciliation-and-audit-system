import { createContext, type Dispatch, type SetStateAction } from "react"

export const SetIsLoading = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {},
)
