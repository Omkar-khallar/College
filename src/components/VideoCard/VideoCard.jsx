// import React from "react";
import styles from "./videocard.module.css";
import Image from "next/image";
import Link from "next/link";
import {format} from "timeago.js"

const VideoCard = ({videos}) => {
  return (
    <>
    {videos?.map((item,i)=>
    <Link key={item._id} href={`/video/${item._id}`}>
      <div className={styles.videocontainer}>
        <div className={styles.index}>{i+1}</div>
        <div className={styles.imagecontainer}>
            <Image className={styles.img} src={item?.thumbnail}  width={100} height={100} alt="Video Image" />
        </div>
        <div className={styles.detail}>
            <h3 className={styles.heading}> {item.title}</h3>
            <h3 className={styles.name}>{item.username} • <span className={styles.time}>{format(item.createdAt)}</span></h3>
        </div>
      </div>
    </Link>
      )}
    </>
  );
};

export default VideoCard;
