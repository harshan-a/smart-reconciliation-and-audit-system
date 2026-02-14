import fs from "fs"
import csv from "csv-parser"
import type { Request, Response } from "express"
import UploadJob from "../models/UploadJob.js"
import Record from "../models/Record.js"

import { generateFileHash } from "../utils/hashFile.js"
import { runReconciliation } from "../services/reconciliationService.js"
import { BadRequest, NotFound } from "../errors/index.js"

const processFileAsync = async (filePath: string, jobId: string) => {
  const records: any[] = []
  // console.log(filePath)

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      // console.log(row)
      records.push({
        transactionId: row.transactionId,
        amount: Number(row.amount),
        referenceNumber: row.referenceNumber,
        date: new Date(row.date),
        uploadJobId: jobId,
        createdBy: "FILE",
      })
    })
    .on("end", async () => {
      await Record.insertMany(records)
      await runReconciliation(jobId)
      await UploadJob.findByIdAndUpdate(jobId, {
        status: "Completed",
        totalRecords: records.length,
      })
    })
    .on("error", async (err) => {
      console.log("file processing failed: " + err)
      await UploadJob.findByIdAndUpdate(jobId, {
        status: "Failed",
      })
    })
}

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) throw new BadRequest("File is required")

  // console.log(req.file)

  const filePath = req.file.path
  const fileHash = generateFileHash(filePath)

  const existingJob = await UploadJob.findOne({ fileHash }).populate(
    "createdBy",
    "name role",
  )
  if (existingJob) {
    // console.log("Existing:", existingJob)
    return res.status(200).json({
      success: true,
      msg: "Job already exists.",
      data: existingJob,
    })
  }

  const job = await UploadJob.create({
    fileName: req.file?.originalname,
    fileHash,
    createdBy: req.user?.userId,
  })

  processFileAsync(filePath, String(job._id))

  res.status(200).json({ success: true, msg: "Processing started", data: job })
}

export const getUploadJob = async (req: Request, res: Response) => {
  const jobId = req.params.id

  const job = await UploadJob.findById(jobId).populate("createdBy", "name role")
  if (!job) throw new NotFound("Upload job not found")

  res.status(200).json({ success: true, msg: "job founded.", data: job })
}

export const getUploadJobs = async (req: Request, res: Response) => {
  const { status, uploadedBy, fields } = req.query

  const filter: any = {}

  if (status) {
    filter.status = status
  }

  if (uploadedBy) {
    filter.createdBy = uploadedBy
  }

  let selectString = ""
  if (fields) selectString = (fields as string).split(",").join(" ")

  const jobs = await UploadJob.find(filter)
    .populate("createdBy", "name role")
    .sort({ createdAt: -1 })
    .select(selectString)

  res.status(200).json({ success: true, msg: "Jobs found.", data: jobs })
}
