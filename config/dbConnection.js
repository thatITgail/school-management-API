const mongoose = require("mongoose");
const express = require("express");

const app = express();

const connectDb = async () => { 
  try{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected")
   
  }catch(error){
    console.log(error);
    process.exit(1)
  }
};


module.exports = connectDb;