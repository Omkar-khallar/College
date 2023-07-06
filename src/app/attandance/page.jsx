"use client"
import React, { useEffect, useState } from 'react'
import styles from "./attandance.module.css";
import Link from 'next/link';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = () => {

    const [classes,setClasses] = useState([])

    const {data:session,status} = useSession();
    const Router = useRouter();

    const role = session?.user?.role;
    const course = session?.user?.course;

    useEffect(()=>{
        session?.user?.class && setClasses(session?.user?.class);
    },[session?.user])
    // setClasses(session?.user?.class);

    role === "Student" && Router?.push("/attandance/show");



  return (
    <div className={styles.container}>
        <div className={styles.createContainer}>
            <h2 className={styles.heading}>CLASSES</h2>
        </div>
        <div className={styles.inner}>
            {classes?.map((item,i)=>
            <div  className={styles.box}>
                <div className={styles.classDetail}>
                    <p className={styles.index}>{i+1}.</p>
                    <p className={styles.courseName}>{course}</p>
                    <p className={styles.BranchName}>{item.split("|")[0]}</p>
                    <p className={styles.semester}>{item.split("|")[1]} Semester</p>
                    <p className={styles.section}>{item.split("|")[2]} Section</p>
                </div>
                <div className={styles.visit}>
                    <Link href={`/attandance/teacher/${course}=${item.split("|")[0]}=${item.split("|")[1]}=${item.split("|")[2]}`} className={styles.link}>Show <KeyboardArrowRightRoundedIcon className={styles.icon} /></Link>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default page