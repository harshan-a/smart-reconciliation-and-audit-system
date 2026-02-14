import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

import data from "./system_seed_large.json" with { type: "json" }

await mongoose.connect(process.env.MONGO_CONNECTION_URL)
console.log("Connected to db")

const db = mongoose.connection
await db.collection("uploadjobs").deleteMany({})
console.log("Upload jobs deleted.")
await db.collection("records").deleteMany({})
console.log("Records deleted.")
await db.collection("auditlogs").deleteMany({})
console.log("Audit logs deleted.")

await db.collection("records").insertMany(data)
console.log("System records seeded")
process.exit()
