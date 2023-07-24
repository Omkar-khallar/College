import connection from "@/utils/db";
import User from "@/models/user";
import Attandance from "@/models/attandance";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    connection();
    const { id } = params;
    const currentUser = await User.findById({ _id: id });
    const subjects = currentUser.subject;
    let attandanceData = [];
    for (let i = 0; i < subjects.length; i++) {
      let attandanceObject = {
        subject: "",
        attand: 0,
        total: 0,
        per:0,
        id:0
      };
      const currentAttandance = await Attandance.find({
        subject: subjects[i],
        course: currentUser.course,
        section: currentUser.section,
        branch:currentUser.branch,
        semester:currentUser.semester,
        attandance:{$elemMatch:{$eq:id}}
      });
      const currentAttandanceTotal = await Attandance.find({
        subject: subjects[i],
        course: currentUser.course,
        section: currentUser.section,
        branch:currentUser.branch,
        semester:currentUser.semester,
      });
      
      attandanceObject.subject = currentAttandance[0].subject;
      attandanceObject.attand = currentAttandance.length;
      attandanceObject.total = currentAttandanceTotal.length;
      attandanceObject.per = (attandanceObject.attand/attandanceObject.total)*100;
      attandanceObject.id = i;
      attandanceData.push(attandanceObject);
    }

    return NextResponse.json({attandanceData},{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json("Server Error", { status: 500 });
  }
};
