import type { Dispatch, SetStateAction } from "react"

type LimitFilterProps = {
  limit: number
  setLimit: Dispatch<SetStateAction<number>>
}

export default function LimitFilter({ limit, setLimit }: LimitFilterProps) {
  return (
    <div>
      <label htmlFor="record-status">Limit: </label>
      <select
        name="record-status"
        id="record-status"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="text-[14px] py-1 p-1.5 border border-gray-300 rounded transition-all focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-400 *:text-black">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  )
}
