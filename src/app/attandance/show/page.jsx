import React from "react";
import styles from "./attandance.module.css";

const page = () => {
  return (
    <div className={styles.container}>
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

            <tr className={styles.tablerow}>
              <td className={styles.tablerowdata}>OS</td>
              <td className={styles.tablerowdata}>12</td>
              <td className={styles.tablerowdata}>10</td>
              <td
                // className={`${per < 75 ? styles.red : styles.green} ${
                //   styles.tablerowdata
                // } `}
              >
                {/* {per} */}
                80
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
