const express = require("express");
// const { user, addressModel } = require("../../models");
const router = express.Router();
const userController = require("../controllers/user");
const otpController = require("../controllers/otpController");
const { authService , authorizeUser } = require("../../middleware/authServices");


router.post("/signUp", userController.signUp);

router.post('/sendOTP', otpController.sendOTP);
router.post('/verifyOTP', otpController.verifyOTP);

router.post("/login", userController.login);
router.post("/forgetPassword", userController.forgetPassword);
router.post("/setPassword", authService,userController.setPassword);
router.post("/logout",  authService,userController.logout);
router.post("/deleteUser",  authService,userController.deleteUser);
router.put("/updateProfile",  authService,userController.updateProfile);
router.get("/getUser", authService, userController.getUser);

module.exports = router;
 