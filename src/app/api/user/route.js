import mongoose from "mongoose";
import User from "@/models/user";
import connection from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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


    if (role == "Student") {
      const userdata = await User.findById({ _id: id });
      if (userdata.password === password) {
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
        const hashPass = await bcrypt.hash(password, 10);
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
            password: hashPass,
            rollno,
            img: imageupload,
          },
          { new: true }
        );
        return NextResponse.json({ updatedUser }, { status: 200 });
      }
    } else {
      const userdata = await User.findById({ _id: id });
      if (userdata.password === password) {
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
      } else {
        const hashPass = await bcrypt.hash(password, 10);
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
            password: hashPass,
            img: imageupload,
          },
          { new: true }
        );
        return NextResponse.json({ updatedUser }, { status: 200 });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("server error", { status: 500 });
  }
};
