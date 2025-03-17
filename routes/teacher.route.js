/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
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
 *           example: Mr. Ede Ikenna
 *           description: Teachers name
 *         classes:
 *           type: array
 *           items:
 *             type: string
 *           example: ["67d11e4bf9050e52315933d6", "67d1333706340c4a0c156fdc"]
 *           description: The classes IDs offering the subjects she teaches
 *         school:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: The school ID of the school where teacher works at.
 *       example:
 *         id: 67d78c3ac527c98e5423ac74
 *         name: Mr. Eze Victor 
 *         classes: ["67d11e4bf9050e52315933d6", "67d1333706340c4a0c156fdc"]
 *         school: 67ce6b0c1d4372b948912cb8
 */


const express = require("express");
const router = express.Router();

const Teacher = require("../models/teacher.model");
const Class = require("../models/class.model")





/**
 * @swagger
 * tags:
 *  name: Teacher
 *  description: The Teacher API
 */

/**
 * @swagger
 * /api/teachers:
 *  post:
 *    tags: [Teacher]
 *    summary: Add a new Teacher to a school and assign to a class 
 *    requestBody:
 *      description: Post a new teacher to a school and assign to a class/classes
 *      content:
 *        application/json:  
 *          schema:
 *            $ref: '#/components/schemas/Teacher'
 *      required: true
 *    responses:
 *      200:
 *        description: Teacher posted successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      500: 
 *        description: Internal Server Error
 *      
 */
router.post('/teachers', async (req, res) => {
  try{
    const newTeacher = await Teacher.create(req.body)
    const addTeacherClass = await Class.findById(req.body.teacher);
    if(addTeacherClass){
      addTeacherClass.teacher.push(newTeacher)
      await addTeacherClass.save();
    }
    res.status(200).json(newTeacher)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});



/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     tags: [Teacher]
 *     summary: Get a teacher in a school and the classes assigned 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The teacher Id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Operation done successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: No teacher found
 *       500:
 *         description: Internal server error
 * 
 */
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