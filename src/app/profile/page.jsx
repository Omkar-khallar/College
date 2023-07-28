"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./profile.module.css";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { signOut, useSession } from "next-auth/react";
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
import { ToogleContext } from "@/store/context";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const page = () => {
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  const { toogle } = useContext(ToogleContext);
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  // useSTATE HOOKS -----------------------------------------------------
  const [userdata, setuserdata] = useState({});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userDetail = async () => {
      setLoading(true);
      const userdatas = await getUser(userId);
      setuserdata(userdatas);
      setLoading(false);
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
  const [showPass, setShowPass] = useState("");
  const [classes, setclasses] = useState("");
  const [subjects, setsubjects] = useState("");
  const [comaclasses, setcomaclasses] = useState([]);
  const [comasubjects, setcomasubjects] = useState([]);
  const [imageupload, setimageupload] = useState(undefined);
  const [uploadPer, setUploadPer] = useState(0);

  useEffect(() => {
    setLoading(true);
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
    setimageupload(userdata.img);

    userdata.class?.map((item) =>
      setclasses((prev) => {
        if (item == "") {
          return prev;
        } else {
          return `${prev}${item},`;
        }
      })
    );
    userdata.subject?.map((item) =>
      setsubjects((prev) => {
        if (item == "") {
          return prev;
        } else {
          return `${prev}${item},`;
        }
      })
    );
    setLoading(false);
  }, [userdata.name]);

  // console.log(userdata);

  useEffect(() => {
    setcomaclasses(classes.split(","));
  }, [classes]);

  useEffect(() => {
    setcomasubjects(subjects.split(","));
  }, [subjects]);

  const handleUploadImage = (file) => {
    file && uploadFile(file);
  };


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
    setUploading(true);
    e.preventDefault();
    try {
      const id = userdata._id;
      const res = await axios.put(`${process.env.VERCEL_URL}/api/user`, {
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
      setUploading(false);
    } catch (error) {
      setUploading(false);
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

  // DELETING THE USER DATA GFROM DB PERMANENTELY -------------------------------

  const handleDelete = async () => {
    try {
      const deletedUser = await axios.delete(
        `${process.env.VERCEL_URL}/${userdata._id}`
      );
      console.log(deletedUser);
      signOut();
    } catch (error) {
      console.log(error);
      toast.error("User Not Deleted", {
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

  // HANDLE PASSWORD

  const handlePassword = (pass) => {
    if (pass != "") {
      setShowPass(pass);
      setpassword(pass);
    }
  };

  status === "unauthenticated" && Router.push("/auth/login");

  return (
    <>
      {loading === true ? (
        <LoadingScreen />
      ) : (
        <>
          {status === "loading" && <LoadingScreen />}
          {status === "authenticated" &&
          <div
            className={toogle === true ? "containerExpand" : styles.container}
          >
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
                    <p onClick={handleDelete} className={styles.deleteButton}>
                      Delete Account
                    </p>
                  </div>
                </div>

                <div className={styles.middleContainer}>
                  <div className={styles.imageContainer}>
                    {edit == false ? (
                      <Image
                        src={
                          userdata.img === undefined
                            ? profileImage
                            : userdata.img
                        }
                        alt="profile Image"
                        className={styles.image}
                        width={100}
                        height={100}
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
                          onChange={(e) => handleUploadImage(e.target.files[0])}
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
                        label="Name"
                        variant="standard"
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
                        label="Email"
                        variant="standard"
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
                      className={styles.input}
                      id="input-with-sx"
                      label="Course"
                      variant="standard"
                      onChange={
                        edit == true ? (e) => setcourse(e.target.value) : ""
                      }
                      value={course}
                      InputLabelProps={{ shrink: true }}
                      defaultValue={userdata.course}
                    />

                    <TextField
                      className={styles.input}
                      id="standard-basic"
                      label="Branch"
                      variant="standard"
                      onChange={
                        edit == true ? (e) => setbranch(e.target.value) : ""
                      }
                      value={branch}
                      InputLabelProps={{ shrink: true }}
                      defaultValue={userdata.branch}
                    />
                    {role === "Student" && (
                      <TextField
                        className={styles.input}
                        id="standard-basic"
                        label="Semester"
                        variant="standard"
                        onChange={
                          edit == true ? (e) => setsemester(e.target.value) : ""
                        }
                        value={semester}
                        InputLabelProps={{ shrink: true }}
                        defaultValue={userdata.semester}
                      />
                    )}

                    {role === "Student" && (
                      <TextField
                        className={styles.input}
                        id="standard-basic"
                        label="Section"
                        variant="standard"
                        onChange={
                          edit == true ? (e) => setsection(e.target.value) : ""
                        }
                        value={section}
                        InputLabelProps={{ shrink: true }}
                        defaultValue={userdata.section}
                      />
                    )}

                    {role === "Student" && (
                      <TextField
                        className={styles.input}
                        id="standard-basic"
                        label="Year"
                        variant="standard"
                        onChange={
                          edit == true ? (e) => setyear(e.target.value) : ""
                        }
                        value={year}
                        InputLabelProps={{ shrink: true }}
                        defaultValue={userdata.year}
                      />
                    )}

                    {role === "Student" && (
                      <TextField
                        className={styles.input}
                        id="standard-basic"
                        label="Roll no."
                        variant="standard"
                        onChange={
                          edit == true ? (e) => setrollno(e.target.value) : ""
                        }
                        value={rollno}
                        InputLabelProps={{ shrink: true }}
                        defaultValue={userdata.rollno}
                      />
                    )}

                    <TextField
                      className={styles.input}
                      id="standard-basic"
                      label="Dob"
                      variant="standard"
                      onChange={
                        edit == true ? (e) => setdob(e.target.value) : ""
                      }
                      value={dob}
                      InputLabelProps={{ shrink: true }}
                      defaultValue={userdata.dob}
                    />

                    <TextField
                      className={styles.input}
                      id="standard-basic"
                      label="Phone no."
                      variant="standard"
                      onChange={
                        edit == true ? (e) => setphone(e.target.value) : ""
                      }
                      value={phone}
                      InputLabelProps={{ shrink: true }}
                      defaultValue={userdata.phone}
                    />

                    {role === "Student" && (
                      <TextField
                        className={styles.input}
                        id="standard-basic"
                        label="Subjects (seprate with commas , for eg: Os,Dbms)"
                        variant="standard"
                        onChange={
                          edit == true ? (e) => setsubjects(e.target.value) : ""
                        }
                        value={subjects}
                        InputLabelProps={{ shrink: true }}
                        defaultValue={userdata.subjects}
                      />
                    )}

                    {/* {role == "Teacher" && (
                      <TextField
                        className={styles.input}
                        id="standard-basic"
                        label="Classes (format: branch|semester|section , branch|semester|section)"
                        variant="standard"
                        defaultValue={classes}
                        onChange={
                          edit == true ? (e) => setclasses(e.target.value) : ""
                        }
                        InputLabelProps={{ shrink: true }}
                        value={classes}
                      />
                    )} */}

                    <TextField
                      name="password"
                      className={styles.input}
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                      onChange={
                        edit == true
                          ? (e) => handlePassword(e.target.value)
                          : ""
                      }
                      // defaultValue={"**********"}
                      value={showPass}
                      InputLabelProps={{ shrink: true }}
                      placeholder="**********"
                    />
                  </div>
                  {edit == true && (
                    <div className={styles.submitContainer}>
                      <input
                        disabled={uploading}
                        type="submit"
                        value="Update"
                        className={
                          uploading == true
                            ? styles.waitUpdateButton
                            : styles.updateButton
                        }
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
}
        </>
      )}
    </>
  );
};

export default page;
