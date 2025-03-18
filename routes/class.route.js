/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - name
 *         - school
 *       properties:
 *         id:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: An auto-generated Id of a class
 *         name:
 *           type: string
 *           example: JSS 1A
 *           description: The class grade
 *         school:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: The school ID to which the class belongs
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: Reference to the student
 *           nullable: true
 *         subjects:
 *           type: array
 *           items:
 *             type: string 
 *           example: 67ce6b0c1d4372b948912cb8 
 *           description: Reference to subjects offered
 *           nullable: true
 *         teachers: 
 *           type: array
 *           items:
 *             type: string
 *           example: 67d787976129d7c916e68bbb
 *           description: Reference to the teacher 
 *           nullable: true
 *       example:
 *         id: 67ce6b0c1d4372b948912eaf
 *         name: JSS 1A
 *         school: 67ce6b0c1d4372b948912cb8
 */
const express = require("express");
const router = express.Router();

const School = require("../models/school.model")
const Class = require("../models/class.model");


/**
 * @swagger
 * tags:
 *  name: Class
 *  description: The Class API
 */

/**
 * @swagger
 * /api/classes:
 *  post:
 *    tags: [Class]
 *    summary: Add a new Class to a school
 *    requestBody:
 *      description: Create a new class and add to a school
 *      content:
 *        application/json:  
 *          schema:
 *            $ref: '#/components/schemas/Class'
 *      required: true
 *    responses:
 *      200:
 *        description: Class created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Class'
 *      500: 
 *        description: Internal Server Error
 *      
 */
router.post('/classes', async (req, res) => {
  try{
    const newClass = await Class.create(req.body);
    res.status(200).json(newClass);
  }catch (error){
    res.status(500).json({message: error.message})
  }
});



/**
 * @swagger
 * /api/{id}/classes:
 *   get:
 *     tags: [Class]
 *     summary: Get all classes in a school
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The school Id where the class is in.
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: All classes in a school
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       404:
 *         description: No class found in this school
 *       500:
 *         description: Internal server error
 * 
 */
// Get classes in a school
router.get('/:id/classes', async(req, res) => {
  try{
    // console.log(`The school id: ${req.params.id}`)
   const classes = await Class.find({school: req.params.id}).populate("students").populate("teachers");
   if(classes.length === 0){
    return res.status(404).json({message: "No class found in this school"})
   }
   res.status(200).json(classes);
  //  console.log(classes)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

// Get a class and the assigned teacher
router.get('/classes/:id', async(req, res) => {
  try{
    // console.log(`The school id: ${req.params.id}`)
   const teachers = await Class.findById( req.params.id).populate("teacher");
   if(teachers.length === 0){
    return res.status(404).json({message: "No teacher found in this class"})
   }
   res.status(200).json(teacher);
  //  console.log(classes)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});

// Delete classes
router.delete('/classes/:id', async(req, res) => {
  try{
     const {id} = req.params;
    const classes = await Class.findByIdAndDelete(id);
    if(!classes){
     res.status(404).json({message: "Class not found"})
    }
    res.status(200).json({message: "Class details deleted successfully"});
    console.log(classes);
   }catch(error){
     res.status(500).json({message: error.message})
   }
});

module.exports = router;