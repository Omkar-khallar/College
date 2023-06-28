import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    notice:{
        type:String
    },
    userId:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.models.Notice || mongoose.model("Notice",noticeSchema);

