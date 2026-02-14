import type { AuditLogData } from "../../../types"
import ChangedField from "./ChangedField"

type AuditLogProps = {
  log: AuditLogData
}

export default function AuditLog({ log }: AuditLogProps) {
  return (
    <div className="relative">
      <div className="absolute -left-2.25 top-2 w-4 h-4 bg-cyan-500 rounded-full" />

      <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
        <p className="text-sm text-gray-400">
          {log.userId?.name} ({log.userId?.role})
        </p>

        <p className="text-xs text-gray-500 mb-4">
          {new Date(log.createdAt).toLocaleString()}
        </p>

        <div className="space-y-4">
          {Object.keys(log.newValue).map((field, i) => {
            const oldVal = log.oldValue?.[field]
            const newVal = log.newValue?.[field]

            if (oldVal === newVal) return null

            return (
              <ChangedField
                field={field}
                oldValue={oldVal}
                newValue={newVal}
                key={i}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
