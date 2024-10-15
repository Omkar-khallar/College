import connection from "@/utils/db";
import User from "@/models/user";
import Attandance from "@/models/attandance";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    connection();
    const { id } = params;
    const currentUser = await User.findById({ _id: id });

    const {course,section,branch,semester} = currentUser;

    const subjects = currentUser.subject;
    // console.log("Current User Subjects: ",subjects);
    
    let attandanceData = [];

    for (let i = 0; i < subjects.length; i++) {

      let attandanceObject = {
        subject: "",
        attand: 0,
        absent:0,
        total: 0,
        per:0,
        id:0
      };

      const currentAttandance = await Attandance.find({
        subject: subjects[i],
        course: course,
        section: section,
        branch:branch,
        semester:semester,
        attandance:{$elemMatch:{$eq:id}}
      });

      if(currentAttandance.length === 0) {
        continue;
      }

      const currentAttandanceTotal = await Attandance.find({
        subject: subjects[i],
        course: currentUser.course,
        section: currentUser.section,
        branch:currentUser.branch,
        semester:currentUser.semester,
      });
      
      attandanceObject.subject = currentAttandance[0]?.subject;
      attandanceObject.attand = currentAttandance?.length;
      attandanceObject.absent = (currentAttandanceTotal?.length - currentAttandance?.length);
      attandanceObject.total = currentAttandanceTotal?.length;
      attandanceObject.per = ((attandanceObject.attand/attandanceObject.total)*100).toFixed(2);
      attandanceObject.id = i;
      attandanceData.push(attandanceObject);
    }
    console.log("attandanceData [ARRAY:] : ",attandanceData);

    return NextResponse.json({attandanceData},{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json("Server Error", { status: 500 });
  }
};
