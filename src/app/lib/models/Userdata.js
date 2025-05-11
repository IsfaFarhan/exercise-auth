import mongoose from "mongoose";

const UserdataSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Userdetail ||
  mongoose.model("Userdetail", UserdataSchema);
