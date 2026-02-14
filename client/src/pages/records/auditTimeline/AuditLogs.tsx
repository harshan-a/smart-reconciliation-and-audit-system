import type { AuditLogData } from "../../../types"
import AuditLog from "./AuditLog"

type AuditLogProps = {
  logs: AuditLogData[]
}

export default function AuditLogs({ logs }: AuditLogProps) {
  return (
    <div className="space-y-8 relative border-l border-gray-700 pl-6">
      {logs.map((log) => (
        <AuditLog log={log} key={log._id} />
      ))}
    </div>
  )
}
