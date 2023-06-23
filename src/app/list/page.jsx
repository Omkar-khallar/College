"use client"
import React, { useEffect, useState } from 'react';
import styles from "./list.module.css"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'


const page =() => {

  const {data:session,status} = useSession();
  const Router = useRouter();
 
  if(status === ("unauthenticated" || "loading")){
    Router?.push("/auth/login");
  }

  const role = session?.user?.role;

  return (
    <>
      <div className={styles.container}>
        {status === ("unauthenticated" || "loading") && " " }
        {status === "authenticated" && 
        <div className={styles.innercontainer}>
          <div className={styles.tablewrapper}>
            <div className={styles.headingcontainer}>
              <h3 className={styles.heading}>{role === "Teacher" ? "Student" : role == "Hod" ? "Teacher" :role == "Dean" ? "Department" : " "} List</h3>
            </div>
            <table className={styles.table}>
              <thead className={styles.column}>
                <th className={styles.columndata}>S.no</th>
                <th className={styles.columndata}>Name</th>
                <th className={styles.columndata}>Rollno</th>
                <th className={styles.columndata}>Email</th>
                <th className={styles.columndata}>Phone</th>
                <th className={styles.columndata}>Operation</th>
              </thead>
              
                {/* {userlist.map((user)=>(
                <tr className={styles.row}> 
                  <td className={styles.rowdata}>1</td>
                  <td className={styles.rowdata}>{user.name}</td>
                  <td className={styles.rowdata}>s</td>
                  <td className={styles.rowdata}>d</td>
                  <td className={styles.rowdata}>f</td>
                  <td className={styles.rowdata}>
                    <div className={styles.buttoncontainer}>
                    <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                    <Button className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
                    </div>
                  </td>
              </tr>
               ))} */}
              
              {/* <tr className={styles.row}>
                <td className={styles.rowdata}>1</td>
                <td className={styles.rowdata}>Omkar</td>
                <td className={styles.rowdata}>12201305</td>
                <td className={styles.rowdata}>omkarkhallar@gmail.com</td>
                <td className={styles.rowdata}>8872432537</td>
                <td className={styles.rowdata}>
                  <div className={styles.buttoncontainer}>
                  <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                  <Button className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
                  </div>
                </td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.rowdata}>1</td>
                <td className={styles.rowdata}>Omkar</td>
                <td className={styles.rowdata}>12201305</td>
                <td className={styles.rowdata}>omkarkhallar@gmail.com</td>
                <td className={styles.rowdata}>8872432537</td>
                <td className={styles.rowdata}>
                  <div className={styles.buttoncontainer}>
                  <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                  <Button className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
                  </div>
                </td>
              </tr> */}
            </table>
          </div>
        </div>
    }
      </div>
    </>
  )
}

export default page