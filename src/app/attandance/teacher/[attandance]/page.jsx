"use client"
import React, { useEffect, useState } from "react";
import styles from "./attandance.module.css";
import { data } from "@/app/data";
import Buttons from "@/components/Button/Buttons";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

const page = ({params}) => {
  const course = params.attandance.split("%3D")[0]
  const branch = params.attandance.split("%3D")[1]
  const semester = params.attandance.split("%3D")[2]
  const section = params.attandance.split("%3D")[3]

  // STATE HOOKS --------------------------------------
  const [students,setStudents] = useState([]);
  const [inputs,setinputs] = useState([]);
  const [per,setper] = useState(80);
  const [sending,setSending] = useState(false)

  const todayDate = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const currentDate = `${todayYear}-${todayMonth}-${todayDate}`;
  const [date,setdate] = useState(currentDate);

   
  // useSESSION HOOK FOR TAKING USER -------------------------
  const {data:session,status} = useSession();
  const role = session?.user?.role;
  const id = session?.user?._id;


  // useEFFECT HOOKS ------------------------------------------------------------

  // FETCHING THE STUDENTS --------------------------------------------
  useEffect(()=>{
    const fetchStudents = async()=>{
      try {
        const res = await axios.get(`http://localhost:3000/api/list/${course}=${branch}=${semester}=${section}`)
        setStudents(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudents();
  },[params.attandance]);


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setSending(true)
      // const date = new Date();
      const res = await axios.post("http://localhost:3000/api/attandance",{date,course,branch,semester,section,inputs,id});
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
      })
    } catch (error) {
      setSending(false);
      console.log("submit error ================",error);
      toast.error("Attandance Not Submit", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }


  const handlePresent = async(id)=>{

    setinputs((oldData)=>{
      return [...oldData,id]
    })
    
  }


  const handleAbsent = async(id)=>{

    setinputs((oldData)=>{
      return oldData.filter((oldData)=>{
        return oldData != id
      })
    })

  }



console.log("input data",inputs);
  return (
    <>
      <div className={styles.container}>
        {role == "Teacher" ? (
          <div className={styles.innercontainer}>
            <form onSubmit={handleSubmit} className={styles.form} action="">
              <div className={styles.headingcontainer}>
                <h3 className={styles.heading}>Attandance</h3>
                <input type="date" name="date" onChange={(e)=>setdate(e.target.value)} defaultValue={date} />
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

                {students?.map((item,i) => (
                  <tr key={item._id} className={styles.tablerow}>
                    <td className={styles.tablerowdata}>{i+1}.</td>
                    <td className={styles.tablerowdata}>{item.name}</td>
                    <td className={styles.tablerowdata}>{item.rollno}</td>
                    {/* <td className={styles.tablerowdata}>{item.date}</td> */}
                    <td className={styles.tablerowdata}>
                      <label for={item._id} className={styles.label}>
                        Present
                      </label>
                      <input onChange={()=>handlePresent(item._id)} className={styles.radio}  type="radio" name={item._id} value={item._id}/>
                      <label for={item._id} className={styles.label}>
                        Absent
                      </label>
                      <input onChange={()=>handleAbsent(item._id)} className={styles.radio}  type="radio" name={item._id} value="absent" />
                    </td>
                  </tr>
                ))}
              </table>
              <div className={styles.button}>
                {/* <Buttons text={"Submit"}/> */}
                <input disabled={sending} className={`${sending == true ? styles.submitDisabled :styles.submit}`} type="submit" value="SUBMIT" />
              </div>
            </form>
          </div>
        ) : (
          // LIST OF SUBJECT FOR STUDENTS
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
