"use client"
import React from "react";
import styles from "./navbar.module.css";
import MenuIcon from "../ButtonIcon/MenuIcon";
import Buttons from "../Button/Buttons";
import VideoIcon from "../ButtonIcon/VideoIcon";
import Image from "next/image";
import profile from "../../../public/images/profile.jpg"
import { useSession } from "next-auth/react";
import Link from "next/link";
// import {session , status} from "../user";

const Navbar = () => {

  const {data:session,status} = useSession();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.menu}>
            <MenuIcon/>
          </div>
          <div className={styles.logo}>
            <h3 style={{ fontStyle: "oblique" }}>College</h3>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.video}>
            <VideoIcon />
          </div>
          {status === ("unauthenticated" || "loading") && 
            <div className={styles.buttoncontainer}>
              <Link className={styles.button} href="/auth/login">Login</Link>
            </div>
          } 
          {status == "authenticated" && 
            <div className={styles.profile}>
              <Image src={profile} alt="profile" className={styles.image}  />
            </div>
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
