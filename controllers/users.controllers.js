const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../moldels/user.model");

const registerUser = async (req, res, next) => {
    const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min()
    });

    const {error} = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    try {
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            message: "User registered Successfully"
        })
        } catch (error){
            next(error);
        }
    };