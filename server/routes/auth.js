const express = require("express");
require('dotenv').config()
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUserData = require("../middleware/getUserData");

const router = express.Router();

// Endpoint to handle user sign-up
router.post(
  "/signUp",

  // Validation middleware using express-validator
  body("name", "Name must be at least 3 characters long.").isLength({ min: 3 }),
  body("email", "Email must be a valid email address.").isEmail(),
  body("password", "Password must be at least 8 characters long.").isLength({ min: 8 }),

  async (req, res) => {
    // Flag to track if the request was successful
    let isSuccessFul = false;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ error: errors });
      return res.status(400).send(errors);
    }
    else {
      // Extract user data from request body
      const { name, email, number, password } = req.body;

      // Check if user with email already exists in the database
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ error: "User already exists" });
      }
      else {
        // Hash the password before storing in database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create a new user object with hashed password
        user = await User.create({
          name: name,
          email: email,
          number: number,
          password: hashedPassword,
        });

        // Generate authentication token with user ID
        const data = {
          user: {
            id: user.id,
          },
        };
        isSuccessFul = true;
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);

        // Send response with authentication token
        res.json({ isSuccessFul, authtoken });
      }
    }
  }
);

// Handle POST request for /login endpoint
router.post(
  "/login",

  // Validate request body fields using express-validator
  body("email", "Please enter a valid email address.").isEmail(),
  body("password", "Password must not be left empty.").isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);
    // Check if there are any validation errors
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }

    let isSuccessFulLogin = false;
    const { password, email } = req.body;

    try {
      // Find the user with the given email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ error: "Email or Password is incorrect" });
      }
      // Compare the given password with the hashed password stored in the database
      const comparison = await bcrypt.compare(password, user.password);
      if (!comparison) {
        return res.status(400).send({ error: "Email or Password is incorrect" });
      }
      // Generate a JSON Web Token (JWT) containing the user's ID
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      isSuccessFulLogin = true;
      // Send the JWT as a response
      res.status(200).send({ isSuccessFulLogin, authtoken });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);


// This router handles a GET request to retrieve user data from the server.
router.get("/getuser", getUserData, async (req, res) => {
  try {
    // Get the user ID from the request object.
    const userid = req.user.id;
    // Retrieve user data from the database based on the user ID, excluding the password field.
    const user = await User.findById(userid).select("-password");
    // Send the retrieved user data as a response to the client.
    res.send(user);
  } catch (error) {
    // Log any errors that occur during the process.
    console.log(error.message);
    // Send a 500 Internal Server Error response to the client if an error occurs.
    res.status(500).json({ error: "Internal server error" });
  }
});

// This router handles a PUT request to update the user's account balance by depositing a certain amount of money.
router.put("/deposit", getUserData, async (req, res) => {
  try {
    const userid = req.user.id;
    let user = await User.findById(userid);

    // If the user exists, update their account balance by adding the deposited amount.
    if (user) {
      // Get the deposited amount from the request body.
      const amount = req.body.amount;
      // Update the user's account balance in the database.
      user = await User.findByIdAndUpdate(userid, { amount: amount + user.amount });
      // Retrieve the updated user data from the database.
      user = await User.findById(userid);
      // Send the updated user data as a response to the client.
      res.send(user);
    }
    else {
      // If the user does not exist, send a 400 Bad Request response to the client.
      res.status(400).send({ error: "Account not found" });
    }
  } catch (error) {
    // If an error occurs during the process, send an error response to the client.
    res.send({ error: error.message });
  }
})

// This router handles a PUT request to update the user's account balance by withdrawing a certain amount of money.
router.put("/withdraw", getUserData, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (user) {
      const amount = req.body.amount;
      // Check if the requested withdrawal amount is greater than the user's current balance.
      if (amount > user.amount) {
        return res.status(400).send({ error: "You can not withdraw more than Your current balance" });
      }
      // Update the user's account balance by subtracting the withdrawn amount.
      user = await User.findByIdAndUpdate(userId, { amount: user.amount - amount });
      // Retrieve the updated user data from the database.
      user = await User.findById(userId);
      // Send the updated user data as a response to the client.
      res.send(user);
    }
    else {
      // If the user does not exist, send a 400 Bad Request response to the client.
      res.status(400).send({ error: "Account not found" });
    }
  } catch (error) {
    // If an error occurs during the process, send an error response to the client.
    res.send({ error: error.message });
  }
})





module.exports = router;
