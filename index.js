const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const dotenv = require("dotenv").config();

const dbUsername = process.env.DB_USERNAME;
const dbPword = process.env.DB_PWORD;
const PORT = process.env.PORT || 3000;
const host = `${process.env.HOSTNAME || 'localhost'} || ${process.env.PORT || 3000}`

const schoolRoute = require("./routes/school.route");
const classRoute = require("./routes/class.route");
const studentRoute = require("./routes/student.route");
const subjectRoute = require("./routes/subject.route");
const teacherRoute = require("./routes/teacher.route");
// const connectDb = require("./config/dbConnection");



// swagger configuration Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management API",
      version: "1.0.0",
      description: "API Documentation for School Management System"
    },
    host: `${process.env.HOSTNAME || 'localhost'}:${process.env.PORT || 3000}`,
    basePath: "/api", 
  },
  apis: ["./routes/*.js"]
}


const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Swagger UI
const specs = swaggerJsDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

// routes
app.use('/api', schoolRoute);
app.use('/api', classRoute);
app.use('/api', studentRoute);
app.use('/api', subjectRoute);
app.use('/api', teacherRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});    






mongoose.connect(`mongodb+srv://${dbUsername}:${dbPword}@schoolbackenddb.krzze.mongodb.net/School-Management-API?retryWrites=true&w=majority&appName=SchoolBackendDB`)
.then(() => {
  console.log("Connected to the database!");
  app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
  });
}).catch(() => {
  console.log("Connection Failed!")
})