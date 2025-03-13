const express = require("express");
const router = express.Router();

const Teacher = require("../models/teacher.model")

router.post('/teachers', async (req, res) => {
  try{
    const newTeacher = await Teacher.create(req.body)
    res.status(200).json(newTeacher)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});


router.get('/teachers/:id', async(req, res) => {
  try{
   const { id } = req.params;
   const teacher = await Teacher.findById(id).populate("classes", "name").populate("school", "name");
   if(!teacher){
    return res.status(400).json({message: "Teacher not found"});
  }
  res.status(200).json(teacher)
  }catch(error){
    res.status(500).json({message: error.message})
  }
})


module.exports = router;