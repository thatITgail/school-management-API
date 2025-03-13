const express = require("express");
const router = express.Router();

const School = require("../models/school.model")
const Class = require("../models/class.model")
const Student = require("../models/student.model")

router.post('/students', async (req, res) => {
  try{
    const newStudent = await Student.create(req.body);
    res.status(200).json(newStudent)

  }catch(error){
    res.status(500).json({message: error.message})
  }
});

// fetch students in a particular class
router.get('/students/:id', async (req, res) => {
  try{
    const students = await Student.find({class: req.params.id}).populate("class", "name");
    res.status(200).json(students)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

// fetch students in a particular school
router.get('/:id/students/', async (req, res) => {
  try{
    const {schoolId} = req.params.id;
    const classes = await Class.find({school: schoolId}).populate('students')
    if(!classes || classes.length === 0 ){
      return res.status(404).json({message: "No class found in school"})
    }
    let students = [];
    classes.forEach((classEl) => {
      students = [...students, ...classEl.students]
    })
   
    
     res.status(200).json(students)
    
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

// Delete a student profile
router.delete('/students/:id', async(req, res) => {
  try{
     const {id} = req.params;
    const student = await Student.findByIdAndDelete(id);
    if(!student){
     res.status(404).json({message: "Student not found"})
    }
 
    res.status(200).json({message: "Student details deleted successfully"});
   }catch(error){
     res.status(500).json({message: error.message})
   }
});

module.exports = router;