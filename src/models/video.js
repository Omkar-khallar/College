import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    subject:{
        type:String
    },
    title:{
        type:String
    },
    desc:{
        type:String
    },
    thumbnail:{
        type:String
    },
    video:{
        type:String
    },
    username:{
        type:String
    },
    userid:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.models.Videos || mongoose.model("Videos",videoSchema);