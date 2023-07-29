// "use client";
// import { useSession } from "next-auth/react";
// import React from "react";

// // let data={
// //   name:"",
// //   email:"",
// //   course:"",
// //   section:"",
// //   year:"",
// //   semester:"",
// //   rollno:"",
// //   dob:"",
// //   phone:"",
// //   role:"",
// //   statuss:"",
// // }

// let name;
// let email;
// let course;
// let section;
// let year;
// let semester;
// let rollno;
// let dob;
// let phone;
// let role;
// let statuss;

// const user = () => {
//   const { data: session, status } = useSession();
//   if (session?.user?.role == "Student") {
//     name = session?.user?.name;
//     email = session?.user?.email;
//     course = session?.user?.course;
//     role = session?.user?.role;
//     section = session?.user?.section;
//     year = session?.user?.year;
//     semester = session?.user?.semester;
//     rollno = session?.user?.rollno;
//     dob = session?.user?.dob;
//     phone = session?.user?.phone;
//     statuss = status;
//   } else {
//     name = session?.user?.name;
//   email = session?.user?.email;
//   course = session?.user?.course;
//   role = session?.user?.role;
//   dob = session?.user?.dob;
//   phone = session?.user?.phone;
//   statuss = status;
//   }
//   // name = session?.user?.name;
//   // email = session?.user?.email;
//   // course = session?.user?.course;
//   // role = session?.user?.role;
//   // role == "Student" &&
//   //   ((section = session?.user?.section),
//   //   (year = session?.user?.year),
//   //   (semester = session?.user?.semester),
//   //   (rollno = session?.user?.rollno));
//   // dob = session?.user?.dob;
//   // phone = session?.user?.phone;
//   // statuss = status;

//   return <div>user</div>;
// };

// export default user;
// // if(role == "Student"){
//   export { name,email,course,role,section,year,semester,rollno,dob,phone,statuss };
// // }
