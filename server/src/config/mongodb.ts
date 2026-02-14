import mongoose from "mongoose"

export default (url: string) => mongoose.connect(url)
