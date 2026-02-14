import type { Dispatch, SetStateAction } from "react"
import type { RecordStatus } from "../../types"

type RecordStatusFilterProps = {
  recordStatus: RecordStatus
  setRecordStatus: Dispatch<SetStateAction<RecordStatus>>
}

export default function RecordStatusFilter({
  recordStatus,
  setRecordStatus,
}: RecordStatusFilterProps) {
  return (
    <div>
      <label htmlFor="record-status">Record Status: </label>
      <select
        name="record-status"
        id="record-status"
        value={recordStatus}
        onChange={(e) => setRecordStatus(e.target.value as RecordStatus)}
        className="text-[14px] py-1 p-1.5 border border-gray-300 rounded transition-all focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-400 *:text-black">
        <option value="Matched">Matched</option>
        <option value="Partial">Partial</option>
        <option value="Duplicate">Duplicate</option>
        <option value="Unmatched">Unmatched</option>
      </select>
    </div>
  )
}
