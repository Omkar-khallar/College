"use client";
import { useContext } from "react";
import styles from "./navMenu.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ToogleContext} from "@/store/context";
import SmallNavMenu from "../SmallNavMenu/SmallNavMenu";

const NavMenu = () => {

  const {data:session,status} = useSession();
  const Router = useRouter();
  const path = usePathname();

  const {toogle} = useContext(ToogleContext);

  const role = session?.user?.role;

  const handleLogOut = ()=>{
    signOut();
    Router?.push("/auth/login");
  }

  status == "loading" || "unauthenticated" && "";
  return (
    <>
      <div className={toogle === true ? styles.navmenuShort : styles.navmenu}>

        {toogle === true ? <SmallNavMenu/> :
        <>

            <Link className={styles.link} href="/">
              <div className={`${styles.link} ${path === "/" ? styles.active : ""}`}>
                <div className={styles.icon}>
                  <HomeRoundedIcon />
                </div>
                <div className={styles.text}>Home</div>
              </div>
            </Link>

            {status == "authenticated" &&
            <>
            {role === "Teacher" || role === "Student" ?
            <Link className={styles.link} href="/attandance">
              <div className={`${styles.link} ${path === "/attandance" ? styles.active : ""}`}>
                <div className={styles.icon}>
                  <AssessmentRoundedIcon />
                </div>
                <div className={styles.text}>Attandance</div>
              </div>
            </Link>:""
            }

            {role === "Student" ? (
              ""
              ) : (
                <Link className={styles.link} href="/auth/register">
                <div className={`${styles.link} ${path === "/register" ? styles.active : ""}`}>
                  <div className={styles.icon}>
                    <HowToRegRoundedIcon />
                  </div>
                  <div className={styles.text}>Register</div>
                </div>
              </Link>
            )}

            <Link className={styles.link} href="/subject">
              <div className={`${styles.link} ${path === "/subject" ? styles.active : ""}`}>
                <div className={styles.icon}>
                  <AutoStoriesRoundedIcon />
                </div>
                <div className={styles.text}>Subjects</div>
              </div>
            </Link>

            {role === "Student" ? (
              ""
              ) : (
                <Link className={styles.link} href="/postvideo">
                <div className={`${styles.link} ${path === "/postvideo" ? styles.active : ""}`}>
                  <div className={styles.icon}>
                    <VideoCallRoundedIcon />
                  </div>
                  <div className={styles.text}>Post Video</div>
                </div>
              </Link>
            )}

            {role === "Student" ? (
              ""
              ) : (
                <Link className={styles.link} href="/list">
                <div className={`${styles.link} ${path === "/list" ? styles.active : ""}`}>
                  <div className={styles.icon}>
                    <FormatListBulletedRoundedIcon />
                  </div>
                  <div className={styles.text}>{role === "Teacher" ? "Student" : role === "Hod" ? "Teacher" : "Hod"} List</div>
                </div>
              </Link>
            )}

            <Link className={styles.link} href="/notice">
              <div className={`${styles.link} ${path === "/notice" ? styles.active : ""}`}>
                <div className={styles.icon}>
                  <NotificationsActiveRoundedIcon />
                </div>
                <div className={styles.text}>Notice</div>
              </div>
            </Link>

            {role === "Student" ? (
              ""
              ) : (
                <Link className={styles.link} href="/mail">
                <div className={`${styles.link} ${path === "/mail" ? styles.active : ""}`}>
                  <div className={styles.icon}>
                    <EmailRoundedIcon />
                  </div>
                  <div className={styles.text}>Mail</div>
                </div>
              </Link>
            )}

              <div onClick={handleLogOut} className={styles.link}>
                <div className={styles.icon}>
                  <OutputRoundedIcon />
                </div>
                <div  className={styles.text}>Logout</div>
              </div>
            
</>}

</> }     
            
      </div>
    </>
  );
};

export default NavMenu;
