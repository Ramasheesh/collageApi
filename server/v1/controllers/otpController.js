// controllers/otpController.js
const Otps = require('../../models/otp');
const randomstring = require('randomstring');
const {sendEmail} = require('../../utility/sendEmails');

// Generate OTP
function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric' 
    });
}

function validateOTP(otp, storedOtpDetails) {
    const currentTime = Date.now();
    const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Check if the OTP has expired
    if (currentTime - storedOtpDetails.timestamp > expirationTime) {
        return false; // OTP has expired
    }

    // Check if the OTP matches
    return otp === storedOtpDetails.otp;
}

// Send OTP to the provided email
const sendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        const otp = generateOTP(); // Generate a 6-digit OTP
        const newOTP = new Otps({ email, otp, timestamp: Date.now() }); // Save OTP with timestamp
        await newOTP.save();
 
        // Send OTP via email 
        await sendEmail({
            to: email,
            subject: 'Your OTP',
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

       return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Verify OTP provided by the user
const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const existingOTP = await Otps.findOne({ email, otp });

        if (existingOTP) {
            if (validateOTP(otp, existingOTP)) {
                await Otps.deleteOne({ email, otp }); // Remove OTP after verification
                res.status(200).json({ success: true, message: 'OTP verification successful' });
            } else {
                res.status(400).json({ success: false, error: 'OTP has expired' });
            }
        } else {
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    sendOTP,verifyOTP
}