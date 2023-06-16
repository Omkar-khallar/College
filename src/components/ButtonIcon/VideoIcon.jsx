"use client"
import React from 'react'
import IconButton from '@mui/material/IconButton';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import styles from "./MenuIcon.module.css";

const VideoIcon = () => {
  return (
    <IconButton>
        <VideoCallOutlinedIcon className={styles.icon}/>
    </IconButton>
  )
}

export default VideoIcon;