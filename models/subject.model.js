const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the subject name"]
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School"
    }, 
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    }
  }, 
  {
    timestamps: true
  }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;