const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        default: null
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:String,
    token:String
})

module.exports = mongoose.model("user",userSchema);