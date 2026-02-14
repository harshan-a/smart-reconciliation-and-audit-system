import type { Request, Response } from "express"
import AuditLog from "../models/AuditLog.js"

export const getAuditLogsByRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params

  const logs = await AuditLog.find({ recordId })
    .populate("userId", "name email role")
    .sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    msg: "Logs fetched successfully",
    data: logs,
  })
}
