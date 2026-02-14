import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { InternalServer } from "../errors/index.js"

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
      maxLength: [20, "Maximum 20 characters is allowed."],
      minLength: [3, "Minimum 3 characters is required."],
    },
    email: {
      require: [true, "Email is required"],
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "analyst", "viewer"],
        message: "{VALUE} is not valid role.",
      },
      default: "Viewer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    methods: {
      comparePassword(password: string) {
        return bcrypt.compare(password, this.password)
      },
      generateAccessToken() {
        if (process.env.ACCESS_TOKEN_PRIVATE_KEY) {
          return jwt.sign(
            {
              userId: this._id,
              role: this.role,
              isActive: this.isActive,
            },
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
          )
        } else
          throw new InternalServer("Private key not found for signing the jwt")
      },
    },
  },
)

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
})

export default mongoose.model("User", userSchema)
