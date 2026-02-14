import { useState } from "react"
import api from "../../../api/authAxios"
import Input from "./Input"
import type { RecordData } from "../../../types"

interface Props {
  record: RecordData
  onClose: () => void
  onSuccess: () => void
}

export default function EditRecordDrawer({
  record,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    transactionId: record.transactionId,
    amount: record.amount,
    referenceNumber: record.referenceNumber,
    status: record.status,
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      await api.patch(`/records/${record._id}`, form)
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-50">
      <div className="w-125 bg-gray-950 border-l border-gray-800 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-cyan-400">Edit Record</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <Input
            label="Transaction ID"
            value={form.transactionId}
            onChange={(value: string) =>
              setForm({ ...form, transactionId: value })
            }
          />

          <Input
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(value: string) =>
              setForm({ ...form, amount: Number(value) })
            }
          />

          <Input
            label="Reference Number"
            value={form.referenceNumber}
            onChange={(value: string) =>
              setForm({ ...form, referenceNumber: value })
            }
          />

          <div>
            <label className="text-gray-400 text-sm">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as
                    | "Matched"
                    | "Partial"
                    | "Duplicate"
                    | "Unmatched",
                })
              }
              className="w-full mt-2 bg-gray-900 border border-gray-700 rounded p-2 text-white">
              <option value="Matched">Matched</option>
              <option value="Partial">Partial</option>
              <option value="Unmatched">Unmatched</option>
              <option value="Duplicate">Duplicate</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black py-2 rounded font-semibold transition">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
