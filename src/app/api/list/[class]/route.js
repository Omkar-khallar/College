import connection from "@/utils/db";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(request,{params})=>{
    const course = params.class.split("=")[0];
    const branch = params.class.split("=")[1];
    const semester = params.class.split("=")[2];
    const section = params.class.split("=")[3];
    connection();
    try {
        const StudentList = await User.find({role:"Student",course,branch,semester,section});
        console.log(StudentList);
        return NextResponse.json(StudentList,{status:200});
    } catch (error) {
        console.log(error)
        return new NextResponse("Server error",{status:500});
    }
}