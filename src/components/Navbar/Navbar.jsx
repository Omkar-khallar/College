import React from "react";
import styles from "./navbar.module.css";
import MenuIcon from "../ButtonIcon/MenuIcon";
import Buttons from "../Button/Button";
import VideoIcon from "../ButtonIcon/VideoIcon";
import Image from "next/image";
import profile from "../../../public/images/profile.jpg"

const Navbar = () => {
  const login = true;

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
          {login == false ? 
            <div className={styles.button}>
              <Buttons className={styles.button} text={"Login"} url={""} />
            </div>
           : 
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
