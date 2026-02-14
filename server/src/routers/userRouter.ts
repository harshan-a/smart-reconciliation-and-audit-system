import express from "express"
import { checkEmailExists, getUsers } from "../controllers/userController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/check", checkEmailExists)

router.get("/", protect, getUsers)

export default router
