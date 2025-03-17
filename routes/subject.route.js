/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - name
 *         - class
 *       properties:
 *         id:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: An auto-generated Id of a class
 *         name:
 *           type: string
 *           example: English Language
 *           description: Subject title
 *         class:
 *           type: string
 *           example: 67d11e4bf9050e52315933d6
 *           description: The class ID wher the subject isoffered
 *         school:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: The school ID to which the class belongs and the subject is taught
 *         teacher:
 *           type: string
 *           example: 67ce6b0c1d4372b94891eafe
 *           description: The teacher Id handling the subjects
 *           nullable: true
 *       example:
 *         id: 67ce6b0c1d4372b948912eaf
 *         name: English Language
 *         class: 67d11e4bf9050e52315933d6
 *         school: 67ce6b0c1d4372b948912cb8
 */

const express = require("express");
const router = express.Router();

const Subject = require("../models/subject.model");
const Class = require("../models/class.model");
const Teacher = require("../models/teacher.model")



/**
 * @swagger
 * tags:
 *  name: Student
 *  description: The Student API
 */

/**
 * @swagger
 * /api/subjects:
 *  post:
 *    tags: [Subject]
 *    summary: Add a new subject to a class
 *    requestBody:
 *      description: Create a new subject and add to a class
 *      content:
 *        application/json:  
 *          schema:
 *            $ref: '#/components/schemas/Subject'
 *      required: true
 *    responses:
 *      200:
 *        description: Subject created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subject'
 *      400:
 *        description: Subject already exist
 *      500: 
 *        description: Internal Server Error
 *      
 */
router.post('/subjects', async (req, res) => {
  try{
    const subjects= req.body;
    const existingSubject = await Subject.findOne({name: subjects.name, class: subjects.class});
    if(existingSubject){
      return res.status(400).json({message: "Subject already exists"})
    }
      const newSubject = await Subject.create(req.body)
      const addSubjectClass = await Class.findById(req.body.class);
      if(addSubjectClass){
        addSubjectClass.subjects.push(newSubject)
        await addSubjectClass.save();
      }
      res.status(200).json(newSubject)
    
  }catch(error){
    res.status(500).json({message: error.message})
  }
});


router.get('/:id/subjects', async (req, res)=>{
  try{
    console.log(`The class is: ${req.params.id}`)
  const classSubjects = await Class.find({class: req.params.id}).populate("subjects", "name");
  if(!classSubjects){
    return res.status(404).json({message: "Class not found"});
  }
  res.status(200).json(classSubjects)
  console.log(classSubjects)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

module.exports = router;