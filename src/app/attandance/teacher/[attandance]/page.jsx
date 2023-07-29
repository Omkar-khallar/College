"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./attandance.module.css";

import Buttons from "@/components/Button/Buttons";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import getUser from "@/app/getUser";
import { Button, fabClasses } from "@mui/material";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import dayjs from "dayjs"; 
import { ToogleContext } from "@/store/context";
import { FamilyRestroomRounded } from "@mui/icons-material";
import { Router } from "next/router";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { useRouter } from "next/navigation";

const AttandanceTeacher = ({ params }) => {
  const {toogle} = useContext(ToogleContext);
  const course = params.attandance.split("%3D")[0];
  const branch = params.attandance.split("%3D")[1];
  const semester = params.attandance.split("%3D")[2];
  const section = params.attandance.split("%3D")[3];
  const subjectUnFiltered = params.attandance.split("%3D")[4];
  const subjectNames = subjectUnFiltered.split("%20");
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;

  // STATE HOOKS --------------------------------------
  const [students, setStudents] = useState([]);
  const [inputs, setinputs] = useState([]);
  const [per, setper] = useState(80);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState("");
  const [userData, setUserData] = useState({});
  const [mark, setMark] = useState(true);
  const [show, setShow] = useState(false);
  const [attandances, setAttandances] = useState([]);
  const [loading, setLoading] = useState(false);

  const todayDate = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const currentDate = `${todayYear}-${todayMonth}-${todayDate}`;
  const [date, setdate] = useState(currentDate);

  // useSESSION HOOK FOR TAKING USER -------------------------
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const id = session?.user?._id;
  const Router = useRouter();

  // useEFFECT HOOKS ------------------------------------------------------------

  // FETCHING THE STUDENTS --------------------------------------------

  useEffect(() => {
    userData.study?.map((item) => {
      if (item.class === `${branch}|${semester}|${section}`) {
        setSubject(item.subject);
        return 1;
      }
    });
  }, [userData]);

  console.log(subject);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true)
        const res = await getUser(id);
        setUserData(res);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    id && getUserData();
  }, [session?.user]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${URL}/api/list/${course}=${branch}=${semester}=${section}`
        );
        setStudents(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    fetchStudents();
  }, [params.attandance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      // const date = new Date();
      const res = await axios.post(`${URL}/api/attandance`, {
        date,
        course,
        branch,
        semester,
        section,
        inputs,
        id,
        subject,
      });
      console.log(res.data);
      setSending(false);
      toast.success("Attandance Submit", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setSending(false);
      console.log("submit error ================", error);
      toast.error("Attandance Not Submit", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handlePresent = async (id) => {
    setinputs((oldData) => {
      return [...oldData, id];
    });
  };

  const handleAbsent = async (id) => {
    setinputs((oldData) => {
      return oldData.filter((oldData) => {
        return oldData != id;
      });
    });
  };

  const handleMark = () => {
    setLoading(true)
    setMark(true);
    setShow(false);
    setLoading(false)
  };

  const handleShow = () => {
    setLoading(true)
    setMark(false);
    setShow(true);
    setLoading(false)
  };

  // FETCH ATTANDANCE --------------------------------------
  useEffect(()=>{
    const getAttandance = async()=>{
      try {
        setLoading(true)
        const res = await axios.get(`${URL}/api/attandance/${branch}=${semester}=${section}=${subject}`);
        setAttandances(res.data.attandanceData);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    subject && getAttandance();
  },[subject])

  status === "unauthenticated" && Router.push("/auth/login");

  return (
    <>
    {loading === true ? <LoadingScreen/>:
      <div className={toogle === true ? "containerExpand" : styles.container}>
        {status === "loading" && <LoadingScreen/>}
        {status === "authenticated" && <>
        <div className={styles.headingContainer}>
          <Button
            onClick={handleMark}
            variant={mark == true ? "contained" : "text"}
            color="primary"
          >
            Mark
          </Button>
          <Button
            onClick={handleShow}
            variant={show == true ? "contained" : "text"}
            color="primary"
          >
            Show
          </Button>
        </div>
        {role == "Teacher" && (
          <>
            {mark == true && (
              <div className={styles.innercontainer}>
                <form onSubmit={handleSubmit} className={styles.form} action="">
                  <div className={styles.headingcontainer}>
                    <h3 className={styles.heading}>Attandance</h3>
                    <input
                      type="date"
                      name="date"
                      onChange={(e) => setdate(e.target.value)}
                      defaultValue={date}
                    />
                  </div>
                  <table className={styles.table}>
                    <thead>
                      <tr className={styles.tablecolumn}>
                        <th className={styles.tablecolumndata}>SR.NO</th>
                        <th className={styles.tablecolumndata}>Name</th>
                        <th className={styles.tablecolumndata}>Rollno</th>
                        {/* <th className={styles.tablecolumndata}>Date</th> */}
                        <th className={styles.tablecolumndata}>Attandance</th>
                      </tr>
                    </thead>

                    {students?.map((item, i) => (
                      <tr key={item._id} className={styles.tablerow}>
                        <td className={styles.tablerowdata}>{i + 1}.</td>
                        <td className={styles.tablerowdata}>{item.name}</td>
                        <td className={styles.tablerowdata}>{item.rollno}</td>
                        {/* <td className={styles.tablerowdata}>{item.date}</td> */}
                        <td className={styles.tablerowdata}>
                          <label for={item._id} className={styles.label}>
                            Present
                          </label>
                          <input
                            onChange={() => handlePresent(item._id)}
                            className={styles.radio}
                            type="radio"
                            name={item._id}
                            value={item._id}
                          />
                          <label for={item._id} className={styles.label}>
                            Absent
                          </label>
                          <input
                            onChange={() => handleAbsent(item._id)}
                            className={styles.radio}
                            type="radio"
                            name={item._id}
                            value="absent"
                          />
                        </td>
                      </tr>
                    ))}
                  </table>
                  <div className={styles.button}>
                    {/* <Buttons text={"Submit"}/> */}
                    <input
                      disabled={sending}
                      className={`${
                        sending == true ? styles.submitDisabled : styles.submit
                      }`}
                      type="submit"
                      value="SUBMIT"
                    />
                  </div>
                </form>
              </div>
            )}
            {/* // LIST OF  STUDENTS */}
            {show == true && (
              <div className={styles.innercontainer}>
                <div className={styles.tableShow} action="">
                  <div className={styles.headingcontainer}>
                    <h3 className={styles.heading}>Attandance Track</h3>
                  </div>
                  <div className={styles.tableWrapper}>

                  
                  <table className={styles.table}>
                    <thead>
                      <tr className={styles.tablecolumn}>
                        <th className={styles.tablecolumndata}>SR no.</th>
                        <th className={styles.tablecolumndata}>Name</th>
                        <th className={styles.tablecolumndata}>Rollno</th>
                        {/* <div  className={styles.dateContainer}> */}
                        {attandances?.map((item,i)=>
                        <th key={i} className={styles.tablecolumndata}>
                        {dayjs(item.date).format("DD-MM")}
                        </th>
                          )}
                        {/* </div> */}
                        {/* <th className={styles.tablecolumndata}>Percentage</th> */}
                      </tr>
                    </thead>

                    {students?.map((item,i) => (
                      <tr key={item.id} className={styles.tablerow}>
                        <td className={styles.tablerowdata}>{i+1}.</td>
                        <td className={styles.tablerowdata}>{item.name}</td>
                        <td className={styles.tablerowdata}>{item.rollno}</td>
                        {attandances?.map((items,i)=>
                        <td key={i} className={styles.tablerowdata}>{-1 === items.attandance?.indexOf(item._id) ? "A" :"P"}</td>
                        )}
                       
                        {/* <td
                          className={`${per < 75 ? styles.red : styles.green} ${
                            styles.tablerowdata
                          } `}
                        >
                          {per}
                        </td> */}
                      </tr>
                    ))}
                  </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        </>}
      </div>
}
    </>
  );
};

export default AttandanceTeacher;
