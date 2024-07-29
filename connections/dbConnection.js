const config = require("config");
const mongoose = require("mongoose");

// const mongodbConnection = async () => {
//   const url = config.get("mongo.url");
//   try {
//     await mongoose.connect(url);
//     console.log("MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// };

// module.exports = mongodbConnection();

// Connect to MongoDB

const mongodbConnection = async () => {
  const url = config.get("mongo.url");
  mongoose.connect( config.get("mongo.url"));
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

module.exports = mongodbConnection();
