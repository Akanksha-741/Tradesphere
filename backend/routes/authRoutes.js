const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/UserModel");

const router = express.Router();

// ====================================
// 1. SIGNUP API
// ====================================
router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check whether the user already exists
        const existingUser = await UserModel.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await UserModel.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Signup successful",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email is already registered",
            });
        }

        return res.status(500).json({
            message: "Something went wrong during signup",
        });
    }
});

// ====================================
// 2. LOGIN API
// ====================================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const user = await UserModel.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Create authenticated session
        req.session.userId = user._id.toString();

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Something went wrong during login",
        });
    }
});

// ====================================
// 3. CHECK CURRENT SESSION
// ====================================
router.get("/me", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Not authenticated",
            });
        }

        const user = await UserModel.findById(
            req.session.userId
        ).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Session check error:", error);

        return res.status(500).json({
            message: "Unable to verify session",
        });
    }
});

// ====================================
// 4. LOGOUT API
// ====================================
router.post("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error);

            return res.status(500).json({
                message: "Unable to log out",
            });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
            message: "Logout successful",
        });
    });
});

module.exports = router;