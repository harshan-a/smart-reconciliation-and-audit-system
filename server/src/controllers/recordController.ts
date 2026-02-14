import type { Request, Response } from "express"
import Record from "../models/Record.js"
import AuditLog from "../models/AuditLog.js"
import { NotFound } from "../errors/index.js"

export const getRecords = async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "10",
    status,
    uploadJobId,
    startDate,
    endDate,
  } = req.query

  const pageNumber = parseInt(page as string)
  const limitNumber = parseInt(limit as string)

  const skip = (pageNumber - 1) * limitNumber

  const filter: any = { createdBy: "FILE" }

  if (status) {
    filter.status = status
  }

  if (uploadJobId) {
    filter.uploadJobId = uploadJobId
  }

  if (startDate && endDate)
    filter.createdAt = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string),
    }
  else if (startDate)
    filter.createdAt = {
      $gte: new Date(startDate as string),
    }
  else if (endDate)
    filter.createdAt = {
      $lte: new Date(endDate as string),
    }

  const totalRecords = await Record.countDocuments(filter)

  const records = await Record.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber)
  console.log(filter)

  res.status(200).json({
    nbHits: records.length,
    page: pageNumber,
    limit: limitNumber,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limitNumber),
    data: records,
  })
}

export const updateRecord = async (req: Request, res: Response) => {
  let record = await Record.findById(req.params.id)
  if (!record) throw new NotFound("Record Not found")

  const oldValue = { ...record.toObject() }
  Object.assign(record, req.body)
  record = await record.save()

  await AuditLog.create({
    recordId: record._id,
    oldValue,
    newValue: record.toObject(),
    userId: req.user?.userId,
  })

  res
    .status(200)
    .json({ success: true, data: record, msg: "Record updated successfully." })
}
