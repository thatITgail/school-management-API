const mongoose = require("mongoose");

const SchoolSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, "Please enter the name of your school"]
    },
    location:{
      type: String,
      required: [true, "Please enter the location of your school"]
    },
    dateCreated: {
      type: Date,
      required:[true, "Please enter the registration date"],
      default: Date.now
    },
    admin: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const School = mongoose.model("School", SchoolSchema);

module.exports = School;