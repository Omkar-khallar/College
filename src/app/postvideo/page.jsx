"use client";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import styles from "./video.module.css";
import { FormControl ,Select,MenuItem,InputLabel,TextField} from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";
import app from "../firebase";
import { toast } from "react-toastify";
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { useRouter } from "next/navigation";

const PostVideo = () => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
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
  const [isLoading,setIsLoading] = useState(false);

  const handleInputs = (e)=>{
    setInputs((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

    const {data:session,status} = useSession();
    const id = session?.user?._id;
    const username = session?.user?.name;
    const Router = useRouter();

    //   FETCHING SUBJECT NAMES FOR SELECT---------------------------
    useEffect(()=>{
        const fetchSubjects = async()=>{
            try {
              setloading(true);
              const res = await axios.get(`${URL}/api/subject/${id}`);
              setSelectOption(res.data.subjects);
              setloading(false);
            } catch (error) {
              console.log(error);
              setloading(false);
            }
        }
        id && fetchSubjects();
    },[session?.user])


    // UPLOAD FUNCTION ------------------------------------------------
    const uploadFile = (file,urlType)=>{
      setIsLoading(true);
      console.log("hi in uploadFile")
      const storage = getStorage(app);
      const fileName = new Date().getTime()+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',(snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "thumbnail" ? setImgPer(progress) : setVideoPer(progress);
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
        console.log("Video Uploaded")
        return {...prev,video:downloadURL}
      })
      urlType === "thumbnail" && setInputs((prev)=>{
        console.log("image Uploaded")
        return {...prev,thumbnail:downloadURL}

      })
      setIsLoading (false);
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
        // setloading(true)
        setIsLoading(true)
        const videoData = JSON.stringify({inputs,username,id});
        console.log(videoData);
        const res = await axios.post(`${URL}/api/video`,videoData);
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
        setInputs((prev)=>{return{}});
        setVideoPer(0);
        setImgPer(0);
        // setloading(false);
        setIsLoading(false);
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
        // setloading(false)
        setIsLoading(false);
      }
    }

    status === "unauthenticated" && Router.push("/auth/login");
    

  return (<>
    {loading === true ? <LoadingScreen/> :<>
      {status === "loading" && <LoadingScreen/>}
    {status === "authenticated" &&
    <div className={ toogle === true ? "containerExpand" :styles.container}>
      <div className={styles.innercontainer}>
        <form onSubmit={handleSubmit} action="" className={styles.form}>
            <div className={styles.headingContainer}>
                <h3 className={styles.heading}>Upload Video</h3>
            </div>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Subject*</InputLabel>
            <Select className={styles.input} labelId="demo-simple-select-label" id="demo-simple-select" label="Subject*" name="subject" value={inputs.subject} onChange={handleInputs} required>
              {selectOption?.map((item)=><MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField className={styles.input} id="outlined-basic" label="Title*" variant="outlined" name="title" value={inputs.title} onChange={handleInputs} required/>
          <TextField className={styles.input} id="outlined-basic" label="Description*" variant="outlined" name="desc" value={inputs.desc} onChange={handleInputs} required/>
          {imgPer>0 ? ("uploaded "+imgPer+"%") :
           <TextField className={styles.input} id="outlined-basic" type="file"  label="Thumbnail*" variant="outlined" InputLabelProps={{ shrink: true }}  onChange={(e)=>setThumbnail(e.target.files[0])} accept="image/*" required/>
          } 
          {imgPer > 0 && <br/>}
          {videoPer>0 ? ("uploaded "+videoPer+"%") :
          <TextField className={styles.input} id="outlined-basic" type="file"  label="Video*" variant="outlined" InputLabelProps={{ shrink: true }}  onChange={(e)=>setVideo(e.target.files[0])} accept="video/*" required/>
          }
          <div className={styles.buttonContainer}>
            <input disabled={isLoading} className="button" type="submit" value="Upload"/>
            {/* loading === true ? styles.loadingButton :  */}
          </div>
        </form>
      </div>
    </div>
}</>
        }
        </>
  );
};

export default PostVideo;
