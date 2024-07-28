const Model = require("../../models/user");
const Utility = require("../../utility/utility.js");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

async function signUp(req, res, next) {
  let data = req.body;
  data.password = await Utility.hashPasswaordUsingBcrypt(data.password);
  try {
    let existingUser = await Model.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }
    const user = new Model(data);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
    // console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function login(req, res, next) {
  try {
    const data = req.body;
    
    let userExist = await Model.findOne({
      email: data.email,
      isDeleted: false
    });
    // console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ error: "Email and Password is Wrong" });
    }
    let match = await Utility.comparePasswordUsingBcrypt(
      data.password,
      userExist.password
    );
    let user = await Model.findOne({ _id:  userExist._id });
    // console.log('match: ', user);
    user = await _doLogin(data, user);

    res.status(200).json({ user, msg: "Login Successfully" });
    next();
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function _doLogin(data, user) {
    if (user) {
      user = JSON.parse(JSON.stringify(user));
      // console.log('user: ', user);
    }
   let token = await Utility.jwtSign({
      _id: user._id,
      email: user.email,
      number: user.number,
    });
    // console.log('token: ', token);

    user.type = "Bearer";
    user.token = token;
    return user;
}
async function logout(req,res,user) {
  try {

    let data = req.body;
    user = await Model.findOne({email : data.email});
    if(!user){
      res.status(404).json({msg: "You can't logout"});
    }
    user.token = "";
    return res.status(200).json({msg: "Logout Successfully"});
  } catch (error) {
    return res.status(500).json({error: "Server error"})
  }
}

async function forgetPassword(req,res) {
  try {
    
  } catch (error) {
    
  }
}
async function forResetPassword(req,res) {
  try {
    
  } catch (error) {
    
  }
}
async function setPassword(req,res) {
  try {
    
  } catch (error) {
    
  }
}
async function getProfile(req,res) {
  try {
    
  } catch (error) {
    
  }
}
async function updateProfile(req,res) {

  try {
    // const { id } = req.params;
    const id = req.user._id;
    // console.log('user: ', id);
    const data= req.body;
    // console.log('data: ', data);
    if (data.class && (data.class < 1 || data.class > 12)) {
      return res.status(400).json({ error: 'Invalid class provided' });
    }
    const userData = await Model.findByIdAndUpdate({_id: id},{$set:data}, {new: true , runValidators: true});
    // console.log('userData: ', userData);
    if(!userData){
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(201).json({userData,message: "update successfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function deleteUser(req,res) {
  let user = req.user
  try {
    let data = await Model.findOneAndUpdate({_id: user._id},{isDeleted: true},{ new:true});
    if (!data) {
      res.status(404).json({message: "user not found"});
    }
    await data.save();
    return res.status(200).json({message:'Success'});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  signUp,
  login,
  logout,
  forgetPassword,
  forResetPassword,
  setPassword,
  getProfile,
  updateProfile,
  deleteUser
};
