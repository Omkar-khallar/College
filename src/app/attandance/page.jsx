"use client"
import React, { useState } from "react";
import styles from "./attandance.module.css";
import { data } from "@/app/data";
import Buttons from "@/components/Button/Buttons";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const page = () => {
  const role = "Student";

  const [per,setper] = useState(80);

  return (
    <>
      <div className={styles.container}>
        {role == "Teacher" ? (
          <div className={styles.innercontainer}>
            <form className={styles.form} action="">
              <div className={styles.headingcontainer}>
                <h3 className={styles.heading}>Attandance</h3>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tablecolumn}>
                    <th className={styles.tablecolumndata}>Name</th>
                    <th className={styles.tablecolumndata}>Rollno</th>
                    <th className={styles.tablecolumndata}>Date</th>
                    <th className={styles.tablecolumndata}>Attandance</th>
                  </tr>
                </thead>

                {data.map((item) => (
                  <tr key={item.id} className={styles.tablerow}>
                    <td className={styles.tablerowdata}>{item.name}</td>
                    <td className={styles.tablerowdata}>{item.rollno}</td>
                    <td className={styles.tablerowdata}>{item.date}</td>
                    <td className={styles.tablerowdata}>
                      <label for={item.id} className={styles.label}>
                        Present
                      </label>
                      <input
                        type="radio"
                        name={`attandance ${item.id}`}
                        value="present"
                      />
                      <label for={item.id} className={styles.label}>
                        Absent
                      </label>
                      <input
                        type="radio"
                        name={`attandance${item.id}`}
                        value="absent"
                      />
                    </td>
                  </tr>
                ))}
              </table>
              <div className={styles.button}>
                {/* <Buttons text={"Submit"}/> */}
                <input className={styles.submit} type="submit" value="SUBMIT" />
              </div>
            </form>
          </div>
        ) : (
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

                {data.map((item) => (
                  <tr key={item.id} className={styles.tablerow}>
                    <td className={styles.tablerowdata}>OS</td>
                    <td className={styles.tablerowdata}>12</td>
                    <td className={styles.tablerowdata}>10</td>
                    <td  className={`${per<75? styles.red:styles.green } ${styles.tablerowdata} `}>
                      {per}
                    </td>
                  </tr>
                ))}
              </table>
              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
