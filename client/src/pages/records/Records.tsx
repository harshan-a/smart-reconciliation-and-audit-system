import { useEffect, useState } from "react"
import api from "../../api/authAxios"
import AuditTimeline from "./auditTimeline/AuditTimeline"
import EditRecordDrawer from "./editRecordDrawer/EditRecordDrawer"
import TableBody from "./TableBody"
import type { RecordData } from "../../types"
import Filters from "../../components/filters/Filters"
import LimitFilter from "../../components/LimitFilter"

export default function Records() {
  const [records, setRecords] = useState<RecordData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null)
  const [selectedEdit, setSelectedEdit] = useState<RecordData | null>(null)

  const [filters, setFilters] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const fetchRecords = async () => {
    setLoading(true)
    try {
      const res = await api.get("/records?" + filters, {
        params: { page, limit },
      })
      setRecords(res.data.data)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRecords()
  }, [page, filters, limit])

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Reconciliation Records
      </h1>

      <Filters
        needDate={true}
        needRecordStatus={true}
        needUploadJobId={true}
        setFilters={setFilters}
      />
      <LimitFilter limit={limit} setLimit={setLimit} />

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mt-4">
        <table className="w-full">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-4 text-left">Transaction</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">referenceNumber</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <TableBody
            loading={loading}
            records={records}
            setSelectedAudit={setSelectedAudit}
            setSelectedEdit={setSelectedEdit}
          />
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          disabled={page <= 1 || totalPages >= page}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-800 rounded">
          Prev
        </button>

        <span className="text-gray-400">
          Page {page} of {totalPages} ({records.length})
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-800 rounded">
          Next
        </button>
      </div>
      {selectedAudit && (
        <AuditTimeline
          recordId={selectedAudit}
          onClose={() => setSelectedAudit(null)}
        />
      )}
      {selectedEdit && (
        <EditRecordDrawer
          record={selectedEdit}
          onClose={() => setSelectedEdit(null)}
          onSuccess={fetchRecords}
        />
      )}
    </div>
  )
}
