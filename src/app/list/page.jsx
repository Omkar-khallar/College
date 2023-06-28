'use client'
import React, { useEffect, useState } from 'react';
import styles from "./list.module.css"
import Link from 'next/link';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const page = () => {

    const [classes,setClasses] = useState([]);

    const {data:session,status} = useSession();
    const id = session?.user?._id;
    const course = session?.user?.course;
    const role = session?.user?.role;

    role === "Teacher" && useEffect(()=>{
        const getData=async()=>{
            try {
                const res = await axios.get(`http://localhost:3000/api/list/list/${id}`);
                console.log(typeof res.data);
                setClasses(res.data.class)
            } catch (error) {
                console.log(error);
                alert('error');
            }
        }
         id && getData();
    },[id])


  return (
    <div className={styles.container}>
        <h2 className={styles.heading}>{role === "Teacher" ? "CLASSES": role === "Hod" ? "BRANCHES" : role === "Dean" && "Department"}</h2>
        {/* {loading === true ? "Loading...": */}
        <div className={styles.inner}>
            {classes?.map((item,i)=> 
                <div key={i} className={styles.box}>
                    <div className={styles.classDetail}>
                        <p className={styles.index}>{i+1}.</p>
                        <p className={styles.courseName}>{course}</p>
                        <p className={styles.BranchName}>{item.split("|")[0]}</p>
                        <p className={styles.semester}>{item.split("|")[1]} Semester</p>
                        <p className={styles.section}>{item.split("|")[2]} Section</p>
                    </div>
                    <div className={styles.visit}>
                        <Link href={`/list/${course}=${item.split("|")[0]}=${item.split("|")[1]}=${item.split("|")[2]}`} className={styles.link}>Show <KeyboardArrowRightRoundedIcon className={styles.icon} /></Link>
                    </div>
                </div>
            )}
        </div>
        {/* } */}
        
    </div>
  )
}

export default page