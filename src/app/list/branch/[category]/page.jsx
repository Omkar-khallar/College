"use client"
import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useEffect, useState } from 'react';
import styles from "../../[class]/list.module.css"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {toast } from 'react-toastify';
import { ToogleContext } from '@/store/context';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

const page =({params}) => {
  const {toogle} = useContext(ToogleContext);
  const course = params.category.split("%3D")[0];
  const branch = params.category.split("%3D")[1];


  const [userList,setUserList] = useState([]);
  const [loading,setloading] = useState(false);

  const {data:session,status} = useSession();
  const Router = useRouter();
  
//   Fetching the list of User
  useEffect(()=>{
    const getData = async()=>{
        try {
            setloading(true);
            const res = await axios.get(`http://localhost:3000/api/list/branch/${course}=${branch}`);
            const data = res.data;
            console.log(data);
            setUserList(data);
            setloading(false);
        } catch (error) {
            console.log(error)
        }
    }
    getData();
  },[])

  // Handle the Delete user 
  const handleDelete = async(id)=>{
     try{
        const res = await axios.delete(`http://localhost:3000/api/list/list/${id}`);
         toast.success('User Deleted SuccessFully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          
     }catch(error){
        console.log(error)
        error && toast.error('User not Deleted ', {
          position: "top-right",
          autoClose: 2000,
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
        {loading === true ? <LoadingScreen/> :
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
                  <td className={styles.rowdata}>{user.email}</td>
                  <td className={styles.rowdata}>{user.phone}</td>
                  <td className={styles.rowdata}>
                    <div className={styles.buttoncontainer}>
                    <Link href={`http://localhost:3000/list/edit/${user._id}`}>
                    <Button className={styles.greenbutton} variant="contained"><EditRoundedIcon/></Button>
                    </Link>
                    <Button  onClick={()=>handleDelete(user._id)}  className={styles.redbutton} variant="contained"><DeleteRoundedIcon/></Button>
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