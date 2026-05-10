import mongoose from "mongoose";
import ResultModel from "../models/Result.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: ["true", "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: ["true", "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: ["true", "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre("findOneAndDelete", async function () {
  const user = await this.model.findOne(this.getFilter());

  if (user) {
    await ResultModel.deleteMany({ userId: user._id });
  }
});

export default mongoose.model("User", userSchema);
