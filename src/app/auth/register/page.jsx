import React from "react";
import styles from "./register.module.css";
import Buttons from "@/components/Button/Buttons";

const page = () => {

    const role = "Teacher";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formOuter}>
            <h2 className={styles.heading}>{role === "Teacher" && "Student"}{role === "Hod" && "Teacher"}{role === "Dean" && "Hod"} Register</h2>
          <form action="" className={styles.form}>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Name*</label>
              <input type="text" name="name" id="" className={styles.input}  />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Last Name*</label>
              <input type="text" name="lname" id="" className={styles.input} />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Email*</label>
              <input type="email" name="email" id="" className={styles.input} />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Course*</label>
              <select  className={styles.input} name="Course" id="" label="Course">
                <option value="" disabled>Chose a course</option>
                <option value="Btect">Btech</option>
                <option value="Btect">Medical</option>
                <option value="Btect">Non medical</option>
              </select>
            </div>
            
            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Section*</label>
              <select className={styles.input} name="Course" id="" label="Course">
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
              <select className={styles.input} name="Course" id="" label="Course">
                <option value="" disabled>Chose year</option>
                <option value="c-1">c-1,2</option>
                <option value="c-2">c-3,4</option>
                <option value="c-3">c-5,6</option>
                <option value="c-4">c-7,8</option>
              </select>
            </div>
            }
            
            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>semester*</label>
              <select className={styles.input} name="Course" id="" label="Course">
                <option value="" disabled>Chose semester</option>
                <option value="c-1">c-1,2</option>
                <option value="c-2">c-3,4</option>
                <option value="c-3">c-5,6</option>
                <option value="c-4">c-7,8</option>
              </select>
            </div>}

            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Rollno*</label>
              <input type="text" name="rollno" id="" className={styles.input} />
            </div>}

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>dob*</label>
              <input type="date" name="dob" id="" className={styles.input} />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Phone No*</label>
              <input type="text" name="phoneno" id="" className={styles.input} />
            </div>

            {role === "Teacher" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Role</label>
              <input type="text" value="Student" name="role" id="" className={styles.input} />
            </div>}

            {role === "Hod" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Role</label>
              <input type="text" value="Teacher" name="role" id="" className={styles.input} />
            </div>}

            {role === "Dean" &&
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Role</label>
              <input type="text" value="Hod" name="role" id="" className={styles.input} />
            </div>}

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>password*</label>
              <input type="password" name="password" id="" className={styles.input} />
            </div>

            <div className={styles.button}>
            <Buttons text={"Submit"}/>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default page;
