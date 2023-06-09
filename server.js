require('./Utils/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const CompanyAuthRoutes = require('./Controllers/Company/routes');

var app = express();
mongoose.set('strictQuery', false)
mongoose
    .connect("mongodb+srv://fahim:VlC1J930kCjLfaGx@cluster0.qjlbx0h.mongodb.net/hrms", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => console.log("Connected to the DB"))
    .catch((err) => console.log("error while connecting to db: ", err));
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', CompanyAuthRoutes);


// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
