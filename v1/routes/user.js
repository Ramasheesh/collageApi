const express = require("express");
const { user, addressModel } = require("../../models");
const router = express.Router();
const userController = require("../controllers/user");
const { authService , authorizeUser } = require("../../middleware/authServices");


router.post("/signUp", userController.signUp);
// router.post("/verifyOtp", userController.verifyOtp);
router.post("/login", userController.login);
router.post("/forgetPassword", userController.forgetPassword);
router.post("/logout",  authService,userController.logout);
router.post("/deleteUser",  authService,userController.deleteUser);
router.put("/updateProfile",  authService,userController.updateProfile);
router.get("/getProfile", authService, userController.getProfile);

module.exports = router;
 