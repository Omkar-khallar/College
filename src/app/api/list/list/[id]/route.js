import User from "@/models/user";
import connection from "@/utils/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

connection();

export const GET=async(request,{params})=>{
    const {id} = params;
    
    try {
        const user = await User.findById({_id:id});
        return NextResponse.json(user,{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse(error,{status:500});
    }
}


export const PUT=async(request,{params})=>{
    const {id} = params;
    try {
        const {name,email,rollno,phone} = await request.json();
        const user = await User.findOneAndUpdate({_id:id},{name,email,rollno,phone},{new:true});
        const savedUser = await user.save();
        return NextResponse.json(savedUser,{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse(error,{status:500});
    }
}

export const DELETE=async(request,{params})=>{
    const {id} = params;
    try {
        await User.findByIdAndDelete({_id:id});
        return NextResponse.json('User Deleted',{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse(error,{status:500});
    }
}