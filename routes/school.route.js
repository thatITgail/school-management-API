const express = require("express");
const router = express.Router();

const School = require("../models/school.model")

router.post('/schools', async(req, res) => {
  try{
    const school = await School.create(req.body);
    res.status(200).json(school)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

router.get('/schools', async (req, res) => {
  try{
    const schools = await School.find({});
    res.status(200).json(schools)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

router.get('/schools/:id', async (req, res) => {
  try{
     const { id } = req.params;
     const school =  await School.findById(id);
     res.status(200).json(school)
  }catch(error){
    res.status(500).json({message: error.message});
  }
});

router.put('/schools/:id', async(req, res) => {
  try{
    const {id} = req.params;
   const school = await School.findByIdAndUpdate(id, req.body);
   if(!school){
    res.status(404).json({message: "School does not exist"})
   }
   const updatedSchool = await School.findById(id);
   res.status(200).json(updatedSchool);
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

module.exports = router;
