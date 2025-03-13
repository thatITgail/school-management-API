const express = require("express");
const router = express.Router();

const School = require("../models/school.model")
const Class = require("../models/class.model");

router.post('/classes', async (req, res) => {
  try{
    const newClass = await Class.create(req.body);
    res.status(200).json(newClass);
  }catch (error){
    res.status(500).json({message: error.message})
  }
});


router.get('/classes/:id', async(req, res) => {
  try{
   const classes = await Class.find({school: req.params.id}).populate("school", "name").populate("students");
   res.status(200).json(classes);
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

router.delete('/classes/:id', async(req, res) => {
  try{
     const {id} = req.params;
    const classes = await Class.findByIdAndDelete(id);
    if(!classes){
     res.status(404).json({message: "Class not found"})
    }
 
    res.status(200).json({message: "Class details deleted successfully"});
   }catch(error){
     res.status(500).json({message: error.message})
   }
});

module.exports = router;