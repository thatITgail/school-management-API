/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - class
 *         - school
 *       properties:
 *         id:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: An auto-generated Id of a class
 *         name:
 *           type: string
 *           example: Eze Michelle
 *           description: Student's name
 *         age:
 *           type: number
 *           example: 12
 *           description: The student's age
 *         class:
 *           type: string
 *           example: 67d11e4bf9050e52315933d6
 *           description: The class ID of the student
 *         school:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: The school ID to which the class belongs
 *       example:
 *         id: 67ce6b0c1d4372b948912eaf
 *         age: 12
 *         name: Eze Michelle
 *         class: 67d11e4bf9050e52315933d6
 *         school: 67ce6b0c1d4372b948912cb8
 */

const express = require("express");
const router = express.Router();

const School = require("../models/school.model")
const Class = require("../models/class.model")
const Student = require("../models/student.model")


/**
 * @swagger
 * tags:
 *  name: Student
 *  description: The Student API
 */

/**
 * @swagger
 * /api/students:
 *  post:
 *    tags: [Student]
 *    summary: Add a new student to a class
 *    requestBody:
 *      description: Create a new student portfolio and add to a class
 *      content:
 *        application/json:  
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *      required: true
 *    responses:
 *      200:
 *        description: Student portfolio created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      500: 
 *        description: Internal Server Error
 *      
 */

router.post('/students', async (req, res) => {
  try{
    const newStudent = await Student.create(req.body);
    const addStudentClass = await Class.findById(req.body.class);
    if(addStudentClass){
      addStudentClass.students.push(newStudent);
      await addStudentClass.save()
    }else{
      res.status(404).json({message: "Class not found"})
    }
    res.status(200).json(newStudent)

  }catch(error){
    res.status(500).json({message: error.message})
  }
});


/**
 * @swagger
 * /api/class/{id}/students:
 *   get:
 *     tags: [Student]
 *     summary: Get all students in a class
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The class Id 
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: All students in a class
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       404:
 *         description: No student found
 *       500:
 *         description: Internal server error
 * 
 */
// fetch students in a particular class
router.get('/class/:id/students', async (req, res) => {
  try{
    const students = await Student.find({class: req.params.id});
    if(students.length === 0){
      return res.status(404).json({message: "No student found in class"})
    }
    res.status(200).json(students)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});


/**
 * @swagger
 * /api/{id}/students:
 *   get:
 *     tags: [Student]
 *     summary: Get all students in a school
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The school Id 
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: All students in a school
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       404:
 *         description: No student found
 *       500:
 *         description: Internal server error
 * 
 */
// fetch students in a particular school
router.get('/:id/students/', async (req, res) => {
  try{
    // const {schoolId} = req.params.id;
    const students = await Student.find({school: req.params.id}).populate('class')
    //console.log(`Fetching students for school: ${req.params.id}`)
    if(students.length === 0 ){
      return res.status(404).json({message: "No student found in school"})
    }
    //console.log(students)
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