import connection from "@/utils/db";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(request,{params})=>{
    const course = params.course;
    console.log(course);
    connection();
    try {
        const HodList = await User.find({role:"Hod",course});
        console.log(HodList);
        return NextResponse.json(HodList,{status:200});
    } catch (error) {
        console.log(error)
        return new NextResponse("Server error",{status:500});
    }
}