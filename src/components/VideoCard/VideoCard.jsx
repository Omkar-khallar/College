import React from "react";
import styles from "./videocard.module.css";
import Image from "next/image";
import img from "../../../public/images/video.png"
import Link from "next/link";

const VideoCard = () => {
  return (
    <>
    <Link href="/video">
      <div className={styles.videocontainer}>
        <div className={styles.index}>1</div>
        <div className={styles.imagecontainer}>
            <Image className={styles.img} src={img} alt="Video Image" />
        </div>
        <div className={styles.detail}>
            <h3 className={styles.heading}> this video is os main videothis video is os main videothis video is os main video</h3>
            <p className={styles.time}>• 6 months ago</p>
        </div>
      </div>
    </Link>

   
    <Link href="/video">
      <div className={styles.videocontainer}>
        <div className={styles.index}>1</div>
        <div className={styles.imagecontainer}>
            <Image className={styles.img} src={img} alt="Video Image" />
        </div>
        <div className={styles.detail}>
            <h3 className={styles.heading}> this video is os main videothis video is os main videothis video is os main video</h3>
            <p className={styles.time}>• 6 months ago</p>
        </div>
      </div>
    </Link>

   
    <Link href="/video">
      <div className={styles.videocontainer}>
        <div className={styles.index}>1</div>
        <div className={styles.imagecontainer}>
            <Image className={styles.img} src={img} alt="Video Image" />
        </div>
        <div className={styles.detail}>
            <h3 className={styles.heading}> this video is os main videothis video is os main videothis video is os main video</h3>
            <p className={styles.time}>• 6 months ago</p>
        </div>
      </div>
    </Link>

   
    <Link href="/video">
      <div className={styles.videocontainer}>
        <div className={styles.index}>1</div>
        <div className={styles.imagecontainer}>
            <Image className={styles.img} src={img} alt="Video Image" />
        </div>
        <div className={styles.detail}>
            <h3 className={styles.heading}> this video is os main videothis video is os main videothis video is os main video</h3>
            <p className={styles.time}>• 6 months ago</p>
        </div>
      </div>
    </Link>

   
    <Link href="/video">
      <div className={styles.videocontainer}>
        <div className={styles.index}>1</div>
        <div className={styles.imagecontainer}>
            <Image className={styles.img} src={img} alt="Video Image" />
        </div>
        <div className={styles.detail}>
            <h3 className={styles.heading}> this video is os main videothis video is os main videothis video is os main video</h3>
            <p className={styles.time}>• 6 months ago</p>
        </div>
      </div>
    </Link>

   
    </>
  );
};

export default VideoCard;
