import mongoose, { Schema } from "mongoose";

const hospitalSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
    versionKey: false,
    //collection: 'Hospitales' // in spanish
  },
);

export const hospitalModel = mongoose.model('Hospital', hospitalSchema);
