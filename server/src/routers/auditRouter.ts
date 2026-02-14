import express from "express"
import { getAuditLogsByRecord } from "../controllers/auditController.js"
import { protect } from "../middlewares/authMiddleware.js"
import { authorizeRoles } from "../middlewares/roleMiddleware.js"

const router = express.Router()

router.get(
  "/:recordId",
  protect,
  authorizeRoles("admin", "analyst", "viewer"),
  getAuditLogsByRecord,
)

export default router
