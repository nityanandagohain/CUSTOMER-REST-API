const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const auth = require("../auth");
const config = require("../config");

// @route   POST /users/register
// @desc    Registers a User
// @headers [{"key":"Content-Type","value":"application/json","description":""}]
// @body    email, password
// @access  Public
router.post("/register", (req, res) => {
  // Register User
    const { email, password } = req.body;
    const user = new User({
      email,
      password
    });
    // Encrypt the password and store it.
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash password
        user.password = hash;
        // Save the user
        try {
          const newUser = await user.save();
          res.sendStatus(201);
        } catch (err) {
          res.status(403).json({
            message: "Error Creating User"
          });
        }
      });
    });
  }
);

// @route   POST /users/auth
// @desc    Authenticates a user and returns an accesstoken valid for 15min
// @headers [{"key":"Content-Type","value":"application/json","description":""}]
// @body    email, password
// @access  Public
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Authenticate User
    const user = await auth.authenticate(email, password);
    // Create JWT
    const token = await jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: "15m"
    });
    //issued at , expired at
    const { iat, exp } = jwt.decode(token);
    // Respont with token
    res.send({ iat, exp, token });
  } catch (err) {
    // user unauthorised
    res.status(403).json({
      message: "Error authentication"
    });
  }
});

module.exports = router;
