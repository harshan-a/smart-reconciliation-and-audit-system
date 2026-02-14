import mongoose, { Schema, Document } from "mongoose"

export interface IAuditLog extends Document {
  recordId: mongoose.Types.ObjectId
  oldValue: any
  newValue: any
  userId: mongoose.Types.ObjectId
}

const auditSchema = new Schema<IAuditLog>(
  {
    recordId: { type: Schema.Types.ObjectId, ref: "Record" },
    oldValue: Schema.Types.Mixed,
    newValue: Schema.Types.Mixed,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
)

export default mongoose.model<IAuditLog>("AuditLog", auditSchema)
