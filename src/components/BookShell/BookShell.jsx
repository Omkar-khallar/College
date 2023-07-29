"use client";
import React, { useState } from "react";
import styles from "./bookshell.module.css";
import Book from "../Book/Book";
import coverimages from "../Book/coverimages";
import Image from "next/image";
import Link from "next/link";
import ShortcutIcon from '@mui/icons-material/Shortcut';

const BookShell = () => {
  const [index, setIndex] = useState(3);
  return (
    <div className={styles.outer}>
      <div className={styles.detailHeadingContainer}>
        <div className={styles.upper}>
          <h2 className={styles.detailHeading}>Explore Courses</h2>
          <div className={styles.link}>
          <Link className={styles.links} href="/subject"><ShortcutIcon/></Link>
          </div>
        </div>
        <p className={styles.detailDesc}>
        Unleash Your Full Potential: Experience the power of our exceptional video lectures, carefully curated to elevate your subject expertise and drive academic excellence. Embrace a brighter future as you delve into a world of knowledge and possibilities. Take the first step towards success, explore our captivating video lectures now!
        </p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.bookShellContainer}>
          {/* BOOKS -------------------------------------------------------------------- */}
          {coverimages?.map((item,i) => (
            // SMALL BOOK COVER--------------------------
            <div
            key={i}
              onClick={() => setIndex(item.id)}
              className={index == item.id ? styles.openedBook : styles.book}
            >
              {index != item.id && (
                <div
                  style={{ backgroundImage: `url(${item.image})` }}
                  className={styles.cover}
                >
                  <div
                    style={{
                      backgroundColor: `${
                        item.id == 1
                          ? "#56BFBF"
                          : item.id == 2
                          ? "#56BFBF"
                          : item.id == 3
                          ? "#D9C382"
                          : item.id == 4
                          ? "#F280B6"
                          : item.id == 5
                          ? "#D97184"
                          : item.id == 6
                          ? "#EAF2DC"
                          : item.id == 7 && "#F2E8E4"
                      }`,
                    }}
                    className={styles.bookNameContainer}
                  >
                    <p className={styles.bookName}>Operating System</p>
                  </div>
                </div>
              )}
              {/* EXPAND BOOK ------------------------------------------ */}
              {index == item.id && (
                <div className={styles.openCover}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={`/${item.image}`}
                      alt="course Image"
                      width={100}
                      height={100}
                      className={styles.image}
                    />
                    <div className={styles.overlapContainer}>
                      <h5 className={styles.headingOverlap}>
                        Operating System
                      </h5>
                    </div>
                  </div>
                  <div className={styles.detail}>
                    <h3 className={styles.title}>Operating system</h3>
                    <h4 className={styles.video}>
                      Video : <span className={styles.videoNo}> 50</span>
                    </h4>
                    <div className={styles.buttonContainer}>
                      <Link href={`/videolist/`}>
                      <button className={styles.buttonOpen}>View Videos</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.base}></div>
      </div>
    </div>
  );
};

export default BookShell;
