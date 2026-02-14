import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/mongodb.js"

import app from "./app.js"

const port = process.env.PORT || 5000

if (process.env.MONGO_CONNECTION_URL) {
  await connectDB(process.env.MONGO_CONNECTION_URL)
  console.log("Connect to database")
  app.listen(port, () =>
    console.log("Server is running on port " + port + "..."),
  )
} else console.log("Database url is undefined")
