import connection from "@/utils/db";
import Video from "@/models/video";
import Subject from "@/models/subject";
import mongoose from "mongoose"; 
import { NextResponse } from "next/server";

export const GET = async(request,{params})=>{
    connection();
    try {
        const {id} = params;

        const subjects = await Subject.findById({_id:id});
        const subject = subjects.name;

        const videos = await Video.find({subject});
        
        return NextResponse.json({videos},{status:200});

    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}