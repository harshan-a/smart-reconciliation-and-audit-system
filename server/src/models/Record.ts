import mongoose, { Schema, Document } from "mongoose"

export interface IRecord extends Document {
  transactionId: string
  amount: number
  referenceNumber: string
  date: Date
  uploadJobId: mongoose.Types.ObjectId
  status: "Matched" | "Partial" | "Duplicate" | "Unmatched"
  createdBy: "FILE" | "SYSTEM"
}

const recordSchema = new Schema<IRecord>(
  {
    transactionId: {
      type: String,
      index: true,
      required: true,
    },
    amount: Number,
    referenceNumber: {
      type: String,
      index: true,
      required: true,
    },
    date: Date,
    uploadJobId: {
      type: Schema.Types.ObjectId,
      ref: "UploadJob",
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Matched", "Partial", "Duplicate", "Unmatched"],
      },
      index: true,
    },
    createdBy: {
      type: String,
      enum: {
        values: ["FILE", "SYSTEM"],
      },
      required: true,
    },
  },
  { timestamps: true },
)

recordSchema.index({ createdAt: -1 })

// Compound index for fast reconciliation
// first tranIds sorted then there are multiple same id so it sorted by amount
// recordSchema.index({ transactionId: 1, amount: 1 })

export default mongoose.model<IRecord>("Record", recordSchema)
