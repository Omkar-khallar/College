'use client'
import React from 'react';
import Link from 'next/link';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import styles from "./card.module.css";

const Card = ({subjects}) => {
  return (
    <>
    {subjects?.map((item)=>
        <div key={item._id} className={styles.box}>
            <p className={styles.subjectName}>{item.name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>{item.videos.length}</p>
            </div>
            <Link className={styles.link} href={`/videolist/${item._id}`}><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
    )}
    </>
  )
}

export default Card