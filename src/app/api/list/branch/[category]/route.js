import connection from "@/utils/db";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(request,{params})=>{
    const course = params.category.split("=")[0];
    const branch = params.category.split("=")[1];
    console.log(course,branch);
    connection();
    try {
        const TeacherList = await User.find({role:"Teacher",course,branch});
        console.log(TeacherList);
        return NextResponse.json(TeacherList,{status:200});
    } catch (error) {
        console.log(error)
        return new NextResponse("Server error",{status:500});
    }
}