import connection from "@/utils/db";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(request)=>{
    connection();
    try {
        const StudentList = await User.find({role:"Student"});
        return NextResponse.json(StudentList,{status:200});
    } catch (error) {
        console.log(error)
        return new NextResponse("Server error",{status:500});
    }
}