'use client'
import React, { useEffect, useState } from 'react';
import styles from "./list.module.css"
import Link from 'next/link';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// Material Ui
import TextField from '@mui/material/TextField';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { toast } from 'react-toastify';

const page = () => {

    const [classes,setClasses] = useState([]);
    const [departments,setDepartments] = useState([]);
    const [create,setCreate] = useState(false);
    const [departmentName,setDepartmentName] = useState("");
    const [branchName,setBranchName] = useState("");

    const {data:session,status} = useSession();
    const Router = useRouter();

    const id = session?.user?._id;
    const course = session?.user?.course;
    const branch = session?.user?.branch;
    const role = session?.user?.role;

     useEffect(()=>{
        const getData=async()=>{
            try {
                const res = await axios.get(`http://localhost:3000/api/list/list/${id}`);
                setClasses(res.data.class)
            } catch (error) {
                console.log(error);
                alert('error');
            }
        }
         id && getData();
    },[id])

    
    
    // GETTING DEPARTMENTS ---------------------------------------------------------
    
    useEffect(()=>{
        const getDepartments = async()=>{
            try {
                const res = await axios.get("http://localhost:3000/api/department");
                setDepartments(res.data.departments);
            } catch (error) {
                console.log(error);
            }
        }
        getDepartments();
    },[])
    
    
    // CREATING NEW DEPARTMENT ----------------------------------------------------------
    const handleDepartment = async(e)=>{
        e.preventDefault();
        try {
            
            const departmentData = JSON.stringify({departmentName,branchName})
            const res = await axios.post("http://localhost:3000/api/department",departmentData);
            console.log(res.data);
            setCreate(false);
            toast.success("Department Created",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
              setDepartmentName("")
              setBranchName("")
            } catch (error) {
            console.log(error);
            toast.error("Department Not Created",{
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
        
        
    role === "Hod" && Router?.push(`/list/branch/${course}=${branch}`);
        
  return (<>
    <div className={styles.container}>
        <div className={styles.createContainer}>
            <h2 className={styles.heading}>{role === "Teacher" ? "CLASSES" : role === "Dean" && "Department"}</h2>
            {role === "Dean" && <button onClick={()=>setCreate(true)} className={styles.button}>CREATE</button>}    
        </div>

        {/* STUDENT LIST --------------------------------------- */}
        {role === "Teacher" && 
        <div className={styles.inner}>
            {classes?.map((item,i)=> 
                <div key={i} className={styles.box}>
                    <div className={styles.classDetail}>
                        <p className={styles.index}>{i+1}.</p>
                        <p className={styles.courseName}>{course}</p>
                        <p className={styles.BranchName}>{item.split("|")[0]}</p>
                        <p className={styles.semester}>{item.split("|")[1]} Semester</p>
                        <p className={styles.section}>{item.split("|")[2]} Section</p>
                    </div>
                    <div className={styles.visit}>
                        <Link href={`/list/${course}=${item.split("|")[0]}=${item.split("|")[1]}=${item.split("|")[2]}`} className={styles.link}>Show <KeyboardArrowRightRoundedIcon className={styles.icon} /></Link>
                    </div>
                </div>
            )}
        </div>
        }

        {/* HOD LIST --------------------------------------------------- */}
        {role === "Dean" &&
        <div className={styles.inner}>
            {departments?.map((item,i)=>
                <div key={item._id} className={styles.departmentBox}>
                    <div className={styles.classDetail}>
                        <p className={styles.index}>{i+1}.</p>
                        <p className={styles.courseName}>{item.department}</p>
                        <p className={styles.BranchName}>{item.branch.length} Branches</p>
                    </div>
                    <div className={styles.visit}>
                        <Link href={`/list/department/${item.department}`} className={styles.link}>Show <KeyboardArrowRightRoundedIcon className={styles.icon} /></Link>
                    </div>
                </div>
            )}
        </div>
        }

    </div>
    {create === true && 
            <div className={styles.outer}>
                <form action="" onSubmit={handleDepartment}  className={styles.form}>
                    <div className={styles.cancelContainer}>
                        <h3 className={styles.formHeading}>Create Department</h3>
                        <div className={styles.cancel} onClick={()=>setCreate(false)}>
                            <ClearRoundedIcon/>
                        </div>
                    </div>
                    <TextField id="outlined-basic" label="Department Name*" variant="outlined" onChange={(e)=>setDepartmentName(e.target.value)} />
                    <TextField id="outlined-basic" label="Branch Name*" variant="outlined" onChange={(e)=>setBranchName(e.target.value)}/>
                    <div className={styles.buttonContainer}>
                        <input type="submit" className={styles.button} value="SUBMIT" />
                    </div>
                </form>
            </div>
    }
    </>
  )
}

export default page