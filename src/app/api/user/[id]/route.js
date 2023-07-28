import User from "@/models/user";
import connection from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async(request,{params})=>{
  try {
      connection();
      const {id} = params;
      console.log("UserId",id)
      const userData = await User.findById({_id:id});
      return NextResponse.json({userData},{status:200})
  } catch (error) {
    console.log(error);
    return NextResponse.json("Server Error",{status:500})
  }
}

export const DELETE = async(request,{params})=>{
  try {
    const {id} = params;
    console.log(id);
    await User.findByIdAndDelete({_id:id});
    return NextResponse.json("User Deleted",{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json("Server Error",{status:500});
  }
}