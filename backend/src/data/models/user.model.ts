import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
        default: '',
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: 'Role',
      required: [true, 'Role is required'],
    },
    google: {
        type: Boolean,
        default: false,
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

export const userModel = mongoose.model('User', userSchema);
