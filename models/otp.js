const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{type: String},
    otp: {type: String},
    timestamp: { type: Date, default: Date.now }
})

const Otps = mongoose.model('otp', otpSchema);

module.exports= Otps;
