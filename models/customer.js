const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //trims off white space
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
})

//add created at an updated at automatically
CustomerSchema.plugin(timestamp); //To use timestamp

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
