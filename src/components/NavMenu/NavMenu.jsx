"use client"
import React from 'react'
import styles from "./navMenu.module.css";
import {HomeRoundedIcon,DashboardRoundedIcon } from '@mui/icons-material';
// import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

const NavMenu = () => {
  return (
    <>
        <div className={styles.navmenu}>
            <div className={`${styles.link} ${styles.active}`}>
                <div className={styles.icon}><HomeRoundedIcon/></div>
                <div className={styles.text}>Home</div>
            </div>
            <div className={styles.link}>
                <div className={styles.icon}><DashboardRoundedIcon/></div>
                <div className={styles.text}>Dashboard</div>
            </div>
            <div className={styles.link}>
                <div className={styles.icon}><HomeRoundedIcon/></div>
                <div className={styles.text}>Home</div>
            </div>
            <div className={styles.link}>
                <div className={styles.icon}><HomeRoundedIcon/></div>
                <div className={styles.text}>Home</div>
            </div>
        </div>
    </>
  )
}

export default NavMenu