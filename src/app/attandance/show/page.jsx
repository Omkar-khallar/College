"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./attandance.module.css";
import { useSession } from "next-auth/react";
import getUser from "@/app/getUser";
import axios from "axios";
import { ToogleContext } from "@/store/context";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const page = () => {
  const { toogle } = useContext(ToogleContext);
  // USESESSION HOOK -----------------------
  const { data: session, status } = useSession();
  const id = session?.user?._id;
  const Router = useRouter();

  // useSTATE HOOK ------------------------------
  const [userData, setUserData] = useState({});
  const [ids, setIds] = useState("");
  const [fetching, setFetching] = useState(false);
  const [userAttandance, setUserAttandance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setFetching(true);
      const datas = await getUser(id);
      setUserData(datas);
      setIds(id);
      setFetching(false);
    };
    id && getUserData();
  }, [id]);

  useEffect(() => {
    const getAttandance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/attandance/student/${ids}`
        );
        const datas = res?.data?.attandanceData;
        setUserAttandance(datas);
      } catch (error) {
        console.log(error);
      }
    };
    userData == {} ? "" : getAttandance();
  }, [userData]);

  status === "unauthenticated" && Router.push("/auth/login")

  return (
    <>
    {loading === true ? <LoadingScreen/>:<>
    <div className={toogle === true ? "containerExpand" : styles.container}>
      {status === "loading" && <LoadingScreen/>}
      <div className={styles.innercontainer}>
        <div className={styles.form} action="">
          <div className={styles.headingcontainer}>
            <h3 className={styles.heading}>Attandance Track</h3>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tablecolumn}>
                <th className={styles.tablecolumndata}>Subject</th>
                <th className={styles.tablecolumndata}>Lecture Attend</th>
                <th className={styles.tablecolumndata}>Lecture Absent</th>
                <th className={styles.tablecolumndata}>Percentage</th>
              </tr>
            </thead>

            {userAttandance?.map((item, i) => (
              <tr key={i} className={styles.tablerow}>
                <td className={styles.tablerowdata}>{item.subject}</td>
                <td className={styles.tablerowdata}>{item.attand}</td>
                <td className={styles.tablerowdata}>{item.total}</td>
                <td
                  className={`${item.per < 75 ? styles.red : styles.green} ${
                    styles.tablerowdata
                  } `}
                >
                  {item.per}%
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
    </>
    }</>
  );
};

export default page;
