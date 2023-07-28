"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./user.module.css";
import axios from "axios";
import { CircularProgress, TextField } from "@mui/material";
// import Notification from "@/app/Notification";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const page = ({ params }) => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const {toogle} = useContext(ToogleContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [rollno, setRollno] = useState();
  const [phone, setPhone] = useState();

  const [loading, setloading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const {data:session,status} = useSession();
  const role = session?.user?.role;

  // GETTING THE DETAIL OF USER FOR UPDATE
  useEffect(() => {

    const getUser = async () => {
      try {
        setloading(true);
        const res = await axios.get(`${URL}/api/list/list/${params.id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setRollno(res.data.rollno);
        setPhone(res.data.phone);
        setloading(false);
      } catch (error) {
        console.log(error);
        alert("error");
      
      }
    };
    getUser();
  }, [params.id]);


  // UPDATING THE DETAILS OF USER
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      console.log(name, email, rollno, phone);
      const res = await axios.put(`${URL}/api/list/list/${params.id}`,{ name, email, rollno, phone });
      setName(res.data.name);
      setEmail(res.data.email);
      setRollno(res.data.rollno);
      setPhone(res.data.phone);
      setUpdating(false);
      toast.success('User Updated SuccessFully', {
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
      setUpdating(false);

      toast.error('User is Not Updated', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
  
    }
  };

  

  return (
    <div className={ toogle === true ? "containerExpand" :styles.container}>
      {loading === true ? (
        <LoadingScreen/>
      ) : (
        <div className={styles.formOuter}>
          
          <form onSubmit={handleSubmit} action="" className={styles.form}>
            <TextField 
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              value={name}
              id="name"
              variant="outlined"
            />
            <TextField 
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              value={email}
              id="email"
              variant="outlined"
            />
            {role === "Teacher" && 
            <TextField 
            className={styles.input}
            onChange={(e) => setRollno(e.target.value)}
            label="Rollno"
            value={rollno}
            id="rollno"
            variant="outlined"
            />
            }
            <TextField 
              className={styles.input}
              onChange={(e) => setPhone(e.target.value)}
              label="Phone"
              value={phone}
              id="phone"
              variant="outlined"
            />
            <div className={styles.buttoncontainer}>
              <input disabled={updating} type="submit" value="Update" className={styles.button} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
