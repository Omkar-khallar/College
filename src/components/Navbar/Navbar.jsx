"use client";
import React from "react";
import styles from "./navbar.module.css";
import MenuIcon from "../ButtonIcon/MenuIcon";
import Buttons from "../Button/Buttons";
import VideoIcon from "../ButtonIcon/VideoIcon";
import Image from "next/image";
import profile from "../../../public/images/bighead.svg";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.menu}>
            <MenuIcon />
          </div>
          <div className={styles.logo}>
            <h3 style={{ fontStyle: "oblique" }}>College</h3>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.video}>
            <VideoIcon />
          </div>
          {status === ("unauthenticated" || "loading") && (
            <div className={styles.buttoncontainer}>
              <Link className={styles.button} href="/auth/login">
                Login
              </Link>
            </div>
          )}
          {status == "authenticated" && (
            <Link href="/profile">
              <div className={styles.profile}>
                <Image src={profile} alt="profile" className={styles.image} />
              </div>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
