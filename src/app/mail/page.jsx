"use client"
import React from "react";
import styles from "./mail.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const {data:session,status} = useSession();
    const Router = useRouter();

  if(status === ("unauthenticated" || "loading")){
    Router?.push("/auth/login");
  }
  return (
    <>
      <div className={styles.container}>
        {status === ("unauthenticated" || "loading") && " "}
        {status === "authenticated"  && (<>
          <div className={styles.headingcontainer}>
          <h3 className={styles.heading}>Mail</h3>
        </div>
        <div className={styles.innercontainer}>
          <form className={styles.form}>
            <div className={styles.inputbox}>
              <label  htmlFor="name">Name*</label>
              <input  className={styles.input} type="text" name="name" id="" />
            </div>
            <div className={styles.inputbox}>
              <label htmlFor="name">Email*</label>
              <input className={styles.input} type="email" name="email" id="" />
            </div>
            <div className={styles.inputbox}>
              <label htmlFor="name">Subject*</label>
              <input className={styles.input} type="text" name="subject" id="" />
            </div>
            <div className={styles.textareabox}>
              <label htmlFor="message">Message*</label>
              <textarea className={styles.textarea} name="message" id="" cols="30" rows="10"></textarea>
            </div>
            <div className={styles.buttoncontainer}>
              <input className={styles.button} type="submit" value="SEND"/>
            </div>
          </form>
        </div>
          </>
          )}
      </div>
    </>
  );
};

export default page;
