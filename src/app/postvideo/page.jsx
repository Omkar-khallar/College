"use client";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import styles from "./video.module.css";
import { FormControl ,Select,MenuItem,InputLabel,TextField} from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";
import app from "../firebase";
import { toast } from "react-toastify";
import { ToogleContext } from "@/store/context";

const page = () => {
  const {toogle} = useContext(ToogleContext);

  const [thumbnail,setThumbnail] = useState(undefined)
  const [imgPer,setImgPer] = useState(0)
  const [videoPer,setVideoPer] = useState(0)
  const [video,setVideo] = useState(undefined)
  const [ids,setids] = useState("")
  const [usernames,setUsername] = useState("")
  const [selectOption,setSelectOption] = useState([])
  const [inputs,setInputs] = useState({})
  const [loading,setloading] = useState(false);

  const handleInputs = (e)=>{
    setInputs((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

    const {data:session,status} = useSession();
    const id = session?.user?._id;
    const username = session?.user?.name;

    //   FETCHING SUBJECT NAMES FOR SELECT---------------------------
    useEffect(()=>{
        const fetchSubjects = async()=>{
            try {
                const res = await axios.get(`http://localhost:3000/api/subject/${id}`);
                setSelectOption(res.data.subjects);
            } catch (error) {
                console.log(error);
            }
        }
        id && fetchSubjects();
    },[session?.user])


    // UPLOAD FUNCTION ------------------------------------------------
    const uploadFile = (file,urlType)=>{
      setloading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime()+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',(snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "thumbnail" ? setImgPer(progress) : setVideoPer(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break;
    }
  },
  (error) => {},
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      urlType === "video" && setInputs((prev)=>{
        return {...prev,video:downloadURL}
      })
      urlType === "thumbnail" && setInputs((prev)=>{
        return {...prev,thumbnail:downloadURL}
      })
      setloading(false);
    });
  }
  )
  }


    // UPLOADING IMAGE AND VIDEO FILE ---------------------------------
    useEffect(()=>{
        video && uploadFile(video,"video")
    },[video]);

    useEffect(()=>{
        thumbnail && uploadFile(thumbnail,"thumbnail")
    },[thumbnail]);

    // POST VIDEO FILES --------------------------------------------- 

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        setloading(true)
        const videoData = JSON.stringify({inputs,username,id});
        console.log(videoData);
        const res = await axios.post("http://localhost:3000/api/video",videoData);
        toast.success("Video uploaded successFully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }) 
        setInputs({});
        setloading(false);
      } catch (error) {
        console.log(error)
        toast.error("Video not uploaded !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }) 
        setloading(false)
      }
    }

  return (
    <div className={ toogle === true ? "containerExpand" :styles.container}>
      <div className={styles.innercontainer}>
        <form onSubmit={handleSubmit} action="" className={styles.form}>
            <div className={styles.headingContainer}>
                <h3 className={styles.heading}>Upload Video</h3>
            </div>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Subject*</InputLabel>
            <Select className={styles.input} labelId="demo-simple-select-label" id="demo-simple-select" label="Subject*" name="subject" value={inputs.subject} onChange={handleInputs}>
              {selectOption?.map((item)=><MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField className={styles.input} id="outlined-basic" label="Title*" variant="outlined" name="title" value={inputs.title} onChange={handleInputs} />
          <TextField className={styles.input} id="outlined-basic" label="Description*" variant="outlined" name="desc" value={inputs.desc} onChange={handleInputs} />
          {imgPer>0 ? ("uploading"+imgPer+"%") :
           <TextField className={styles.input} id="outlined-basic" type="file" accept="image/*" label="Thumbnail*" variant="outlined" focused  onChange={(e)=>setThumbnail(e.target.files[0])} />
          } 
          {videoPer>0 ? ("uploading"+videoPer+"%") :
          <TextField className={styles.input} id="outlined-basic" type="file" accept="video/*" label="Video*" variant="outlined" focused  onChange={(e)=>setVideo(e.target.files[0])} />
          }
          <div className={styles.buttonContainer}>
            <input disabled={loading} className={`${loading === true ? styles.loadingButton : styles.button}`} type="submit" value="Upload"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
