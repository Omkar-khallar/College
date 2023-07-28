'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from "./videolist.module.css"
import VideoCard from "@/components/VideoCard/VideoCard"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToogleContext } from '@/store/context';
import LoadingScreen from '@/components/LoadingScreen/loadingScreen';

const page = ({params}) => {
  
  const id = params.category;
  const {toogle} = useContext(ToogleContext);

  const [videos,setVideos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [subjectName,setSubjectName] = useState();

  const {data:session,status} = useSession();
  const Router = useRouter();

if(status === ("unauthenticated" || "loading")){
  Router?.push("/auth/login");
}

// FETCHING THE VIDEOS ------------------------------------------------------
  useEffect(()=>{
    const fetchVideos = async()=>{
      try {
        setLoading(true)
          const res = await axios.get(`http://localhost:3000/api/video/${id}`);
          setSubjectName(res.data.videos[0].subject)
          setVideos(res.data.videos);
          setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    id && fetchVideos();
  },[id])

  return (
    <>
    {loading === true ? <LoadingScreen/>:
    <div className={ toogle === true ? "containerExpand" :styles.container}>
    {status === ("unauthenticated" || "loading") && " "}
        {status === "authenticated"  && (<>
      <div className={styles.headingcontainer}>
        <h3 className={styles.heading}>{subjectName}</h3>
      </div>
      <div className={styles.innercontainer}>
        
        <VideoCard videos={videos}/>
       
      </div></>)}
    </div>
}
    </>
  )
}

export default page