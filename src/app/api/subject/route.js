import connection from "@/utils/db";
import mongoose from "mongoose";
import Subject from "@/models/subject";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
    connection();
    try {
        const {createSubject,branch,course} = await request.json();
        const subjectExist = await Subject.findOne({name:createSubject});
        if(subjectExist){
            return NextResponse.json("Subject Already exist",{status:401});
        }
        const data = new Subject({name:createSubject,branch,course});
        const savedData = await data.save();
        return NextResponse.json({savedData},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}
