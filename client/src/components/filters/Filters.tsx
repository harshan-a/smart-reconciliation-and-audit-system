import { useState, type Dispatch, type SetStateAction } from "react"
import DateFilter from "./DateFilter"
import UsersFilter from "./UsersFilter"
import JobsFilter from "./JobsFilter"
import type { RecordStatus } from "../../types"
import RecordStatusFilter from "./RecordStatusFilter"

type FiltersProps = {
  needDate?: boolean
  needUploadBy?: boolean
  needUploadJobId?: boolean
  needRecordStatus?: boolean
  setFilters: Dispatch<SetStateAction<string>>
}

export default function Filters({
  needDate,
  needUploadBy,
  needUploadJobId,
  needRecordStatus,
  setFilters,
}: FiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [uploadBy, setUploadby] = useState("")
  const [jobBy, setJobBy] = useState("")
  const [recordStatus, setRecordStatus] = useState<RecordStatus>("Matched")
  // console.log(uploadBy)
  // console.log(jobBy)

  function handleSetFilters() {
    let filterObj = {}
    if (needDate && (startDate || endDate)) {
      filterObj = { ...filterObj, startDate, endDate }
    }
    if (needUploadBy && uploadBy) {
      filterObj = { ...filterObj, uploadedBy: uploadBy }
    }
    if (needUploadJobId && jobBy) {
      filterObj = { ...filterObj, uploadJobid: jobBy }
    }
    if (needRecordStatus && recordStatus) {
      filterObj = { ...filterObj, status: recordStatus }
    }
    console.log(new URLSearchParams(filterObj).toString())
    setFilters(new URLSearchParams(filterObj).toString())
    setShowFilters(false)
  }

  return (
    <div className="select-none mb-4">
      <p
        className="cursor-pointer hover:text-cyan-400 active:text-inherit w-fit"
        onClick={() => setShowFilters((p) => !p)}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </p>
      <div
        className={`flex flex-col gap-y-4 mt-2 h-0 overflow-hidden transition-all ${showFilters && "h-fit"}`}>
        {needDate && (
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        )}
        {needUploadBy && (
          <UsersFilter uploadBy={uploadBy} setUploadby={setUploadby} />
        )}
        {needUploadJobId && <JobsFilter jobBy={jobBy} setJobBy={setJobBy} />}
        {needRecordStatus && (
          <RecordStatusFilter
            recordStatus={recordStatus}
            setRecordStatus={setRecordStatus}
          />
        )}
        <div>
          <button
            onClick={handleSetFilters}
            className="ml-1 mb-1 self-start border border-cyan-400 rounded py-1 px-2 hover:ring-2 ring-cyan-400 active:ring-0 transition-all">
            Set filters
          </button>
          <button
            onClick={() => {
              setFilters("")
              setShowFilters(false)
            }}
            className="ml-1 mb-1 self-start border border-cyan-400 rounded py-1 px-2 hover:ring-2 ring-cyan-400 active:ring-0 transition-all">
            Reset filters
          </button>
        </div>
      </div>
    </div>
  )
}
