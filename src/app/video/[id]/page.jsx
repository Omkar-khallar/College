"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./video.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {format} from "timeago.js"
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/loadingScreen";

const Video = ({ params }) => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const {toogle} = useContext(ToogleContext);
  const id = params.id;
  const [videos,setVideos] = useState({});
  const [suggesionVideo,setSuggesionVideo] = useState([]);
  const [loading,setLoading] = useState(false);

  const { data: session, status } = useSession();
  const Router = useRouter();

  if (status === "unauthenticated" ) {
    Router?.push("/auth/login");
  }

  // FETCHING THE ONE VIDEO BY ID ----------------------------------

  useEffect(()=>{
    const fetchVideo =async()=>{
      try {
        setLoading(true)
        console.log(id);
        const res = await axios.get(`${URL}/api/video/onevideo/${id}`);
        setVideos(res.data.video);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    id && fetchVideo();
  },[id])

  // FETCHING MANY  IDEO BY ----------------------------------

  useEffect(()=>{
    const fetchManyVideo =async()=>{
      try {
        setLoading(true)
        const res = await axios.get(`${URL}/api/video/manyvideo/${videos.subject}`);
        console.log(res.data.video);
        setSuggesionVideo(res.data.video);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    videos && fetchManyVideo();
  },[videos])


  return (
    <>
      {loading === true ? <LoadingScreen/> :
      <div className={ toogle === true ? "containerExpand" :styles.container}>
        {status === "loading" && <LoadingScreen/>}
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
}
    </>
  );
};

export default Video;
