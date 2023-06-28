import mongoose from "mongoose";
import Notice from "@/models/notice";
import connection from "@/utils/db";
import { NextResponse } from "next/server";


export const POST=async(request)=>{
    connection();
    try {
        const {notice,id} = await request.json();
        console.log(notice);
        const noticeUpload = new Notice({notice,userId:id});
        const savedNotice = await noticeUpload.save();
        return NextResponse.json({savedNotice},{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse("Server Error",{status:500});
    }
}

export const GET=async(request)=>{
    connection();
    try {
        const notices = await Notice.find()
        // const sendData = await 
        return NextResponse.json({notices},{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse("Server Error",{status:500});
    }
}
