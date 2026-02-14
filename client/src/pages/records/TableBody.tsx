import type { Dispatch, SetStateAction } from "react"
import { useAuth } from "../../context/AuthContext"
import type { RecordData } from "../../types"

type TableBody = {
  loading: boolean
  records: RecordData[]
  setSelectedAudit: Dispatch<SetStateAction<string | null>>
  setSelectedEdit: Dispatch<SetStateAction<RecordData | null>>
}

export default function TableBody({
  loading,
  records,
  setSelectedAudit,
  setSelectedEdit,
}: TableBody) {
  const { user } = useAuth()
  return (
    <tbody>
      {loading ? (
        <tr>
          <td className="p-6 text-gray-400" colSpan={4}>
            Loading...
          </td>
        </tr>
      ) : (
        records.map((record) => {
          // console.log(record)
          return (
            <tr
              key={record._id}
              className="border-t border-gray-800 hover:bg-gray-800 transition">
              <td className="p-4">{record.transactionId}</td>
              <td className="p-4">{record.amount}</td>
              <td className="p-3">{record.referenceNumber}</td>
              <td className="p-4 text-cyan-400">
                <span
                  className={
                    record.status === "Matched"
                      ? "text-green-600"
                      : record.status === "Partial"
                        ? "text-yellow-600"
                        : record.status === "Duplicate"
                          ? "text-purple-600"
                          : "text-red-600"
                  }>
                  {record.status}
                </span>
              </td>

              <td className="p-4 space-x-4">
                <button
                  onClick={() => setSelectedAudit(record._id)}
                  className="text-gray-400 hover:text-cyan-400">
                  Audit
                </button>
                {(user?.role === "admin" || user?.role === "analyst") && (
                  <button
                    onClick={() => setSelectedEdit(record)}
                    className="text-cyan-400 hover:underline">
                    Edit
                  </button>
                )}
              </td>
            </tr>
          )
        })
      )}
    </tbody>
  )
}
