"use client";
import React from "react";
// import video from "../../../public/video/video.mp4";
import styles from "./video.module.css";

const page = () => {

  const {data:session,status} = useSession();
  const Router = useRouter();

if(status === ("unauthenticated" || "loading")){
  Router?.push("/auth/login");
}

  return (
    <>
    {status === ("unauthenticated" || "loading") && " "}
        {status === "authenticated"  && 
      <video
        width={"100%"}
        height={'100%'}
        className={styles.video}
        src="./video.mp4"
        controls
        autoplay
      ></video>}
    </>
  );
};

export default page;
