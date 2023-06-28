"use client";
import React, { useEffect, useState } from "react";
import styles from "./user.module.css";
import axios from "axios";
import { CircularProgress, TextField } from "@mui/material";
// import Notification from "@/app/Notification";
import { toast } from "react-toastify";

const page = ({ params }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [rollno, setRollno] = useState();
  const [phone, setPhone] = useState();

  const [loading, setloading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // GETTING THE DETAIL OF USER FOR UPDATE
  useEffect(() => {
    const getUser = async () => {
      try {
        setloading(true);
        const res = await axios.get(
          `http://localhost:3000/api/list/list/${params.id}`
        );
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
      const res = await axios.put(
        `http://localhost:3000/api/list/list/${params.id}`,
        { name, email, rollno, phone }
      );
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
    <div className={styles.container}>
      {loading === true ? (
        <div className={styles.loadingcontainer}>
          <CircularProgress />
        </div>
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
            <TextField 
              className={styles.input}
              onChange={(e) => setRollno(e.target.value)}
              label="Rollno"
              value={rollno}
              id="rollno"
              variant="outlined"
            />
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
