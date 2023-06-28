import mongoose from "mongoose";
import Notice from "@/models/notice";
import connection from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE=async(request,{params})=>{
    connection();
    const id = params.id;
    try {
        const res = await Notice.findByIdAndDelete({_id:id})
        // const sendData = await 
        return NextResponse.json("Notice deleted",{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse("Server Error",{status:500});
    }
}

export const PUT=async(request,{params})=>{
    connection();
    const id = params.id;
    try {
        const {editNotice} = await request.json();
        const res = await Notice.findByIdAndUpdate({_id:id},{notice:editNotice},{new:true});
        return NextResponse.json({res},{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse("Server Error",{status:500});
    }
}

