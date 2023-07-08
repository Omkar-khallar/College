import mongoose from "mongoose";
import connection from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/user";

export const PUT = async(request)=>{
    connection();
    try {
        const {newClass,subject,id} = await request.json();
        
        const userData = await User.findByIdAndUpdate({_id:id},{
            $addToSet:{study:{class:newClass,subject:subject}}
        },{new:true});
        return NextResponse.json(userData,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}