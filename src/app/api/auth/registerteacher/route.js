import mongoose from "mongoose";
import User from "@/models/user";
import connection from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async(request)=>{
    connection();
    try {
        const data = await request.json();
        const {name,email,course,dob,phone,role,password,branch} = data;
        const userExist = await User.findOne({email});
        const hashPassword = await bcrypt.hash(password,10);
        if(!userExist){
            const newUser = new User({name,email,course,dob,phone,branch,role,password:hashPassword});
            const savedUser = await newUser.save();
            return new NextResponse({savedUser},{status:200});
        } else{
            console.log(userExist);
            return new NextResponse("User already exist",{status:400});
        }
    } catch (error) {
        console.log(error);
        return new NextResponse("server problem",{status:500})
    }
}