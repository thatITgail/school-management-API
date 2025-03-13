const express = require("express");
const mongoose = require("mongoose");

const schoolRoute = require("./routes/school.route");
const classRoute = require("./routes/class.route");
const studentRoute = require("./routes/student.route");
const subjectRoute = require("./routes/subject.route");
const teacherRoute = require("./routes/teacher.route")

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// routes
app.use('/api', schoolRoute);
app.use('/api', classRoute);
app.use('/api', studentRoute);
app.use('/api', subjectRoute);
app.use('/api', teacherRoute);


app.get('/', (req, res) => {
  res.send("Hello from Node API Server")
});






mongoose.connect("mongodb+srv://lauraschen342:FtDDy8tgIlAF6QPt@schoolbackenddb.krzze.mongodb.net/School-Management-API?retryWrites=true&w=majority&appName=SchoolBackendDB")
.then(() => {
  console.log("Connected to the database!");
  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  });
}).catch(() => {
  console.log("Connection Failed!")
})