import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    course: {
      type: String,
    },
    section: {
      type: String,
    },
    year: {
      type: Number,
    },
    semester: {
      type: Number,
    },
    rollno: {
      type: Number,
    },
    dob: {
      type: Date,
    },
    phone: {
      type: Number,
      unique: true,
    },
    role: {
      type: String,
    },
    password: {
      type: String,
    },
    class: {
      type: [String],
      default: [],
    },
    branch: {
      type: String,
    },
    subject: {
      type: [String],
      default: [],
    },
    img: {
      type: String,
    },
    study: [
      {
        class: String,
        subject: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
