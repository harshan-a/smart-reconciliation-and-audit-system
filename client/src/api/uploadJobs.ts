import api from "./authAxios"

export function getUploadJobs({ select = "" }: { select?: string }) {
  return api.get("/uploads?fields=" + select)
}
export function getUploadJob(jobId: string) {
  return api.get("/uploads/" + jobId)
}

export function createJob(formData: FormData) {
  return api.post("/uploads", formData)
}
