import React from 'react'
import styles from "./videolist.module.css"
import VideoCard from "@/components/VideoCard/VideoCard"

const page = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.headingcontainer}>
        <h3 className={styles.heading}>Operating System</h3>
      </div>
      <div className={styles.innercontainer}>
        <VideoCard/>
      </div>
    </div>
    </>
  )
}

export default page