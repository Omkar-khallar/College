import mongoose from "mongoose";

const attandanceSchema = new mongoose.Schema({
    course:{
        type:String
    },
    branch:{
        type:String
    },
    semester:{
        type:String
    },
    section:{
        type:String
    },
    date:{
        type:Date
    },
    attandance:{
        type:[String],
        default:[]
    },
    teacherid:{
        type:String
    }
},{timestamps:true});


module.exports = mongoose.models.Attandance || mongoose.model("Attandance",attandanceSchema);