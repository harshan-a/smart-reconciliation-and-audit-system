import express from "express"
import { upload } from "../middlewares/uploadMiddleware.js"
import {
  uploadFile,
  getUploadJob,
  getUploadJobs,
} from "../controllers/uploadController.js"
import { protect } from "../middlewares/authMiddleware.js"
import { authorizeRoles } from "../middlewares/roleMiddleware.js"

const router = express.Router()

router
  .route("/")
  .all(protect)
  .get(authorizeRoles("admin", "analyst", "viewer"), getUploadJobs)
  .post(authorizeRoles("admin", "analyst"), upload.single("file"), uploadFile)

router.get("/:id", protect, authorizeRoles("admin", "analyst"), getUploadJob)

export default router
