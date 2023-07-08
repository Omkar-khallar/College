"use client"
import React, { useEffect, useState } from "react";
import styles from "./attandance.module.css";
import { useSession } from "next-auth/react";
import getUser from "@/app/getUser";
import axios from "axios";

const page = () => {
  // USESESSION HOOK -----------------------
  const {data:session,status} = useSession();
  const id = session?.user?._id;

  // useSTATE HOOK ------------------------------
  const [userData,setUserData] = useState({});

  useEffect(()=>{
    const getUserData = async()=>{
      const datas = await getUser(id);
      setUserData(datas);
    }
    id && getUserData();
  },[id])

  useEffect(()=>{
    const getAttandance = async()=>{
      try {
        const res = await axios.get(`http://localhost:3000/api/attandance/${id}`);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    userData && getAttandance();
  },[userData]);


  return (
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <div className={styles.form} action="">
          <div className={styles.headingcontainer}>
            <h3 className={styles.heading}>Attandance Track</h3>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tablecolumn}>
                <th className={styles.tablecolumndata}>Subject</th>
                <th className={styles.tablecolumndata}>Lecture Attend</th>
                <th className={styles.tablecolumndata}>Lecture Absent</th>
                <th className={styles.tablecolumndata}>Percentage</th>
              </tr>
            </thead>

            <tr className={styles.tablerow}>
              <td className={styles.tablerowdata}>OS</td>
              <td className={styles.tablerowdata}>12</td>
              <td className={styles.tablerowdata}>10</td>
              <td
                // className={`${per < 75 ? styles.red : styles.green} ${
                //   styles.tablerowdata
                // } `}
              >
                {/* {per} */}
                80
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
