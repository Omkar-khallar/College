"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./attandance.module.css";
import Link from "next/link";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import axios from "axios";
import { toast } from "react-toastify";
import getUser from "../getUser";
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/loadingScreen";


const Attandance = () => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const { toogle } = useContext(ToogleContext);
  const [classes, setClasses] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [newClass, setClass] = useState("");
  const [subject, setsubject] = useState("");
  const [userData, setUserData] = useState({});
  const { data: session, status } = useSession();
  const Router = useRouter();
  const [loading, setloading] = useState(false);

  const role = session?.user?.role;
  const course = session?.user?.course;
  const id = session?.user?._id;

  useEffect(() => {
    const getUserData = async () => {
      setloading(true); // managing the loading
      console.log("userId", id);
      const userDatas = await getUser(id);
      console.log("UserDATASSSS =======", userDatas);
      setUserData(userDatas);
      setClasses(userDatas.study);
      setloading(false); // managing the loading
    };
    session?.user?._id && getUserData();
  }, [session?.user?._id]);

  role === "Student" && Router?.push("/attandance/show");

  const handleClass = async (e) => {
    e.preventDefault();
    try {
      const NewClassData = JSON.stringify({ newClass, subject, id });
      const res = await axios.put(
        `${URL}/api/class`,
        NewClassData
      );
      setAddNew(false);
      toast.success("Class Created Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      setAddNew(false);
      toast.error("Class Not Created", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      {loading === true ? (
        <LoadingScreen/>
              ) : (
        <div className={toogle === true ? "containerExpand" : styles.container}>
          {status === "authenticated" && (
            <>
              {role === "Student" ? (
                ""
              ) : (
                <div className={styles.createContainer}>
                  <h2 className={styles.heading}>CLASSES</h2>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setAddNew(true)}
                  >
                    ADD CLASS
                  </Button>
                </div>
              )}
              <div className={styles.inner}>
                {classes?.map((item, i) => (
                  <div className={styles.box}>
                    <div className={styles.classDetail}>
                      <p className={styles.index}>{i + 1}.</p>
                      {console.log(item.class)}
                      <p className={styles.courseName}>{course}</p>
                      <p className={styles.BranchName}>
                        {item.class.split("|")[0]}
                      </p>
                      <p className={styles.semester}>
                        {item.class.split("|")[1]} Semester
                      </p>
                      <p className={styles.section}>
                        {item.class.split("|")[2]} Section
                      </p>
                    </div>
                    <div className={styles.visit}>
                      <Link
                        href={`/attandance/teacher/${course}=${
                          item.class.split("|")[0]
                        }=${item.class.split("|")[1]}=${
                          item.class.split("|")[2]
                        }=${item.subject}`}
                        className={styles.link}
                      >
                        Show{" "}
                        <KeyboardArrowRightRoundedIcon
                          className={styles.icon}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {addNew === true && (
        <div className={styles.outer}>
          <form action="" onSubmit={handleClass} className={styles.form}>
            <div className={styles.cancelContainer}>
              <h3 className={styles.formHeading}>Create Class</h3>
              <div className={styles.cancel} onClick={() => setAddNew(false)}>
                <ClearRoundedIcon />
              </div>
            </div>
            <TextField
              id="outlined-basic"
              label="Class Name* (Formet: Branch|Semester|Section)"
              variant="outlined"
              onChange={(e) => setClass(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Subject* (Full Form)"
              variant="outlined"
              onChange={(e) => setsubject(e.target.value)}
            />
            <div className={styles.buttonContainer}>
              <input type="submit" className={styles.button} value="SUBMIT" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Attandance;
