const Utility = require("../utility/utility");
const Model = require('../models/user');
const config = require('config');

const authService = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log('authHeader: ', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized: No token provided or malformed token" });
    }

    const token = authHeader.split(' ')[1];
    // console.log('token: ', token);
    
    const decodedTokenData = await Utility.jwtVerify(
      token,
      config.get("jwtOption.jwtSecretKey")
    );
    if(!decodedTokenData){
        res.status(401).json({ error: "invalid token" });
    }
    // req.userId = decodedToken.userId;
    // console.log('decodedToken: ', decodedToken);
    const userData = await Model
        .findById({ _id: decodedTokenData._id })
        .lean()
        .exec();
        // console.log('userData: ', userData);

      if (userData) {
        req.user = userData;
        req.user.forResetPassword = decodedTokenData.forResetPassword;
        req.user.role = "USER";
        next();
    // console.log('req.userId: ', req.userId);
      }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: "Error authenticating user:" });
  }
};

// Authorization middleware
const authorizeUser = (requiredRole) => async (req, res, next) => {
  try {
    const user = await Model.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  } catch (error) {
    console.error('Error authorizing user:', error);
    res.status(500).json({ error: 'An error occurred while authorizing the user' });
  }
};

module.exports = {
  authService,
  authorizeUser
};
