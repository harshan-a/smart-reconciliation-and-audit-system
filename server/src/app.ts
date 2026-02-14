import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"

// routes
import {
  userRouter,
  authRouter,
  otpRouter,
  uploadRouter,
  auditRouter,
  dashboardRouter,
  recordRouter,
} from "./routers/index.js"

import notFound from "./middlewares/notFound.js"
import errorHandling from "./middlewares/errorHandling.js"

const app = express()

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
)

app.use(express.json({ limit: "10kb" })) // body parser (data limited to 10kb)
// app.use(express.urlencoded({ limit: "10kb" })) // form data parser (data limited to 10kb)
app.use(cookieParser())

app.use(morgan("dev"))

// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/otp", otpRouter)
app.use("/api/v1/uploads", uploadRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/records", recordRouter)
app.use("/api/v1/audit", auditRouter)

// app.get("/api/v1/user", (req, res) => {
//   res.sendStatus(200)
// })

// not found and errorhandling middlerware
app.use(notFound)
app.use(errorHandling)

export default app
