import mongoose from "mongoose";
import User from "@/models/user";
import connection from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  connection();
  try {
    const data = await request.json();
    const {
      name,
      email,
      course,
      section,
      year,
      semester,
      rollno,
      dob,
      phone,
      role,
      password,
    } = data;
    const userExist = await User.findOne({ email });
    const rollNoExist = await User.findOne({ rollno });
    const hashPassword = await bcrypt.hash(password,10)
    if (!userExist && !rollNoExist) {
      const newUser = new User({name,email,course,section,year,semester,rollno,dob,phone,role,password:hashPassword});
      const savedUser = await newUser.save();
      return new NextResponse({ savedUser }, { status: 200 });
    } else if (userExist) {
      console.log(userExist);
      return new NextResponse("User already exist", { status: 400 });
    } else if (rollNoExist) {
        return new NextResponse("Rollno already exist", { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("server problem", { status: 500 });
  }
};
