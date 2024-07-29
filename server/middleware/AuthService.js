// const  Model  = require("../models");
// const mongoose = require('mongoose')
// const messages = require('../messages/message').MESSAGES;
// const response  = require("../utility/response");
// const  responseCode  = require("../utility/responseCode");
// const utility = require("../utility/utility");

// const userAuthService  = async function(req,res,next){
//     try {
//         if (req && req.user) {
//             next();
//         } else if (req && req.headers.authorization) {
//             const accessTokenFull = req.headers.authorization;
//             let accessToken = "";
//             if (accessTokenFull.startsWith("Bearer")) {
//                 accessToken = accessTokenFull.substr("Bearer".length + 1);
//             } else {
//                 const parts = accessTokenFull.split(" ");
//                 accessToken = parts[1];
//             }
//             const decodeData = await utility.jwtVerify(accessToken);
//             if (!decodeData) throw process.lang.INVALID_TOKEN;
//             const userData = await Model.user.findOne({ _id: decodeData._id }).lean().exec();
//             if (userData) {
//                 req.user = userData;
//                 req.user.forResetPassword = decodeData.forResetPassword;
//                 req.user.userType = "USER";
//                 next();
//             } else {
//                 return response.sendFailResponse(req, res, responseCode.UN_AUTHORIZED, process.lang.INVALID_TOKEN);
//             }
//         } else {
//             return response.sendFailResponse(req, res, responseCode.UN_AUTHORIZED, process.lang.AUTH_TOKEN_MISSING);
//         }
//     } catch (error) {
//         next(error)
//     }
// }
// const adminAuth = async (req, res, next) => {
//     try {
//         if (req.admin && req.admin.guestMode) {
//             next();
//         } else if (req.headers.authorization) {
//             let accessToken = req.headers.authorization;
//             if (accessToken.startsWith("Bearer")) {
//                 accessToken = accessToken.substr("Bearer".length + 1);
//             }
//             const decodeData = await utility.jwtVerify(accessToken);
//             if (!decodeData) throw messages.INVALID_TOKEN;
//             const adminData = await Model.admin
//                 .findOne({ _id: new mongoose.Types.ObjectId(decodeData._id) })
//                 .lean()
//                 .exec();
//             if (adminData) {
//                 req.admin = adminData;
//                 req.admin.forResetPassword = decodeData.forResetPassword;
//                 req.admin.adminType = "ADMIN";
//                 next();
//             } else {
//                 return response.sendFailResponse(req, res, responseCode.UN_AUTHORIZED, process.lang.INVALID_TOKEN);
//             }
//         } else {
//             return response.sendFailResponse(req, res, responseCode.UN_AUTHORIZED, process.lang.AUTH_TOKEN_MISSING);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = {
//     userAuthService,adminAuth
// }