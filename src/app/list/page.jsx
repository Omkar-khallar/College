"use client"
import React from 'react';
import styles from "./list.module.css"
// import Buttons from '@/components/Button/Buttons';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from '@mui/material/Button';
const page = () => {

  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.innercontainer}>
          <div className={styles.tablewrapper}>
            <div className={styles.headingcontainer}>
              <h3 className={styles.heading}>Student List</h3>
            </div>
            <table className={styles.table}>
              <thead className={styles.column}>
                <th className={styles.columndata}>S.no</th>
                <th className={styles.columndata}>Name</th>
                <th className={styles.columndata}>Rollno</th>
                <th className={styles.columndata}>Email</th>
                <th className={styles.columndata}>Phone</th>
                <th className={styles.columndata}>Operation</th>
              </thead>
              <tr className={styles.row}>
                <td className={styles.rowdata}>1</td>
                <td className={styles.rowdata}>Omkar</td>
                <td className={styles.rowdata}>12201305</td>
                <td className={styles.rowdata}>omkarkhallar@gmail.com</td>
                <td className={styles.rowdata}>8872432537</td>
                <td className={styles.rowdata}>
                  <div className={styles.buttoncontainer}>
                  <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                  <Button className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
                  </div>
                </td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.rowdata}>1</td>
                <td className={styles.rowdata}>Omkar</td>
                <td className={styles.rowdata}>12201305</td>
                <td className={styles.rowdata}>omkarkhallar@gmail.com</td>
                <td className={styles.rowdata}>8872432537</td>
                <td className={styles.rowdata}>
                  <div className={styles.buttoncontainer}>
                  <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                  <Button className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
                  </div>
                </td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.rowdata}>1</td>
                <td className={styles.rowdata}>Omkar</td>
                <td className={styles.rowdata}>12201305</td>
                <td className={styles.rowdata}>omkarkhallar@gmail.com</td>
                <td className={styles.rowdata}>8872432537</td>
                <td className={styles.rowdata}>
                  <div className={styles.buttoncontainer}>
                  <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                  <Button className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default page