const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, "Please write your name"]
    },
    age:{
      type: Number,
      required: [true, "Input your age"]
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true
    }, 
    school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;