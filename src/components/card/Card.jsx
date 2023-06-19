'use client'
import React from 'react';
import Link from 'next/link';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import styles from "./card.module.css";

const Card = ({name}) => {
  return (
    <>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
        <div className={styles.box}>
            <p className={styles.subjectName}>{name}</p>
            <div className={styles.videos}>
                <p className={styles.text}>Videos</p>
                <p className={styles.no}>5</p>
            </div>
            <Link className={styles.link} href="/videolist"><RemoveRedEyeRoundedIcon sx={{ fontSize: 20 }}/>View</Link>
        </div>
    </>
  )
}

export default Card