import mongoose from "mongoose";
import Attandance from "@/models/attandance";
import connection from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
    connection();
    try {
        const {course,date,branch,semester,section,inputs,id,subject} = await request.json();
        const newAttandance = new Attandance({date,course,branch,semester,section,teacherid:id,attandance:inputs,subject});
        const savedAttandance = await newAttandance.save();
        return NextResponse.json({savedAttandance},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}
