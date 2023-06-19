// "use client";
import React from "react";
// import video from "../../../public/video/video.mp4";
import styles from "./video.module.css";

const page = () => {

  return (
    <>
      <video
        width={"100%"}
        height={'100%'}
        className={styles.video}
        src="./video.mp4"
        controls
        autoplay
      ></video>
    </>
  );
};

export default page;
