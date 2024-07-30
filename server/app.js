const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const v1Routes = require("./v1/routes");
const database = require("./connections/dbConnection");
// const constant = require("./messages/message");
// const Response = require("./utility/response");

const port = process.env.PORT || 3000;

/*
app.use(function (req,res,next) {
    if(req.headers && req.headers.lang && req.headers.lang == 'fr'){
    process.lang = constant.MESSAGES.fr;
    }else{
        process.lang = constant.MESSAGES.en;
    }
    next()
})
*/ 

// start
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // For parsing application/json
// app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", v1Routes);

app.listen(port, () => {
  try {
    console.log(`Server is running on http://localhost:${port}`);
    database.mongodbConnection;
  } catch (error) {
    console.log(error);
  }
});
