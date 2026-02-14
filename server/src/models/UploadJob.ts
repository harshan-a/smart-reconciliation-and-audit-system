import mongoose from "mongoose"

export interface IUploadJob extends mongoose.Document {
  fileName: string
  fileHash: string
  status: "Processing" | "Completed" | "Failed"
  totalRecords: number
  createdBy: mongoose.Types.ObjectId
}

const uploadJobsSchema = new mongoose.Schema<IUploadJob>(
  {
    fileName: {
      required: true,
      type: String,
      trim: true,
    },
    fileHash: {
      required: true,
      type: String,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Processing", "Completed", "Failed"],
        message: "{VALUE} is not valid status.",
      },
      default: "Processing",
      index: true,
    },
    totalRecords: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IUploadJob>("UploadJobs", uploadJobsSchema)
