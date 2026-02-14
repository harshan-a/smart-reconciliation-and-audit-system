export type Role = "admin" | "analyst" | "viewer"
type RecordStatus = "Matched" | "Partial" | "Duplicate" | "Unmatched"

export type User = {
  id: string
  name?: string
  email?: string
  role: Role
  isActive: boolean
}
export type RecordData = {
  _id: string
  transactionId: string
  amount: number
  referenceNumber: string
  data: Date
  uploadJobId: string
  status: RecordStatus
  createdBy: "FILE" | "SYSTEM"
}

export type AuditLogData = {
  _id: string
  oldValue: any
  newValue: any
  userId: {
    name: string
    role: string
  }
  createdAt: string
}

export type AxiosAuthResponse = {
  data: {
    token: string
    success: boolean
    user: User
    msg: string
  }
}

export type AxiosUserResponse = {
  data: {
    success: boolean
    user: User
    msg: string
  }
}

export type AxiosOTPResponse = {
  data: {
    success: boolean
    msg: string
  }
}
