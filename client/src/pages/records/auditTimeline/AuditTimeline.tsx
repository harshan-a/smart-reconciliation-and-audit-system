import { useEffect, useState } from "react"
import api from "../../../api/authAxios"
import type { AuditLogData } from "../../../types"
import AuditLogs from "./AuditLogs"

type AuditTimelineProps = {
  recordId: string
  onClose: () => void
}

export default function AuditTimeline({
  recordId,
  onClose,
}: AuditTimelineProps) {
  const [logs, setLogs] = useState<AuditLogData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get(`/audit/${recordId}`)
        setLogs(res.data.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }

    fetchLogs()
  }, [recordId])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-50">
      <div className="w-125 bg-gray-950 border-l border-gray-800 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-cyan-400">Audit Timeline</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading audit logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-500">No audit history available.</p>
        ) : (
          <AuditLogs logs={logs} />
        )}
      </div>
    </div>
  )
}
