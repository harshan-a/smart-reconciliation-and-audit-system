import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { createJob, getUploadJob } from "../../api/uploadJobs"

export default function Upload() {
  const { user } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [processingJob, setProcessingJob] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  if (user?.role === "viewer") {
    return (
      <div className="text-red-400 text-lg">
        Access Denied — Viewer cannot upload.
      </div>
    )
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)
    try {
      const {
        data: { data: uploadedJob },
      } = await createJob(formData)
      if (
        !(uploadedJob.status === "Completed" || uploadedJob.status === "Failed")
      ) {
        const interval = setInterval(async () => {
          try {
            const {
              data: { data: job },
            } = await getUploadJob(uploadedJob._id)
            setProcessingJob(job)

            if (job.status === "Completed" || job.status === "Failed") {
              clearInterval(interval)
            }
          } catch (err) {
            clearInterval(interval)
          }
        }, 2000)
      } else setProcessingJob(uploadedJob)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Upload Transactions
      </h1>

      <div
        className={`bg-gray-900 border border-gray-800 p-8 rounded-xl max-w-lg`}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-6 text-gray-300 cursor-pointer"
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded font-semibold transition ${!file && "pointer-events-none opacity-60"}`}>
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>

      {processingJob && (
        <div className="mt-6 bg-gray-900 border border-gray-800 p-6 rounded-xl max-w-lg">
          <p>
            File name:{" "}
            <span className="text-cyan-400">{processingJob.fileName}</span>
          </p>
          <p>
            Uploaded by:{" "}
            <span className="text-cyan-400">
              {processingJob.createdBy.name} ({processingJob.createdBy.role})
            </span>
          </p>
          <p>
            Status:{" "}
            <span className="text-cyan-400">{processingJob.status}</span>
          </p>
          {processingJob.status === "Processing" ? (
            <div className="mt-1 w-full h-1 bg-cyan-400 rounded"></div>
          ) : (
            <p>Total Records: {processingJob.totalRecords}</p>
          )}
        </div>
      )}
    </div>
  )
}
