import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name:{
        type:String
    },
    videos:{
        type:[String],
        default:[]
    },
    course:{
        type:String
    },
    branch:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.models.Subject || mongoose.model("Subject",subjectSchema);