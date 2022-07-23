const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel