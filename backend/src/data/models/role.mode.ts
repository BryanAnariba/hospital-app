import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      trim: true,
      uppercase: true,
    },
    description: {
        type: String,
        required: [true, "Role description is required"],
        trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const roleModel = mongoose.model("Role", roleSchema);
