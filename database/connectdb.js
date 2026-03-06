require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Successfully Connected!")
    } catch (error) {
        console.error(`Database Failed to connect: ${error.message}`)
        process.exit(1)
    }
};

module.exports = connectDB;