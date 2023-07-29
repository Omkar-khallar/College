'use client'
import { useContext, useState } from "react";
import styles from "./register.module.css";
import Buttons from "@/components/Button/Buttons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToogleContext } from "@/store/context";

const Register = () => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const {toogle} = useContext(ToogleContext);
  const {data:session,status} = useSession();
  const Router = useRouter();

    const role = session?.user?.role;

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        const name = e.target[0].value;
        const email = e.target[1].value;
        const course = e.target[2].value;
        const branch = e.target[3].value;
        const section = e.target[4].value;
        const year = e.target[5].value;
        const semester = e.target[6].value;
        const rollno = e.target[7].value;
        const dob = e.target[8].value;
        const phone = e.target[9].value;
        const role = e.target[10].value;
        const password = e.target[11].value;
        console.log({name,email,course,section,year,semester,rollno,dob,phone,role,password,branch});
        const UserDetail=JSON.stringify({name,email,course,section,year,semester,rollno,dob,phone,role,password,branch});
        const res = await axios.post(`${URL}/api/auth/register`,UserDetail);
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
        const branch = e.target[3].value;
        const dob = e.target[4].value;
        const phone = e.target[5].value;
        const role = e.target[6].value;
        const password = e.target[7].value;
        const UserDetail=JSON.stringify({name,email,course,dob,phone,role,password,branch});
        const res = await axios.post(`${URL}/api/auth/registerteacher`,UserDetail);
        res.status == 200 && alert("User Created")
      } catch (error) {
          console.log(error);
          error.response.status == 400 && alert("User Already Exist");
          error.response.status == 500 && alert("Not created");
      }
    }


status === "unauthenticated" && Router.push("/auth/login")
role === "Student" && Router.push("/");
  return (
    <>
      <div className={ toogle === true ? styles.containerExpand :styles.container}>
        {status === "authenticated" && 
        <div className={styles.formOuter}>
            <h2 className={styles.heading}>{role === "Teacher" && "Student"}{role === "Hod" && "Teacher"}{role === "Dean" && "Hod"} Register</h2>
          <form action="" onSubmit={role == "Teacher" ? handleSubmit : handleSubmitTeacher} className={styles.form}>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Name*</label>
              <input type="text" name="name" id=""  className={styles.input} required />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Email*</label>
              <input type="email" name="email" id=""  className={styles.input} required />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Course*</label>
              <select  className={styles.input}  name="course" id="" label="Course" required>
                <option value="" disabled>Chose a course</option>
                <option value="Btech">Btech</option>
                <option value="Medical">Medical</option>
                <option value="Non medical">Non medical</option>
              </select>
            </div>

            
              <div className={styles.inputBox}>
                <label htmlFor={styles.lable}>Branch*</label>
                <select className={styles.input}  name="branch" id="" label="Course" required>
                  <option value="" disabled>Chose a course</option>
                  <option value="Cse">Cse</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>
            
            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Section*</label>
              <select className={styles.input}  name="section" id="" label="Course" required>
                <option value="" disabled>Chose section</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            }
            
            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>year*</label>
              <select className={styles.input}  name="year" id="" label="Course" required>
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
              <select className={styles.input}  name="semester" id="" label="Course" required>
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
              <input type="text" name="rollno"  id="" className={styles.input} required />
            </div>}

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>dob*</label>
              <input type="date" name="dob" id=""  className={styles.input} required />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Phone No*</label>
              <input type="text" name="phone" id=""  className={styles.input} required />
            </div>

            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Role</label>
              <input type="text" value="Student" name="role" id=""  className={styles.input} required />
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
              <input type="password" name="password" id=""  className={styles.input} required />
            </div>

            <div className={styles.buttoncontainer}>
              <input className={styles.button} type="submit" value="SUBMIT" />
            </div>

          </form>
        </div>
         }
      </div>
    </>
  );
};

export default Register;
