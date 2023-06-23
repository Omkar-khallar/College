"use client";
import React, { useState } from "react";
import styles from "./notice.module.css";
import Buttons from "@/components/Button/Buttons";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Form from "@/components/Form/Form";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {

  const [more,setmore] = useState(false);
  const [edit,setedit] = useState(false);

  const {data:session,status} = useSession();
    const Router = useRouter();

  if(status === ("unauthenticated" || "loading")){
    Router?.push("/auth/login");
  }
  return (
    <>
      <div className={styles.container}>
      {status === ("unauthenticated" || "loading") && " "}
        {status === "authenticated"  && (<>
        <div className={styles.createcontainer}>
          <Button onClick={()=>setedit(true)} variant="contained" ><AddIcon /></Button>
        </div>
        <div className={styles.innercontainer}>
          <div className={`${more == false ? styles.noticecontainer : styles.noticecontainerexpand}`} >
            <div  className={styles.detail}>
              <p styles={styles.date}>12/12/12</p>
              <p styles={styles.viewcontainer}></p>
            </div>
            <div className={`${more == false ? styles.noticebox : styles.noticeboxexpand}`}>
              <p className={styles.notice}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel illo numquam totam tempora dignissimos placeat, ullam culpa, laboriosam perspiciatis et quaerat vitae quas! Nobis illo obcaecati quod minima, quaerat alias ut. Eligendi, quidem neque, illo, quo deleniti reiciendis quis magnam quibusdam quisquam quasi sed. Illo quos eaque pariatur culpa quidem repellat itaque optio quasi laborum ipsum debitis quam rem, explicabo quod molestias quas eos. Similique commodi veritatis provident tenetur sapiente iure, ratione porro placeat velit culpa recusandae fugiat cumque consequatur molestias alias accusantium temporibus saepe pariatur obcaecati veniam facilis! Minus fugit, dolorem alias aperiam libero voluptate necessitatibus iure nulla cupiditate?
              </p>
            </div>
            <div className={styles.morecontainer}>
                <IconButton onClick={()=>setmore(!more)} className={styles.button} aria-label="delete">
                  {more == false ? <ExpandMoreIcon /> : <ExpandLessIcon/>}
                  
                </IconButton>
            </div>
            <div className={styles.buttonscontainer}>
              <Tooltip title="Delete">
                <IconButton className={styles.buttonedit} aria-label="delete" color="error">
                  <DeleteRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton className={styles.buttonedit} onClick={()=>setedit(true)} aria-label="edit" color="success">
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
        </>)}
      </div>
      {edit == true ?<Form setedit={setedit}/> : " "}
    </>
  );
}

export default page;
