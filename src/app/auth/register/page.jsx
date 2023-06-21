'use client'
import React from "react";
import styles from "./register.module.css";
import Buttons from "@/components/Button/Buttons";
import axios from "axios";

const page = () => {

    const role = "Teacher";

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        const name = e.target[0].value;
        const email = e.target[1].value;
        const course = e.target[2].value;
        const section = e.target[3].value;
        const year = e.target[4].value;
        const semester = e.target[5].value;
        const rollno = e.target[6].value;
        const dob = e.target[7].value;
        const phone = e.target[8].value;
        const role = e.target[9].value;
        const password = e.target[10].value;
        const UserDetail=JSON.stringify({name,email,course,section,year,semester,rollno,dob,phone,role,password});
        const res = await axios.post("http://localhost:3000/api/auth/register",UserDetail);
        res.status == 200 && alert("User Created")
      } catch (error) {
        console.log(error);
        error.response.status == 400 && alert("User already created");
        error.response.status == 401 && alert("Rollno already created");
        error.response.status == 500 && alert("Not created");
      }
    }

    const handleSubmitTeacher = async(e)=>{
      e.preventDefault();
      try {
        const name = e.target[0].value;
        const email = e.target[1].value;
        const course = e.target[2].value;
        const dob = e.target[3].value;
        const phone = e.target[4].value;
        const role = e.target[5].value;
        const password = e.target[6].value;
        const UserDetail=JSON.stringify({name,email,course,dob,phone,role,password});
        res = await axios.post("http://localhost:3000/api/auth/registerteacher",UserDetail);
        res.status == 200 && alert("User Created")
      } catch (error) {
          // console.log(error);
          error.response.status == 400 && alert("User Already Exist");
          error.response.status == 500 && alert("Not created");
      }
    }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formOuter}>
            <h2 className={styles.heading}>{role === "Teacher" && "Student"}{role === "Hod" && "Teacher"}{role === "Dean" && "Hod"} Register</h2>
          <form action="" onSubmit={role == "Teacher" ? handleSubmit : handleSubmitTeacher} className={styles.form}>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Name*</label>
              <input type="text" name="name" id="" className={styles.input} required />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Email*</label>
              <input type="email" name="email" id="" className={styles.input} required />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Course*</label>
              <select  className={styles.input} name="course" id="" label="Course" required>
                <option value="" disabled>Chose a course</option>
                <option value="Btect">Btech</option>
                <option value="Btect">Medical</option>
                <option value="Btect">Non medical</option>
              </select>
            </div>
            
            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Section*</label>
              <select className={styles.input} name="section" id="" label="Course" required>
                <option value="" disabled>Chose section</option>
                <option value="c-1">c-1,2</option>
                <option value="c-2">c-3,4</option>
                <option value="c-3">c-5,6</option>
                <option value="c-4">c-7,8</option>
              </select>
            </div>
            }
            
            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>year*</label>
              <select className={styles.input} name="year" id="" label="Course" required>
                <option value="" disabled>Chose year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            }
            
            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>semester*</label>
              <select className={styles.input} name="semester" id="" label="Course" required>
                <option value="" disabled>Chose semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>}

            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Rollno*</label>
              <input type="text" name="rollno" id="" className={styles.input} required />
            </div>}

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>dob*</label>
              <input type="date" name="dob" id="" className={styles.input} required />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Phone No*</label>
              <input type="text" name="phone" id="" className={styles.input} required />
            </div>

            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Role</label>
              <input type="text" value="Student" name="role" id="" className={styles.input} required />
            </div>}

            {role === "Hod" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Role</label>
              <input type="text" value="Teacher" name="role" id="" className={styles.input} required />
            </div>}

            {role === "Dean" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Role</label>
              <input type="text" value="Hod" name="role" id="" className={styles.input} required />
            </div>}

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>password*</label>
              <input type="password" name="password" id="" className={styles.input} required />
            </div>

            <div className={styles.buttoncontainer}>
            {/* <Buttons text={"Submit"}/> */}
            <input className={styles.button} type="submit" value="SUBMIT" />
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default page;
