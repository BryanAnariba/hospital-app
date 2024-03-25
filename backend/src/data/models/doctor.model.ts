import mongoose, { Schema } from "mongoose";

const doctorSchema = new mongoose.Schema(
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
    img: {
        type: String,
        default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: [true, 'Hospital is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const doctorModel = mongoose.model('Doctor', doctorSchema);