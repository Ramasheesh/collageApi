const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  fatherName: {
    type: String,
    default: "",
  },
  motherName: {
    type: String,
    default: "",
  },
  fullAddress: {
    type: String,
    default: "",
  },
  age: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  class: {
    type: String,
    // required: true,
  },
  enrolledDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Assuming you have a Course model
    },
  ],
});

const user = mongoose.model("user", userSchema);

module.exports = user;
