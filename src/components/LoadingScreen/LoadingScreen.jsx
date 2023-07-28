import React from 'react'
import {CircularProgress} from "@/app/loadingCircle";

const LoadingScreen = () => {
  return (
    <div className={"center"}>
        <CircularProgress/>
    </div>
  )
}

export default LoadingScreen