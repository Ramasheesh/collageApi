const Utility = require("../utility/utility");
const Model = require("../models/user");
const config = require("config");

const authService = async (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;
    // // console.log('authHeader: ', authHeader);
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return res.status(401).json({ error: "Unauthorized: No token provided or malformed token" });
    // }

    // const token = authHeader.split(' ')[1];
    // // console.log('token: ', token);

    // const decodedTokenData = await Utility.jwtVerify(
    //   token,
    //   config.get("jwtOption.jwtSecretKey")
    // );
    // if(!decodedTokenData){
    //     res.status(401).json({ error: "invalid token" });
    // }
    // // req.userId = decodedToken.userId;
    // // console.log('decodedToken: ', decodedToken);
    // const userData = await Model
    //     .findById({ _id: decodedTokenData._id })
    //     .lean()
    //     .exec();
    //     // console.log('userData: ', userData);

    //   if (userData) {
    //     req.user = userData;
    //     req.user.forResetPassword = decodedTokenData.forResetPassword;
    //     req.user.role = "user";
    //     next();
    // // console.log('req.userId: ', req.userId);
    //   }

    if (req && req.user) {
      next();
    } else if (req && req.headers.authorization) {
      const accessTokenFull = req.headers.authorization;
      if (!accessTokenFull) { 
        return res
          .status(401)
          .json({ message: "Authorization header is missing" });
      }

      let accessToken = "";
      if (accessTokenFull.startsWith("Bearer")) {
        accessToken = accessTokenFull.split(" ")[1];
      } else {
        return res.status(401).json({ error: "Invalid token format"});
      }
      const decodeData = await Utility.jwtVerify(accessToken);
      if (!decodeData) {
        return res.status(403).json({ error: "INVALID TOKEN" });
      }
      const userData = await Model.findOne({ _id: decodeData._id })
        .lean()
        .exec();
      if (userData) {
        req.user = userData;
        // req.user.forResetPassword = decodeData.forResetPassword;
        req.user.role = "user";
        next();
      }
    } else {
      return res.status(401).json({ error: "AUTH_TOKEN_MISSING" });
    }
  } catch (error) {
    // console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal server error !:" });
  }
};

// Authorization middleware
const authorizeUser = (requiredRole) => async (req, res, next) => {
  try {
    const user = await Model.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("Error authorizing user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while authorizing the user" });
  }
};

module.exports = {
  authService,
  authorizeUser,
};
