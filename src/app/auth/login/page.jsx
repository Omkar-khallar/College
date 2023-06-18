"use client"
import React, { useState } from "react";
import styles from "./login.module.css";
import Buttons from "@/components/Button/Buttons";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const page = () => {

    const [show,setshow]=useState(false)
    const [password,setpassword]=useState("")

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formOuter}>
            <h2 className={styles.heading}>Login</h2>
          <form action="" className={styles.form}>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Email*</label>
              <input type="email" name="email" id="" className={styles.input} />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>password*</label>
              <input type={show == false? "password":"text"} value={password} onChange={(e)=>setpassword(e.target.value)} name="password" id="" className={styles.input} />
            </div>

            <div  className={password?styles.button:styles.button1}>{password ?
            <p style={{cursor:"pointer"}} onClick={()=> setshow(!show)}>
                {show == false?<VisibilityRoundedIcon/>:<VisibilityOffRoundedIcon/>}
            </p>
            :" "}
            <Buttons style={{float:"right"}} text={"Submit"}/>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default page;
