const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"]
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    class: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required: true
      }
    ]
  }, 
  {
    timestamps: true
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;