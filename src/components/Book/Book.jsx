"use client";
import React, { useState } from "react";
import styles from "./Book.module.css";
// import {coverimages} from "./coverimages";

const Book = ({ image, id }) => {
  console.log(image);

  const [index,setIndex] = useState(3);

  const handleClick = ()=>{}

  return (
    <div className={styles.book}>
      
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={styles.cover}
      >
        <div
          style={{
            backgroundColor: `${
              id == 1
                ? "#56BFBF"
                : id == 2
                ? "#56BFBF"
                : id == 3
                ? "#D9C382"
                : id == 4
                ? "#F280B6"
                : id == 5
                ? "#D97184"
                : id == 6
                ? "#EAF2DC"
                : id == 7 && "#F2E8E4"
            }`,
          }}
          className={styles.bookNameContainer}
        >
          <p className={styles.bookName}>Operating System</p>
        </div>
      </div>

    </div>
  );
};

export default Book;
