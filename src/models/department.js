import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    department:{
        type:String
    },
    branch:{
        type:[String],
        default:[]
    }
},{timestamps:true});

module.exports = mongoose.models.Department || mongoose.model("Department",departmentSchema);