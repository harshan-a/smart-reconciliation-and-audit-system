import type { Dispatch, SetStateAction } from "react"

type DateFilterProps = {
  startDate: string
  endDate: string
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
}

export default function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DateFilterProps) {
  return (
    <div className="flex items-center gap-x-4">
      <label htmlFor="date">Date: </label>
      <div id="date" className="flex items-center gap-x-4">
        <div>
          <label htmlFor="start-date">Start </label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-[14px] py-1 p-1.5 border border-gray-300 rounded transition-all focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-400"
          />
        </div>
        <div>
          <label htmlFor="end-date">End </label>
          <input
            type="date"
            name="end-date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-[14px] py-1 p-1.5 border border-gray-300 rounded transition-all focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>
    </div>
  )
}
