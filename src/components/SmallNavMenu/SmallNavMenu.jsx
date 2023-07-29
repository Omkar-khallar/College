"use client";
// import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import OutputRoundedIcon from "@mui/icons-material/OutputRounded";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
import styles from "./smallNavMenu.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const SmallNavMenu = () => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const path = usePathname();
  return (
    <div className={styles.innerContainer}>
      <Link href="/">
        <div className={path === "/" ? styles.active : styles.linkContainer}>
          <HomeRoundedIcon />
          <p className={styles.text}>Home</p>
        </div>
      </Link>

      {status === "authenticated" ? (
        <>
          <Link href="/attandance">
            <div
              className={
                path === "/attandance" ? styles.active : styles.linkContainer
              }
            >
              <AssessmentRoundedIcon />
              <p className={styles.text}>Attandance</p>
            </div>
          </Link>

          {role === "Student" ? (
            " "
          ) : (
            <Link href="/auth/register">
              <div
                className={
                  path === "/auth/register"
                    ? styles.active
                    : styles.linkContainer
                }
              >
                <HowToRegRoundedIcon />
                <p className={styles.text}>Register</p>
              </div>
            </Link>
          )}

          <Link href="/subject">
            <div
              className={
                path === "/subject" ? styles.active : styles.linkContainer
              }
            >
              <AutoStoriesRoundedIcon />
              <p className={styles.text}>Subject</p>
            </div>
          </Link>

          {role === "Student" ? (
            " "
          ) : (
            <Link href="/postvideo">
              <div
                className={
                  path === "/postvideo" ? styles.active : styles.linkContainer
                }
              >
                <VideoCallRoundedIcon />
                <p className={styles.text}>Post Video</p>
              </div>
            </Link>
          )}

          {role === "Student" ? (
            " "
          ) : (
            <Link href="/list">
              <div
                className={
                  path === "/list" ? styles.active : styles.linkContainer
                }
              >
                <FormatListBulletedRoundedIcon />
                <p className={styles.text}>
                  {role === "Teacher"
                    ? "Student"
                    : role === "Hod"
                    ? "Teacher"
                    : role === "Dean" && "Hod"}{" "}
                  List
                </p>
              </div>
            </Link>
          )}

          {/* <Link href="/mail">
        <div className={path === "/mail" ? styles.active : styles.linkContainer}>
          <EmailRoundedIcon />
        </div>
      </Link> */}

          {role === "Student" && (
            <Link href="/notice">
              <div
                className={
                  path === "/notice" ? styles.active : styles.linkContainer
                }
              >
                <NotificationsActiveRoundedIcon />
                <p className={styles.text}>Notice</p>
              </div>
            </Link>
          )}

          {/* <Link href="/">
        <div className={path === "/" ? styles.active : styles.linkContainer}>
          <OutputRoundedIcon />
        </div>
      </Link> */}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SmallNavMenu;
