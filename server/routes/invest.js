const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const getUserData = require("../middleware/getUserData");
const Stock = require("../models/Stock");
const User = require("../models/User");



// This router handles a GET request to retrieve all stocks associated with the current user.
router.get("/get", getUserData, async (req, res) => {
  try {
    console.log("-c");
    // Retrieve all stocks from the database that are associated with the current user.
    const stocks = await Stock.find({ user: req.user.id });
    console.log("firs55t");
    // Send the retrieved stocks as a response to the client.
    res.json({ stocks });
  } catch (error) {
    // If an error occurs during the process, send an error response to the client.
    res.send({ error: error.message });
  }
});


// This router handles a GET request to retrieve all stocks of a certain type associated with the current user.
router.get("/getbytype", getUserData, async (req, res) => {
  try {
    // Retrieve all stocks from the database that are associated with the current user and have the requested type.
    const stocks = await Stock.find({ user: req.user.id, type: req.body.type });
    // Send the retrieved stocks as a response to the client.
    res.json({ stocks });
  } catch (error) {
    // If an error occurs during the process, send an error response to the client.
    res.send({ error });
  }
});

// This router handles a POST request to buy a stock.
router.post("/buy", getUserData, async (req, res) => {
  try {
    const userid = req.user.id;
    // Find the user with the given ID in the database.
    let user = await User.findById({ _id: userid });
    // Retrieve the user's current balance.
    const amount = user.amount;
    // Retrieve the requested number of stocks to buy and their price per stock from the request body.
    const number = req.body.number;
    const price = req.body.price;
    // Check if the user has enough balance to make the purchase.
    if (amount < number * price) {
      return res.send({ message: "Insufficient Balance" });
    }
    // Check if the user already owns some stocks of the same type and company.
    let stock = await Stock.findOne({
      user: userid,
      type: req.body.type,
      company: req.body.company,
    });
    if (stock != null) {
      // If the user already owns some stocks of the same type and company, update the number of stocks and deduct the total cost from the user's balance.
      const id = stock._id;
      user = await User.findByIdAndUpdate(userid, {
        amount: eval(user.amount - price * number),
      });
      stock = await Stock.findByIdAndUpdate(id, {
        number: eval(number + stock.number),
      });
      stock = await Stock.findById(id);
      return res.send(stock);
    }
    // If the user doesn't already own any stocks of the same type and company, create a new stock in the database and deduct the total cost from the user's balance.
    stock = await Stock.create({
      user: userid,
      company: req.body.company,
      type: req.body.type,
      number: number,
      price: price,
    });
    user = await User.findByIdAndUpdate(userid, {
      amount: eval(user.amount - price * number),
    });
    stock = await Stock.findOne({
      user: userid,
      type: req.body.type,
      company: req.body.company,
    });
    res.send(stock);
  } catch (error) {
    // If an error occurs during the process, send an error response to the client.
    res.send({ error: error.message });
  }
});


// Route to sell a stock
router.post("/sell", getUserData, async (req, res) => {
  try {
    const userid = req.user.id;
    console.log(userid);
    // Find the user by ID
    let user = await User.findById({ _id: userid });
    console.log(user);
    const amount = user.amount;
    console.log(amount);
    const number = req.body.number;
    const price = req.body.price;
    // Find the stock based on user ID, type, and company
    let stock = await Stock.findOne({
      user: userid,
      type: req.body.type,
      company: req.body.company,
    });
    if (stock != null) {
      // If the number of stocks is less than the requested number, return an error
      if (stock.number < number) {
        return res.send({ error: "Not able to sell" });
      }
      // Update user's balance by adding the selling price
      user = await User.findByIdAndUpdate(userid, {
        amount: eval(user.amount + price * number),
      });
      const id = stock._id;
      // Update stock's number by subtracting the sold amount
      stock = await Stock.findByIdAndUpdate(id, {
        number: eval(stock.number - number),
      });
      stock = await Stock.findById(id);
      // Return the updated stock data
      return res.send(stock);
    } else {
      // If the stock is not found, return an error
      res.status(401).send({ error: "Not able to sell" });
    }
    // user = await User.findByIdAndUpdate(userid, {
    //   amount: eval(user.amount - price * number),
    // });
    // console.log(user);
    // res.send(stock);
  } catch (error) {
    // Return the error message if there is an error
    res.send({ error: error.message });
  }
});

module.exports = router;
