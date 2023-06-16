"use client";
import React, { useContext } from "react";
import styles from "./navMenu.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import Link from "next/link";
import { ToogleButton } from "../ButtonIcon/MenuIcon";

const NavMenu = () => {
  const student = true;
  const teacher = true;
  const hod = false;
  const dean = false;


  return (
    <>
      <div className={styles.navmenu}>
       
            <Link className={styles.link} href="/">
              <div className={`${styles.link} ${styles.active}`}>
                <div className={styles.icon}>
                  <HomeRoundedIcon />
                </div>
                <div className={styles.text}>Home</div>
              </div>
            </Link>

            <Link className={styles.link} href="/attandance">
              <div className={styles.link}>
                <div className={styles.icon}>
                  <AssessmentRoundedIcon />
                </div>
                <div className={styles.text}>Attandance</div>
              </div>
            </Link>

            {student === true ? (
              ""
            ) : (
              <Link className={styles.link} href="#">
                <div className={styles.link}>
                  <div className={styles.icon}>
                    <HowToRegRoundedIcon />
                  </div>
                  <div className={styles.text}>Register</div>
                </div>
              </Link>
            )}

            <Link className={styles.link} href="/subject">
              <div className={styles.link}>
                <div className={styles.icon}>
                  <AutoStoriesRoundedIcon />
                </div>
                <div className={styles.text}>Subjects</div>
              </div>
            </Link>

            {student === true ? (
              ""
            ) : (
              <Link className={styles.link} href="/list">
                <div className={styles.link}>
                  <div className={styles.icon}>
                    <FormatListBulletedRoundedIcon />
                  </div>
                  <div className={styles.text}>Student List</div>
                </div>
              </Link>
            )}
            {student === true ? (
              ""
            ) : (
              <Link className={styles.link} href="/list">
                <div className={styles.link}>
                  <div className={styles.icon}>
                    <FormatListBulletedRoundedIcon />
                  </div>
                  <div className={styles.text}>Teacher List</div>
                </div>
              </Link>
            )}

            {student === true ? (
              ""
              ) : (
              <Link className={styles.link} href="/list">
                <div className={styles.link}>
                  <div className={styles.icon}>
                    <FormatListBulletedRoundedIcon />
                  </div>
                  <div className={styles.text}>Department List</div>
                </div>
              </Link>
            )}

            <Link className={styles.link} href="/notice">
              <div className={styles.link}>
                <div className={styles.icon}>
                  <NotificationsActiveRoundedIcon />
                </div>
                <div className={styles.text}>Notice</div>
              </div>
            </Link>

            {student === true ? (
              ""
            ) : (
              <Link className={styles.link} href="/mail">
                <div className={styles.link}>
                  <div className={styles.icon}>
                    <EmailRoundedIcon />
                  </div>
                  <div className={styles.text}>Mail</div>
                </div>
              </Link>
            )}

            <Link className={styles.link} href="/chat">
              <div className={styles.link}>
                <div className={styles.icon}>
                  <MessageRoundedIcon />
                </div>
                <div className={styles.text}>Chat</div>
              </div>
            </Link>
            
      </div>
    </>
  );
};

export default NavMenu;
