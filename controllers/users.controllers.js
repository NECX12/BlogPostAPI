const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");

const registerUser = async (req, res, next) => {
    const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const {error} = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    try {
        const {name, email, password} = req.body;

        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                message: "This User already exists!"
            })
        }
        
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            message: "User Successfully Signed Up!"
        })
        } catch (error){
            next(error);
        }
    };


const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const {error} = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({
                message: "User Not Found!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials!"
        })
        }

        const token = jwt.sign({userId: user._id, name: user.name}, // payload
            process.env.JWT_SECRET, // secret key
            {expiresIn: "7d"} // options
        );

        const resUser = {
            _id: user.id,
            name: user.name,
            email: user.email, 
        }

        return res.status(200).json({
            message: "You have Successfully Logged in!",
            user: resUser,
            token
        });

    }   catch (error) {
        next(error)
    }
};


module.exports = {
    registerUser,
    loginUser
};