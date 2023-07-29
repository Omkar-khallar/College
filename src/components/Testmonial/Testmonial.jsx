"use client";
import { useEffect, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import styles from "./Testmonial.module.css";
import data from "./data";
import Image from "next/image";
import profile from "../../../public/images/profile.jpg";
import Rating from '@mui/material/Rating';
import { useSession } from "next-auth/react";

const Testmonial = () => {
  const [index, setIndex] = useState(0);
  const {data:session,status} = useSession();

  const handleLeft = () => {
    setIndex(index === 0 ? 4 : (prev) => prev - 1);
  };

  const handleRight = () => {
    setIndex(index === 4 ? 0 : (prev) => prev + 1);
  };

//   useEffect(() => {
//     setIndex(index === 4 ? 0 : (prev) => prev + 1);
//   }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.headingContainer}>

        <h2 className={styles.heading}>Reviews</h2>
      {status === "authenticated" && 
        <button className="button">Rate Us</button>
      }
      </div>
      <div className={styles.inner}>
        {data?.map((item) => (
          <div
            style={{ transform: `translateX(-${index * 93}vw)` }}
            key={item.id}
            className={styles.box}
          >
            <div className={styles.upper}>
              <div className={styles.imageContainer}>
                <Image
                  src={profile}
                  alt="profile image"
                  height={100}
                  width={100}
                  className={styles.image}
                />
              </div>
              <div className={styles.detailContainer}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.email}>{item.email}</p>
              </div>
              <div className={styles.startContainer}>
              <Rating name="read-only" value={3} readOnly />
              <p>{item.star == 1
                  ? " 1"
                  : item.star == 2
                  ? " 2"
                  : item.star == 3
                  ? " 3"
                  : item.star == 4
                  ? " 4"
                  : item.star == 5 && " 5"}</p>
                {/* {item.star == 1
                  ? "⭐"
                  : item.star == 2
                  ? "⭐⭐"
                  : item.star == 3
                  ? "⭐⭐⭐"
                  : item.star == 4
                  ? "⭐⭐⭐⭐"
                  : item.star == 5 && "⭐⭐⭐⭐⭐"} */}
              </div>
            </div>
            <div className={styles.lower}>
              <p className={styles.review}>{item.review + item.id}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={handleLeft}
        className={`${styles.buttonOuter} ${styles.left}`}
      >
        <WestIcon />
      </div>
      <div
        onClick={handleRight}
        className={`${styles.buttonOuter} ${styles.right}`}
      >
        <EastIcon />
      </div>
    </div>
  );
};

export default Testmonial;
