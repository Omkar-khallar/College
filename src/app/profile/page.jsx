"use client";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { useSession } from "next-auth/react";
import profileImage from "../../../public/images/bighead.svg";

// Material ui ----------
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

// FIREBASE UPLOAD IMAGE ---------------------------
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/app/firebase";
import axios from "axios";
import { toast } from "react-toastify";
import getUser from "../getUser";

const page = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  // useSTATE HOOKS -----------------------------------------------------
  const [userdata, setuserdata] = useState({});
  const [uploading,setUploading] = useState(false);


  useEffect(() => {
    const userDetail = async () => {
      const userdatas = await getUser(userId);
      setuserdata(userdatas);
    };
    userId && userDetail();
  }, [userId]);

  

  const role = session?.user?.role;

  const [edit, setEdit] = useState(false);

  // Input hooks --------------------------------------
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [course, setcourse] = useState();
  const [branch, setbranch] = useState();
  const [semester, setsemester] = useState();
  const [section, setsection] = useState();
  const [year, setyear] = useState();
  const [phone, setphone] = useState();
  const [dob, setdob] = useState();
  const [password, setpassword] = useState();
  const [rollno, setrollno] = useState();
  const [classes, setclasses] = useState("");
  const [subjects, setsubjects] = useState("");
  const [comaclasses, setcomaclasses] = useState([]);
  const [comasubjects, setcomasubjects] = useState([]);
  const [imageupload, setimageupload] = useState(undefined);
  const [uploadPer, setUploadPer] = useState(0);

  useEffect(() => {
    setname(userdata.name);
    setemail(userdata.email);
    setcourse(userdata.course);
    setbranch(userdata.branch);
    setsemester(userdata.semester);
    setsection(userdata.section);
    setrollno(userdata.rollno);
    setdob(userdata.dob);
    setpassword(userdata.password);
    setphone(userdata.phone);
    
    userdata.class?.map((item)=>setclasses((prev)=>{
      return `${prev}${item},`;
    }));
    userdata.subject?.map((item)=>setsubjects((prev)=>{
      return `${prev}${item},`;
    }));

  }, [userdata.name]);

 

  useEffect(() => {
    setcomaclasses(classes.split(","));
  }, [classes]);

  useEffect(() => {
    setcomasubjects(subjects.split(","));
  }, [subjects]);

  useEffect(() => {
    imageupload && uploadFile(imageupload);
  }, [imageupload]);

  // UPLOAD IMAGE TO FIREBASE ----------------------------
  const uploadFile = (file) => {
    setUploading(true);
    const storage = getStorage(app);
    const fileName = new Date() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPer(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageupload(downloadURL);
        });
        setUploading(false);
      }
    );
  };

  // HANDLE SUBMIT ---------------------------------
  const handleSubmit = async (e) => {
    setUploading(true)
    e.preventDefault();
    try {

      const id = userdata._id;
      const res = await axios.put("http://localhost:3000/api/user", {
        name,
        email,
        course,
        branch,
        section,
        semester,
        phone,
        dob,
        comaclasses,
        comasubjects,
        password,
        rollno,
        imageupload,
        role,
        id,
      });
      setuserdata(res.data.updatedUser);
      setEdit(false);
      toast.success("Profile Updated Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUploading(false)
    } catch (error) {
      setUploading(false)
      console.log(error);
      toast.error("Profile Not Updated", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <form onSubmit={handleSubmit} className={styles.form} action="">
          <div className={styles.upperContainer}>
            <div className={styles.headingContainer}>
              <h3 className={styles.heading}>Profile</h3>
            </div>
            <div className={styles.buttonContainer}>
              {edit == false && (
                <button
                  onClick={() => setEdit(true)}
                  className={styles.editButton}
                >
                  EDIT
                </button>
              )}
              {edit == true && (
                <button
                  onClick={() => setEdit(false)}
                  className={styles.cancelButton}
                >
                  CANCEL
                </button>
              )}
              <p className={styles.deleteButton}>Delete Account</p>
            </div>
          </div>

          <div className={styles.middleContainer}>
            <div className={styles.imageContainer}>
              {edit == false ? (
                <Image
                  className={styles.image}
                  src={profileImage}
                  alt="profile Image"
                />
              ) : (
                <>
                  <label htmlFor="image_upload">
                    {/* <Fab color="primary" aria-label="Upload Image"> */}
                    <div className={styles.iconWrapper}>
                      {uploadPer == 100 ? (
                        <CloudDoneIcon />
                      ) : (
                        <CloudUploadIcon />
                      )}
                    </div>
                    {/* </Fab> */}
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="image"
                    id="image_upload"
                    onChange={(e) => setimageupload(e.target.files[0])}
                    accept="image/*"
                  />
                </>
              )}{" "}
            </div>
            <div className={styles.emailDetail}>
              {edit == false ? (
                <h3 className={styles.name}>{userdata.name}</h3>
              ) : (
                <TextField
                  name="name"
                  className={styles.input}
                  id="input-with-sx"
                  label="Course"
                  variant="standard"
                  // focused
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  defaultValue={userdata.name}
                />
              )}
              {edit == false ? (
                <h4 className={styles.email}>{userdata.email}</h4>
              ) : (
                <TextField
                  name="email"
                  className={styles.input}
                  id="input-with-sx"
                  label="Course"
                  variant="standard"
                  focused
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  defaultValue={userdata.email}
                />
              )}
            </div>
          </div>

          <div className={styles.lowerContainer}>
            <div className={styles.details}>
              <TextField
                name="course"
                className={styles.input}
                id="input-with-sx"
                label="Course"
                variant="standard"
                focused
                onChange={edit == true ? (e) => setcourse(e.target.value) : ""}
                value={course}
              />

              <TextField
                name="branch"
                className={styles.input}
                id="standard-basic"
                label="Branch"
                variant="standard"
                focused
                onChange={edit == true ? (e) => setbranch(e.target.value) : ""}
                value={branch}
              />
              {role === "Student" && (
                <TextField
                  name="semester"
                  className={styles.input}
                  id="standard-basic"
                  label="Semester"
                  variant="standard"
                  focused
                  onChange={
                    edit == true ? (e) => setsemester(e.target.value) : ""
                  }
                  value={semester}
                />
              )}

              {role === "Student" && (
                <TextField
                  name="section"
                  className={styles.input}
                  id="standard-basic"
                  label="Section"
                  variant="standard"
                  focused
                  onChange={
                    edit == true ? (e) => setsection(e.target.value) : ""
                  }
                  value={section}
                />
              )}

              {role === "Student" && (
                <TextField
                  name="year"
                  className={styles.input}
                  id="standard-basic"
                  label="Year"
                  variant="standard"
                  focused
                  onChange={edit == true ? (e) => setyear(e.target.value) : ""}
                  value={year}
                />
              )}

              {role === "Student" && (
                <TextField
                  name="rollno"
                  className={styles.input}
                  id="standard-basic"
                  label="Roll no."
                  variant="standard"
                  focused
                  onChange={
                    edit == true ? (e) => setrollno(e.target.value) : ""
                  }
                  value={rollno}
                />
              )}

              <TextField
                name="dob"
                className={styles.input}
                id="standard-basic"
                label="Dob"
                variant="standard"
                focused
                onChange={edit == true ? (e) => setdob(e.target.value) : ""}
                value={dob}
              />

              <TextField
                name="phone"
                className={styles.input}
                id="standard-basic"
                label="Phone no."
                variant="standard"
                focused
                onChange={edit == true ? (e) => setphone(e.target.value) : ""}
                value={phone}
              />

              <TextField
                className={styles.input}
                id="standard-basic"
                label="Subjects (seprate with commas , for eg: Os,Dbms)"
                variant="standard"
                focused
                onChange={
                  edit == true ? (e) => setsubjects(e.target.value) : ""
                }
                value={subjects}
              />

              {role == "Teacher" && (
                <TextField
                  className={styles.input}
                  id="standard-basic"
                  label="Classes (format: branch|semester|section , branch|semester|section)"
                  variant="standard"
                  focused
                  onChange={
                    edit == true ? (e) => setclasses(e.target.value) : ""
                  }
                  value={classes}
                />
              )}

              <TextField
                name="password"
                className={styles.input}
                id="standard-basic"
                label="Password"
                variant="standard"
                focused
                onChange={
                  edit == true ? (e) => setpassword(e.target.value) : ""
                }
                value={"****************"}
              />
            </div>
            {edit == true && (
              <div className={styles.submitContainer}>
                <input
                disabled={uploading}
                  type="submit"
                  value="Update"
                  className={uploading == true ? styles.waitUpdateButton :styles.updateButton}
                  
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
