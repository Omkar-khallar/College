import mongoose from "mongoose";
import User from "@/models/user";
import connection from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  try {
    connection();
    const {
      name,
      email,
      course,
      branch,
      section,
      semester,
      phone,
      dob,
      comaclasses,
      comasubjects,
      password,
      rollno,
      imageupload,
      role,
      id,
    } = await request.json();
    
    console.log(comaclasses,comasubjects);

    if (role == "Student") {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          name,
          email,
          course,
          branch,
          section,
          semester,
          phone,
          dob,
          class: comaclasses,
          subject: comasubjects,
          password,
          rollno,
          img: imageupload,
        },
        { new: true }
      );
      return NextResponse.json({ updatedUser }, { status: 200 });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          name,
          email,
          course,
          branch,
          phone,
          dob,
          class: comaclasses,
          subject: comasubjects,
          password,
          img: imageupload,
        },
        { new: true }
      );
      return NextResponse.json({ updatedUser }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("server error", { status: 500 });
  }
};

