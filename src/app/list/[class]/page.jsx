"use client"
import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useEffect, useState } from 'react';
import styles from "./list.module.css"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {toast } from 'react-toastify';
import { ToogleContext } from '@/store/context';

const page =({params}) => {
  const {toogle} = useContext(ToogleContext);
  const course = params.class.split("%3D")[0];
  const branch = params.class.split("%3D")[1];
  const semester = params.class.split("%3D")[2];
  const section = params.class.split("%3D")[3];

  // console.log(course,branch,semester,section);

  const [userList,setUserList] = useState([]);
  const [loading,setloading] = useState(false);
  const {data:session,status} = useSession();
  const Router = useRouter();
  
  // Fetching the list of User
  useEffect(()=>{
    const getData = async()=>{
      try {
        
      } catch (error) {
        
      }
      setloading(true);
      const res = await axios.get(`http://localhost:3000/api/list/${course}=${branch}=${semester}=${section}`);
      const data = res.data;
      setUserList(data);
      setloading(false);
      alert("list fetched")
    }
    getData();
  },[])

  // Handle the Delete user 
  const handleDelete = async(id)=>{
     try{
        const res = await axios.delete(`http://localhost:3000/api/list/${id}`);
        res.status === 200 &&  toast.success('User Deleted SuccessFully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          Router?.reload()

     }catch(error){
        error.status === 500 && toast.error('User not Deleted Try after some Time', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
     }
  }

 
  if(status === ("unauthenticated" || "loading")){
    Router?.push("/auth/login");
  }
  

  const role = session?.user?.role;

  return (
    <>
      <div className={ toogle === true ? "containerExpand" :styles.container}>
        {status === ("unauthenticated" || "loading") && " " }
        {/* LOADING CHECK AND UPDATE PAGE */}
        {loading === true ? <div className={styles.loadingcontainer}>
        <CircularProgress />
        </div> :
        status === "authenticated" && 
        <div className={styles.innercontainer}>
        <div className={styles.tablewrapper}>
            <div className={styles.headingcontainer}>
              <h3 className={styles.heading}>{role === "Teacher" ? "Student" : role == "Hod" ? "Teacher" :role == "Dean" ? "Department" : " "} List</h3>
            </div>
            <table className={styles.table}>
              <thead className={styles.column}>
                <tr>
                <th className={styles.columndata}>S.no</th>
                <th className={styles.columndata}>Name</th>
                <th className={styles.columndata}>Rollno</th>
                <th className={styles.columndata}>Email</th>
                <th className={styles.columndata}>Phone</th>
                <th className={styles.columndata}>Operation</th>
                </tr>
              </thead>
              <tbody>

                {userList.map((user,i)=>(
                  <tr key={user._id} className={styles.row}> 
                  <td className={styles.rowdata}>{i+1}</td>
                  <td className={styles.rowdata}>{user.name}</td>
                  <td className={styles.rowdata}>{user.rollno}</td>
                  <td className={styles.rowdata}>{user.email}</td>
                  <td className={styles.rowdata}>{user.phone}</td>
                  <td className={styles.rowdata}>
                    <div className={styles.buttoncontainer}>
                    <Link href={`http://localhost:3000/list/edit/${user._id}`}>
                    <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                    </Link>
                    <Button onClick={()=>handleDelete(user._id)} className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
                    </div>
                  </td>
              </tr>
               ))}
               </tbody>         
            </table>
          </div>
        </div>}
      </div>
    </>
  )
}

export default page