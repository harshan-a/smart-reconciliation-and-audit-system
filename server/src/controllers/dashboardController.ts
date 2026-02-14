import type { Request, Response } from "express"
import Record from "../models/Record.js"
import UploadJob from "../models/UploadJob.js"
import mongoose from "mongoose"

export const getDashboardStats = async (req: Request, res: Response) => {
  const { startDate, endDate, uploadedBy } = req.query

  const matchStage: any = { createdBy: "FILE" }

  if (uploadedBy) {
    const jobs = await UploadJob.find({
      createdBy: new mongoose.Types.ObjectId(uploadedBy as string),
    }).select("_id")

    matchStage.uploadJobId = { $in: jobs.map((j) => j._id) }
  }

  if (startDate && endDate)
    matchStage.createdAt = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string),
    }
  else if (startDate)
    matchStage.createdAt = {
      $gte: new Date(startDate as string),
    }
  else if (endDate)
    matchStage.createdAt = {
      $lte: new Date(endDate as string),
    }

  const stats = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ])

  let total = 0
  let matched = 0
  let partial = 0
  let unmatched = 0
  let duplicate = 0

  stats.forEach((item) => {
    total += item.count

    if (item._id === "Matched") matched = item.count
    if (item._id === "Partial") partial = item.count
    if (item._id === "Unmatched") unmatched = item.count
    if (item._id === "Duplicate") duplicate = item.count
  })

  const accuracy = total ? ((matched / total) * 100).toFixed(2) : "0"

  res.status(200).json({
    total,
    matched,
    partial,
    unmatched,
    duplicate,
    accuracy,
  })
}
