"use client";
import React, { useContext, useState } from "react";
import styles from "./mail.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Notification from "../Notification";
import { toast } from "react-toastify";
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const page = () => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const { toogle } = useContext(ToogleContext);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const Router = useRouter();

  status === "unauthenticated" && Router?.push("/auth/login");

  // SENDING MAIL -------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mailData = JSON.stringify({ from, to, subject, message });
      const res = await axios.post(`${URL}/api/mail`, mailData);

      console.log(res);

      setFrom("");
      setTo("");
      setSubject("");
      setMessage("");
      toast.success("Mail send SuccessFully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Mail Not send ⚠", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  role != "Dean" && Router.push("/")

  return (
    <>
    {role === "Dean" &&
      <div className={toogle === true ? "containerExpand" : styles.container}>
        {status === "loading" && <LoadingScreen/>}
        {status === "authenticated" && (
          <>
            <div className={styles.headingcontainer}>
              <h3 className={styles.heading}>Mail</h3>
            </div>
            <div className={styles.innercontainer}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputbox}>
                  <label htmlFor="name">From*</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="name"
                    id=""
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
                <div className={styles.inputbox}>
                  <label htmlFor="name">To*</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    id=""
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
                <div className={styles.inputbox}>
                  <label htmlFor="name">Subject*</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="subject"
                    id=""
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className={styles.textareabox}>
                  <label htmlFor="message">Message*</label>
                  <textarea
                    className={styles.textarea}
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className={styles.buttoncontainer}>
                  <input className={styles.button} type="submit" value="SEND" />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
}
    </>
  );
};

export default page;
