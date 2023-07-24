"use client";
import React, { useContext, useState } from "react";
import styles from "./navbar.module.css";
import MenuIcon from "../ButtonIcon/MenuIcon";
import Buttons from "../Button/Buttons";
import VideoIcon from "../ButtonIcon/VideoIcon";
import Image from "next/image";
import profile from "../../../public/images/bighead.svg";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ToogleContext } from "@/store/context";

const Navbar = () => {
  const {  tooogleMenuLink } = useContext(ToogleContext)
  const { data: session, status } = useSession();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <div onClick={tooogleMenuLink} className={styles.menu}>
            <MenuIcon />
          </div>
          <div className={styles.logo}>
            <h3 style={{ fontStyle: "oblique" }}>College</h3>
          </div>
        </div>

        <div className={styles.right}>

            

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
