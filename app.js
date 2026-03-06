require("dotenv").config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database/connectdb");
const Joi = require("joi");
const RequestLogger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(RequestLogger);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});