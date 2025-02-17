"use client"
import { useContext, useEffect, useState } from "react";
import styles from "./subject.module.css";
import Card from "@/components/card/Card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Material Ui ----------
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const Subject = () => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const {toogle} = useContext(ToogleContext);

  const [create,setCreate] = useState(false);
  const [loading,setLoading] = useState(false);
  const [createSubject,setCreateSubject] = useState("");
  const [subjects,setSubjects] = useState([]);
  const [uploading,setUploading] = useState(false);
  
  const {data:session,status} = useSession();
    const Router = useRouter();
    const role = session?.user?.role;

  status === "unauthenticated" && Router?.push("/auth/login");
  
  const branch = session?.user?.branch;
  const course = session?.user?.course;
  const id = session?.user?._id;

  // CREATING NEW SUBJECT ------------------------------------------------
  const handleSubmit = async(e)=>{
    setUploading(true)
    e.preventDefault();
    console.log("enter");
    try {
      const subjectData = JSON.stringify({createSubject,branch,course});
      const res = await axios.post(`${URL}/api/subject`,subjectData);
      toast.success("Subject Created SuccessFully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setCreate(false);
      setUploading(false)
    } catch (error) {
      setUploading(false)
      console.log(error)
      toast.error("Subject Not Created", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  // FETCHING ALL SUBJECTS ------------------------------------------------

  useEffect(()=>{
    const fetchSubjects = async()=>{
      try {
        setLoading(true)
        console.log(id);
        const res = await axios.get(`${URL}/api/subject/${id}`)
        setSubjects(res.data.subjects);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    id && fetchSubjects();
  },[session?.user])

  return (
    <>
    {loading === true ? <LoadingScreen/> :
      <div className={ toogle === true ? "containerExpand" : "mainContainer"}>
      {status === "loading" && <LoadingScreen/>}
        {status === "authenticated"  && (<>
        <div className={styles.createcontainer}>
          <h3 className={styles.heading}>Subjects</h3>
          {role === "Hod" ? 
          <button className="button" onClick={()=>setCreate(true)}>CREATE</button>
          :""
        }
        </div>
        <div className={styles.wrapper}>
          <Card subjects={subjects} />
        </div></>)}
      </div>
  }
      {/* FORM STYLE */}
      {create == true &&
      <div className={styles.create}>
        <form onSubmit={handleSubmit} action="" className={styles.form}>
          <div className={styles.cancelContainer}>
            <div className={styles.headingContainer}>
              <h3 className={styles.heading}>Create Subject</h3>
            </div>
            <div onClick={()=>setCreate(false)} className={styles.cancelButton}>
              <CloseIcon/>
            </div>
          </div>
          <TextField onChange={(e)=>setCreateSubject(e.target.value)} value={createSubject} className={styles.input} id="outlined-basic" label="Subject Name*" variant="outlined" />
          <div className={styles.buttonContainer}>
            <input disabled={uploading}  type="submit" className={"button"} value="Create"/>
          </div>
        </form>
      </div>
      }
    </>
  );
};

export default Subject;
