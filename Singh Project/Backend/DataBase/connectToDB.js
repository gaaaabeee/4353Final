const mongoose = require("mongoose");
const mongoDB_URI = "mongodb://127.0.0.1:27017/assignmentproject";


const connectToDB = () => {
  try {
    mongoose.connect(mongoDB_URI);
    console.log("Connected to DB.");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToDB;
