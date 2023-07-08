import connection from "@/utils/db";
import User from "@/models/user";
import Attandance from "@/models/attandance";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    connection();
    const { subject } = params;
    const branch = subject.split("=")[0];
    const semester = subject.split("=")[1];
    const section = subject.split("=")[2];
    const subjects = subject.split("=")[3];
    console.log(branch,semester,section,subjects);

    const attandanceData = await Attandance.find({branch,semester,section,subject:subjects});

    return NextResponse.json({ attandanceData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Server Error", { status: 500 });
  }
};
