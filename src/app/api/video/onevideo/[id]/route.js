import connection from "@/utils/db";
import mongoose from "mongoose";
import Video from "@/models/video";
import { NextResponse } from "next/server";

export const GET = async(request,{params})=>{
    connection();
    try {
        const {id} = params;
        const video = await Video.findById({_id:id});
        return NextResponse.json({video},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error ",{status:500});
    }
}