"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./notice.module.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CreateForm from "@/components/Form/CreateForm";
import EditForm from "@/components/Form/EditForm";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const Notice = () => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const {toogle} = useContext(ToogleContext);

  const [more,setmore] = useState(false);
  const [ids,setIds] = useState();
  const [noticeId,setNoticeId] = useState();
  const [edit,setedit] = useState(false);
  const [create,setcreate] = useState(false);
  const [notice,setnotice] = useState();
  const [editNotice,setEditNotice] = useState();
  const [notices,setNotices] = useState([]);
  const [loading,setLoading] = useState(false);
  
  const {data:session,status} = useSession();
  const Router = useRouter();
  const path = usePathname();
  const role = session?.user?.role;
  const id = session?.user?._id;

  // UPLOAD NOTICE --------------------------------------------------------------
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      console.log(notice)
      const noticeData = JSON.stringify({notice,id});
      const res = await axios.post(`${URL}/api/notice`,noticeData);
      res.status === 200 && toast.success("Notice uploaded SuccessFully ✔", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        setcreate(false);
        Router.reload();
    } catch (error) {
        error.status === 500 && toast.error("Notice is Not uploaded ⚠", {
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

  // FETCH NOTICES --------------------------------------------------------------

  useEffect(()=>{
      const getNotice = async()=>{
        try {
          setLoading(true);
          const res = await axios.get(`${URL}/api/notice`);
          setNotices(res.data.notices);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      getNotice();
  },[]);

  // DELETING NOTICE --------------------------------------------------------------

      const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`${URL}/api/notice/${id}`);
            res.status === 200 && toast.success("Notice Deleted SuccessFully ✔", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
        } catch (error) {
          console.log(error);
          error.response.status === 500 && toast.error("Notice Not Deleted ⚠", {
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
      

  // EDITING NOTICE --------------------------------------------------------------

      let handleEdit = (id,notice)=>{
        setIds(id);
        setedit(true);
        setEditNotice(notice);
      }
        const handleEditSubmit = async(e)=>{
          e.preventDefault();
        try {
            console.log(ids);
            const res = await axios.put(`${URL}/api/notice/${ids}`,{editNotice});
            console.log(res)
            res.status === 200 && toast.success("Notice Deleted SuccessFully ✔", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
              setedit(false);
        } catch (error) {
          console.log(error);
          error.response.status === 500 && toast.error("Notice Not Deleted ⚠", {
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

  const handleExpand=(noticeIds)=>{
    setmore(!more);
    setNoticeId(noticeIds);
  }

  status === "unauthenticated" && Router.push("/auth/login");

  return (
    <>
    {loading === true ? <LoadingScreen/>:
      <div className={ toogle === true ? "containerExpand" :styles.container}>
        {status === "loading" && <LoadingScreen/>}

        {status === "authenticated"  && (<>

          {role === "Hod" && 
          <div className={styles.createcontainer}>
            <Button onClick={()=>setcreate(true)} variant="contained" ><AddIcon /></Button>
          </div>
          }

          <div className={styles.innercontainer}>

            {notices?.map((item)=>
            <div key={item._id} className={`${ more == false ? styles.noticecontainer : noticeId === item._id ? styles.noticecontainerexpand : styles.noticecontainer}`} >

              <div  className={styles.detail}>
                <p styles={styles.date}>{new Date(item.createdAt).toLocaleString()}</p>
                <p styles={styles.viewcontainer}></p>
              </div>

              <div className={`${more == false ? styles.noticebox : noticeId === item._id ? styles.noticeboxexpand : styles.noticebox}`}>
                <p className={styles.notice}>
                  {item.notice}
                </p>
              </div>

              <div className={styles.morecontainer}>
                  <IconButton onClick={()=>handleExpand(item._id)} className={styles.button} aria-label="delete">
                    { more == false ? <ExpandMoreIcon /> : noticeId === item._id ? <ExpandLessIcon/> : <ExpandMoreIcon />}
                  </IconButton>
              </div>

              {role === "Hod" ? item.userId === id &&
              <div className={styles.buttonscontainer}>
                <Tooltip title="Delete">
                  <IconButton onClick={()=>handleDelete(item._id)} className={styles.buttonedit} aria-label="delete" color="error">
                    <DeleteRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton   className={styles.buttonedit} onClick={()=>handleEdit(item._id,item.notice)} aria-label="edit" color="success">
                    <EditRoundedIcon />
                  </IconButton>
                </Tooltip>
              </div> : ""}

            </div>)}
          </div>
        </>)}
      </div>
}
      {create == true ?<CreateForm setnotice={setnotice} handleSubmit={handleSubmit} setcreate={setcreate} notice={notice}/> : " "}
      {edit == true ?<EditForm handleEditSubmit={handleEditSubmit} editNotice={editNotice} setEditNotice={setEditNotice} setedit={setedit}/> : " "}
    </>
  );
}

export default Notice;
