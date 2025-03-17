/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       required:
 *         - name
 *         - location
 *         - dateCreated
 *         - admin
 *       properties:
 *         id:
 *           type: string
 *           example: 67ce6b0c1d4372b948912cb8
 *           description: The auto-generated id of a school
 *         name:
 *           type: string
 *           example: HolyGhost Primary/Secondary School
 *           description: The name of the school
 *         location:
 *           type: string
 *           example: Water Works Rd Abakaliki, Ebonyi state
 *           decription: The location of the school
 *         dateCreated:
 *           type: string
 *           format: date
 *           example: 2000-08-18
 *           description: The date of school registration
 *         admin:
 *           type: string
 *           example: Mrs Ogbunna Felicia
 *           description: The school administrator
 *       example:
 *         id: 67ce6b0c1d4372b948912cb8
 *         name: HolyGhost Primary/Secondary School
 *         location: Water Works Rd Abakaliki, Ebonyi State
 *         dateCreated: 2000-08-18
 *         admin: Mrs Ogbunna Felicia
 */

const express = require("express");
const router = express.Router();
const School = require("../models/school.model");

/**
 * @swagger
 * tags:
 *  name: School
 *  description: The Schools API
 */

/**
 * @swagger
 * /api/schools:
 *  post:
 *    tags: [School]
 *    summary: Add a new School
 *    requestBody:
 *      description: Create a new school
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/School'
 *      required: true
 *    responses:
 *      200:
 *        description: Successful Operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/School'
 *      500: 
 *        description: Internal Server Error
 *      
 */
router.post('/schools', async(req, res) => {
  try{
    const school = await School.create(req.body);
    res.status(200).json(school)
  }catch(error){
    res.status(500).json({message: error.message})
  }
});


/**
 * @swagger
 * /api/schools:
 *   get:
 *     tags: [School]
 *     summary: Get all schools
 *     responses:
 *       200:
 *         description: Successful operation
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 *       500:
 *         description: Internal server error
 * 
 */
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
