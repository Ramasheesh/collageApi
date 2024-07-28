const config = require("config");
const mongoose = require("mongoose");

const mongodbConnection = async () => {
  const url = config.get("mongo.url");
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = mongodbConnection();
