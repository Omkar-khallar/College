"use client";
import React, { useEffect, useState } from "react";
import styles from "./video.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {format} from "timeago.js"

const page = ({ params }) => {
  const id = params.id;
  const [videos,setVideos] = useState({});
  const [suggesionVideo,setSuggesionVideo] = useState([]);

  const { data: session, status } = useSession();
  const Router = useRouter();

  if (status === ("unauthenticated" || "loading")) {
    Router?.push("/auth/login");
  }

  // FETCHING THE ONE VIDEO BY ID ----------------------------------

  useEffect(()=>{
    const fetchVideo =async()=>{
      try {
        console.log(id);
        const res = await axios.get(`http://localhost:3000/api/video/onevideo/${id}`);
        setVideos(res.data.video);
      } catch (error) {
        console.log(error);
      }
    }
    id && fetchVideo();
  },[id])

  // FETCHING MANY  IDEO BY ----------------------------------

  useEffect(()=>{
    const fetchManyVideo =async()=>{
      try {
        
        const res = await axios.get(`http://localhost:3000/api/video/manyvideo/${videos.subject}`);
        console.log(res.data.video);
        setSuggesionVideo(res.data.video);
      } catch (error) {
        console.log(error);
      }
    }
    videos && fetchManyVideo();
  },[videos])

  // console.log(videos.video)

  return (
    <>
      {status === ("unauthenticated" || "loading") && " "}
      <div className={styles.container}>
      {status === "authenticated"  && 
        <div className={styles.innerContainer}>

          <div className={styles.videoContainer}>
            <div className={styles.videoInner}>
            <video
        width={"100%"}
        height={'100%'}
        className={styles.video}
        src={videos?.video}
        controls
        autoplay
      ></video>
            </div>
            <div className={styles.detail}>
              <h3 className={styles.videoHeading}>{videos?.title}</h3>
              <h4 className={styles.createrDetails}>{videos?.username} • <span className={styles.time}> {format(videos?.createdAt)} </span></h4>
              <h4 className={styles.videoDesc}>{videos?.desc}</h4>
            </div>
          </div>

          <div className={styles.suggesions}>
            <div className={styles.innerSuggesion}>

              <div className={styles.suggesionDeatils}>
                <h3 className={styles.subject}>{suggesionVideo[0]?.subject}</h3>
              </div>

              {suggesionVideo?.map((item,i)=>
                <Link key={item._id} href={`/video/${item._id}`}>
              <div className={`${id === item._id ? styles.videoCardActive :styles.videoCards}`}>
                <p className={styles.index}>{i+1}</p>
                <div className={styles.imageContainer}>
                  <Image src={item.thumbnail} alt="video image" className={styles.image} width={100} height={100} />
                </div>

                <div className={styles.suggesionVideoDetail}>
                  <h4 className={styles.suggesionHeading}>{item.title}</h4>
                  <p className={styles.suggesionname}>{item.username}</p>
                </div>
              </div>
              </Link>
              )}

            </div>
          </div>

        </div>}
      </div>
    </>
  );
};

export default page;
