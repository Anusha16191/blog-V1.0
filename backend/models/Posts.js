const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    name:{
        type:String,
        required:true
    },

    postimg:{
        type:String,
        default:"default.jpg"
    },

    title: {
        type: String,
    },
    description:{
        type: String,
        required:true
    },
  
    timestamp:{
        type:Date,
        default:Date.now
    }

})

const postmodel = mongoose.model("posts", postSchema)

module.exports = postmodel