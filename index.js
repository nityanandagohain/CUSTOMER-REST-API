const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const customers = require("./routes/customers");
const users = require('./routes/users');
const ejwt = require('express-jwt');

const app = new express();

//Middleware
app.use(bodyParser.json());

app.use(ejwt({secret: config.JWT_SECRET}).unless({path: ['/users/register','/users/auth']}));

//Connect to mongo
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

//To remove a mongoose error
mongoose.set('useFindAndModify', false);


// Use Routes
app.use('/customers', customers);
app.use('/users', users);

//start listening
app.listen(config.PORT, () => console.log(`Server Started in PORT ${config.PORT}`));