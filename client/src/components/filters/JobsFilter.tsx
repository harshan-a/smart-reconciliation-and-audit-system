import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { getUploadJobs } from "../../api/uploadJobs"
import type { Role } from "../../types"

type UploadJobs = {
  _id: string
  createdBy: {
    name: string
    email: string
    role: Role
  }
  fileName: string
}
type JobsFilterrProps = {
  jobBy: string
  setJobBy: Dispatch<SetStateAction<string>>
}
export default function JobsFilter({ jobBy, setJobBy }: JobsFilterrProps) {
  const [jobs, setJobs] = useState<UploadJobs[]>()

  useEffect(() => {
    const fetchJobs = async function () {
      const { data }: { data: { data: UploadJobs[] } } = await getUploadJobs({
        select: "fileName",
      })
      setJobs(data.data)
    }
    fetchJobs()
  }, [])

  return (
    <div>
      <label htmlFor="jobs">Jobs(file) By: </label>
      <select
        name="jobs"
        id="jobs"
        value={jobBy}
        onChange={(e) => setJobBy(e.target.value)}
        className="text-[14px] py-1 p-1.5 border border-gray-300 rounded transition-all focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-400">
        {jobs
          ? jobs.map((job, i) => {
              return (
                <option value={job._id} className="text-black" key={i}>
                  {job.fileName} ({job.createdBy.name}){" "}
                </option>
              )
            })
          : "no jobs"}
      </select>
    </div>
  )
}
