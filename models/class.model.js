 
const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the class you are in"]
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },
    students:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }],
    subjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    }], 
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    }
  }, 
  {
    timestamps: true
  }
);

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;