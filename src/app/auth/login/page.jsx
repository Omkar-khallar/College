"use client"
import React, { useContext, useState } from "react";
import styles from "./login.module.css";
import Buttons from "@/components/Button/Buttons";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { signIn, useSession } from "next-auth/react";
import {useRouter} from "next/navigation";
import { ToogleContext } from "@/store/context";

const Login = () => {
  const {toogle} = useContext(ToogleContext);
  const [loading,setloading] = useState(false);

    const [show,setshow]=useState(false)
    const [password,setpassword]=useState("");

    const Router = useRouter();

    const { data: session, status } = useSession();
    const handleSubmit = async(e)=>{
      setloading(true);
      e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const sign = await signIn("credentials",{email,password});
        console.log(sign);
        setloading(false);
      }

      if(status == "authenticated"){
        Router?.push("/");
      }

  return (
    <>
      <div className={ toogle === true ? styles.containerExpand :styles.container}>
      {status === ("unauthenticated" || "loading") &&
        <div className={styles.formOuter}>
            <h2 className={styles.heading}>Login</h2>
          <form action="" onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>Email*</label>
              <input type="email" name="email" id="" className={styles.input} />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor={styles.lable}>password*</label>
              <input type={show == false? "password":"text"} value={password} onChange={(e)=>setpassword(e.target.value)} name="password" id="" className={styles.input} />
            </div>

            <div  className={password?styles.buttoncontainer:styles.button1}>{password ?
            <p style={{cursor:"pointer"}} onClick={()=> setshow(!show)}>
                {show == false?<VisibilityRoundedIcon/>:<VisibilityOffRoundedIcon/>}
            </p>
            :" "}
            <input disabled={loading} className={styles.button} type="submit" value="SUBMIT" />
            </div>
          </form>
        </div> }
      </div>
    </>
  );
  
};

export default Login;
