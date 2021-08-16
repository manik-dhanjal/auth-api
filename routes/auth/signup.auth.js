const express = require("express");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const UserModel = require("../../schema/user.schema");
const {signUpValidation} = require("../../utils/validation.utils")

const router = express.Router();


router.post("/signup", async (req, res) => {
    try{
        const {error} = signUpValidation(req.body);
        if(error) return res.status(400).json({message:error.details[0].message})   

        const {name,email,password} = req.body;

        const isUserExist = await UserModel.findOne({email});
        if(isUserExist){
            return res.status(409).json({message:"User already existed"});
        }

        const hashedPass = await bcrypt.hash(password,10);

        const user = await UserModel.create({
            name,
            email: email.toLowerCase(),
            password: hashedPass
        })

        const token = jwt.sign(
            { user_id: user._id, email,name },
            process.env.JWT_KEY,
          );

        user.token = token;

        return res.status(201).json({
            name:user.name,
            email:user.email,
            token:user.token,
            message:"user is successfully signed up"
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong, Try again later !!"})
    }
 
    
});

module.exports = router;