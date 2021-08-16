const express = require("express");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const {loginValidation} = require("../../utils/validation.utils")
const UserModel = require("../../schema/user.schema");

const router = express.Router();

router.post("/login",async (req, res) => {
 try{
     
     const {error} = loginValidation(req.body);
     if(error) return res.status(400).json({message:error.details[0].message})

     const {email,password} = req.body;

     const user = await UserModel.findOne({ email });

     if(user && (await bcrypt.compare(password, user.password))){
         const token = jwt.sign(
             { user_id: user.user_id, email,name:user.name},
             process.env.JWT_KEY,
         )
         user.token = token;

         return res.status(200).json({
                name:user.name,
                email:user.email,
                token:token
            })
     }
     return res.status(400).send("Invalid Credentials");
 }
 catch(error){
    console.log(error)
    return res.status(500).json({message:"something went wrong, try again later!!"})
 }
});


module.exports = router;