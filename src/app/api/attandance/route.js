import mongoose from "mongoose";
import Attandance from "@/models/attandance";
import connection from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
    connection();
    try {
        const {course,date,branch,semester,section,inputs,id} = await request.json();
        const newAttandance = new Attandance({date,course,branch,semester,section,teacherid:id,attandance:inputs});
        const savedAttandance = await newAttandance.save();
        return NextResponse.json({savedAttandance},{status:200});
        console.log(savedAttandance);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}

// ['64a0116dd8a5b953f43408a0', '64a125e081dc80d2a572a12d']
// [ '64a0116dd8a5b953f43408a0', '64a125e081dc80d2a572a12d' ]
// [ '64a0116dd8a5b953f43408a0' ]
// [ '64a125e081dc80d2a572a12d' ]