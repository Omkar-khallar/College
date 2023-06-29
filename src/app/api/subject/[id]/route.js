import connection from "@/utils/db";
import mongoose from "mongoose";
import Subject from "@/models/subject";
import { NextResponse } from "next/server";
import User from "@/models/user";

export const GET = async(request,{params})=>{
    connection();
    try {
        const {id} = params;
        const userdata = await User.findById({_id:id});
        const {course,branch} = userdata;

        const subjects = await Subject.find({branch,course});
        return NextResponse.json({subjects},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}