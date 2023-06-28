import nodemailer from "nodemailer";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const transporter = await nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:process.env.MAIL,
        pass:process.env.PASS
    }
})


async function main({from,to,subject,message}) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `<${from}>`, // sender address
      to: `${to}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `${message}`, // plain text body
      html: `<b>${message}</b>`, // html body
    });
    return info;
}

export const POST= async(request)=>{
    try {
        const {from,to,subject,message} = await request.json();
        const res = await main({from,to,subject,message});
        return NextResponse.json("MAIL SEND",{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse.json("Server error",{status:500})
    }
}

