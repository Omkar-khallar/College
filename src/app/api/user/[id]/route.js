import mongoose from "mongoose";
import User from "@/models/user";
import connection from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async(request,{params})=>{
  try {
      connection();
      const {id} = params;
      const userData = await User.findById({_id:id});
        console.log(userData);
      return NextResponse.json({userData},{status:200})
  } catch (error) {
    console.log(error);
    return NextResponse.json("Server Error",{status:500})
  }
}
