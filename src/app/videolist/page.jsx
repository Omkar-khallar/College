'use client'
import React from 'react'
import styles from "./videolist.module.css"
import VideoCard from "@/components/VideoCard/VideoCard"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = () => {
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
      <div className={styles.headingcontainer}>
        <h3 className={styles.heading}>Operating System</h3>
      </div>
      <div className={styles.innercontainer}>
        <VideoCard/>
      </div></>)}
    </div>
    </>
  )
}

export default page