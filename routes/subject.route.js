const express = require("express");
const router = express.Router();

const Subject = require("../models/subject.model");
const Class = require("../models/class.model");
const Teacher = require("../models/teacher.model")

router.post('/subjects', async (req, res) => {
  try{
    const subjects = req.body;
    const existingSubject = await Subject.findOne({name: subjects.name, class: subjects.class});
    if(existingSubject){
      return res.status(400).json({message: "Subject already exists"})
    }else{
       const newSubject = await Subject.create(req.body);
       res.status(200).json(newSubject)
    }
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

module.exports = router;