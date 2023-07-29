"use client";
import React, { useState } from "react";
import styles from "./Carosile.module.css";
import Image from "next/image";
import hero from "../../../public/images/slider4.png";
import hero1 from "../../../public/images/slider3.png";
import hero2 from "../../../public/images/slider2.png";

const Carosile = () => {
  const [index, setIndex] = useState(0);

  const imageUrl = [
    {
      id: 1,
      image: hero,
      heading: "Discover Diverse Courses and Subjects",
      description:
        "Expand your horizons with our comprehensive range of courses and subjects, designed to provide valuable knowledge and skills for your college journey. Explore our offerings today and shape your academic future",
      button: "Let's Learn",
    },
    {
      id: 2,
      image: hero1,
      heading: "Discover Diverse Courses and Subjects",
      description:
        "Expand your horizons with our comprehensive range of courses and subjects, designed to provide valuable knowledge and skills for your college journey. Explore our offerings today and shape your academic future",
      button: "Let's Explore",
    },
    {
      id: 3,
      image: hero2,
      heading: "Discover Diverse Courses and Subjects",
      description:
        "Expand your horizons with our comprehensive range of courses and subjects, designed to provide valuable knowledge and skills for your college journey. Explore our offerings today and shape your academic future",
      button: "Let's Go",
    },
  ];

  // Handle slider controllers -------------------
  const slideLeft = () => {
    setIndex(index === 0 ? 2 : (prev)=>prev-1);
  };
  const slideRight = () => {
    setIndex(index === 2 ? 0 : (prev)=>prev+1);
  };

  return (
    <main className={styles.container}>
      <div className={`${styles.main}`}>
        {/* First Slide */}

        {imageUrl.map((item,i) => (
          <div key={i} style={{transform:`translateX(-${index * 93}vw)`}} className={`${styles.one} grid grid-two`}>
            {/* left slide */}
            <div className={styles.left}>
              <h1 className={styles.heading}>{item.heading}</h1>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.buttonContainer}>
                <button className={"fancyButton"}>{item.button}</button>
              </div>
            </div>

            {/* Right side */}
            <div className={styles.right}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={item.image}
                  alt="hero Image"
                  width={10000}
                  height={10000}
                />
              </div>
            </div>
          </div>
        ))}
        {/* Slide buttons */}
        <div className={styles.slideButtons}>
          <div className={styles.buttonManager}>
            <div onClick={slideLeft} className={styles.buttonBox}>
              ←
            </div>
            <div onClick={slideRight} className={styles.buttonBox}>
              →
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Carosile;
