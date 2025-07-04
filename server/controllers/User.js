const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const registerUser = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
        };

        const plainTextPassword = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
        userData.password = hashedPassword;

        const user = new User(userData);
        const newUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            userId: newUser._id
        });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Failed to register user."
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const userFromDb = await User.findOne({ email: req.body.email });

        if (!userFromDb) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, userFromDb.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const now = Date.now();
        const oneHrInMs = 24 * 60 * 60 * 1000;

        const jwtPayload = {
            subject: "www.jiraa.com",
            iat: now,
            exp: now + oneHrInMs,
            userId: userFromDb._id,
            email: userFromDb.email,
        };

        const token = jwt.sign(jwtPayload, jwtSecretKey);

        await User.findByIdAndUpdate(userFromDb._id, { token });

        res.setHeader('my-new-header', "123");
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Failed to login user"
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { token: "" });
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (err) {
        console.error("LOGOUT ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Failed to logout user"
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
