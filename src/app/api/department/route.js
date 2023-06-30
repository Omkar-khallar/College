import mongoose from "mongoose";
import connection from "@/utils/db";
import Department from "@/models/department";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
    try {
        connection();
        const {departmentName,branchName} = await request.json();
        const departmentExist = await Department.findOne({department:departmentName});
        if(departmentExist){
            const newDepartment = await Department.findOneAndUpdate({department:departmentName},{$addToSet:{branch:branchName}},{new:true});
            return NextResponse.json({newDepartment},{status:200});
        }else{
            const newDepartment = new Department({department:departmentName,branch:branchName})
            const savedDepartment = await newDepartment.save();
            return NextResponse.json({savedDepartment},{status:200});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}

export const GET = async(request)=>{
    try {
        connection();
        const departments = await Department.find();
        return NextResponse.json({departments},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error",{status:500});
    }
}