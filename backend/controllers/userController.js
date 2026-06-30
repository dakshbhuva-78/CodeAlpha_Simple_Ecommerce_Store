import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Order from "../models/Order.js";

export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        const passwordRegex =

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (

            !passwordRegex.test(password)

        ) {

            return res.status(400).json({

                message:

                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."

            });

        }

        const userExists = await User.findOne({ email });

        if (userExists) {

            if (userExists.isVerified) {

                return res.status(400).json({

                    message: "User already exists"

                });

            }

            const otp = Math.floor(

                100000 + Math.random() * 900000

            ).toString();

            userExists.name = name;

            const salt = await bcrypt.genSalt(10);

            userExists.password = await bcrypt.hash(

                password,

                salt

            );

            userExists.otp = otp;

            userExists.otpExpire =

                Date.now() + 10 * 60 * 1000;

            await userExists.save();

            await sendEmail(
                email,

                "AppleStore Email Verification",

                `Your new OTP is: ${otp} 
                This OTP is valid for 10 minutes.`

            );

            return res.status(200).json({
                message:
                    "OTP resent successfully"
            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(password, salt);

        // Generate 6-digit OTP

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpExpire =
            Date.now() + 10 * 60 * 1000;

        // Create User

        await User.create({

            name,

            email,

            password: hashedPassword,

            role: "user",

            isVerified: true,

            otp: "",

            otpExpire: null,

        });

        // Send Email
        //     await sendEmail(
        //         email,
        //         "AppleStore Email Verification",
        //         `
        // <div style="font-family:Arial;padding:20px">
        //     <h2>AppleStore</h2>

        //     <p>Welcome to AppleStore.</p>

        //     <p>Your verification code is:</p>

        //     <h1 style="letter-spacing:8px;color:#2563eb">
        //         ${otp}
        //     </h1>

        //     <p>
        //         This OTP is valid for
        //         <b>10 minutes</b>.
        //     </p>

        //     <hr>

        //     <small>
        //         Do not share this OTP with anyone.
        //     </small>
        // </div>
        // `
        //     );

        //     res.status(201).json({

        //         message:
        //             "OTP sent successfully to your email."

        //     });
        // Email verification temporarily disabled

        res.status(201).json({
            message: "Registration successful."
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message,
        });

    }

};

export const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.isVerified) {

            return res.status(400).json({
                message: "Email already verified"
            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        if (user.otpExpire < Date.now()) {

            return res.status(400).json({
                message: "OTP has expired"
            });

        }

        user.isVerified = true;
        user.otp = "";
        user.otpExpire = null;

        await user.save();

        res.json({
            message: "Email verified successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const resendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.isVerified) {

            return res.status(400).json({
                message: "Email already verified"
            });

        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.otp = otp;
        user.otpExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendEmail(

            email,

            "AppleStore Email Verification",

            `Your new OTP is: ${otp}
            
            This OTP is valid for 10 minutes.`

        );

        res.json({

            message: "New OTP sent successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.otp = otp;

        user.otpExpire =
            Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendEmail(

            email,

            "AppleStore Password Reset",

            `Your OTP for password reset is:

${otp}

This OTP is valid for 10 minutes.`

        );

        res.json({

            message:
                "OTP sent successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const resetPassword = async (req, res) => {

    try {

        const {

            email,

            otp,

            password

        } = req.body;



        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({

                message:
                    "Invalid OTP"

            });

        }

        if (user.otpExpire < Date.now()) {

            return res.status(400).json({

                message:
                    "OTP expired"

            });

        }

        const passwordRegex =

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (

            !passwordRegex.test(password)

        ) {

            return res.status(400).json({

                message:

                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."

            });

        }
        const salt =
            await bcrypt.genSalt(10);

        user.password =
            await bcrypt.hash(
                password,
                salt
            );

        user.otp = "";

        user.otpExpire = null;

        await user.save();

        res.json({

            message:
                "Password updated successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                message: "Invalid Email or Password"

            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // if (!user.isVerified) {

        //     return res.status(401).json({

        //         message: "Please verify your email first."

        //     });

        // }

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

        res.status(200).json({

            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            message: "Login Successful"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        const orderCount = await Order.countDocuments({

            user: req.user._id

        });

        const reviewCount = await Order.countDocuments({

            user: req.user._id,

            feedbackGiven: true

        });

        res.json({

            ...user._doc,

            orderCount,

            reviewCount,

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const updateUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        user.name = req.body.name || user.name;

        await user.save();

        res.json({

            _id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

            message: "Profile updated successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

