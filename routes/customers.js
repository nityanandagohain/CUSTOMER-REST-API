const express = require("express");
const router = express.Router();

// Customer Model
const Customer = require("../models/customer");

// @route   GET /customers
// @desc    Get the list of all the customers
// @access  Protected
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (err) {
    res.status(404).json({
      "message": "Error! something went wrong"
    });
  }
});

// @route   GET /customers/id
// @desc    Get Single Customer
// @access  Protected
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    res.status(404).json({
      "message": "Error! something went wrong"
    });
  }
});

// @route   POST /customers
// @desc    Add a Customer
// @headers [{"key":"Content-Type","value":"application/json","description":""}]
//          [{"key":"Authorization","value":"Bearer <token>","description":""}]
// @body    name, email
// @access  Protected
router.post("/", async (req, res) => {
  // Check for json
  if (!req.is("application/json")) {
    res.status(404).json({
      "message": "Expected Json"
    });
  }
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    balance: req.body.balance
  });
  try {
    const newCustomer = await customer.save();
    res.status(201); //created
    res.json({
      "message": "Customer Added",
    });
  } catch (err) {
    res.status(404).json({
      "message": "Error! something went wrong"
    });
  }
});

// @route   PUT /customers/:id
// @desc    Update a Customer 
// @headers [{"key":"Content-Type","value":"application/json","description":""}]
//          [{"key":"Authorization","value":"Bearer <token>","description":""}]
// @access  Protected
router.put("/:id", async (req, res) => {
  //Check for json
  if (!req.is("application/json")) {
    res.status(404).json({
      "message": "Error! Expected Json"
    });
  }
  try {
    const newCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.sendStatus(200); //created
  } catch (err) {
    res.status(404).json({
      "message": `No customer with id: ${req.param.id}`
    });
  }
});

// @route   DELETE /customers/:id
// @desc    Delete a Customer 
// @headers [{"key":"Authorization","value":"Bearer <token>","description":""}]
// @access  Protected
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findOneAndRemove({ _id: req.params.id });
    res.status(204).json({
      "message": "Successfully Deleted"
    });
  } catch (err) {
    res.status(404).json({
      "message": "Error! something went wrong"
    });
  }
});
module.exports = router;
