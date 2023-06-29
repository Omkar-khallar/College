import mongoose from "mongoose";
import connection from "@/utils/db";
import Video from "@/models/video";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
    connection();
    try {
        const data = await request.json();
        console.log("data",data);
        const {subject,title,desc,video,thumbnail}=data.inputs
        const {username,id} = data;
        const newVideo = new Video({subject,title,desc,video,thumbnail:thumbnail,username,userid:id});
        const savedVideo = await newVideo.save();
        return NextResponse.json(savedVideo,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server error",{status:500});
    }
}