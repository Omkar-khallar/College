"use client"
import React, { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";
import styles from "./Counter.module.css";

const Counter = () => {
    const [countOn,setCountOn] = useState(false);
  return (
    <>
    <ScrollTrigger onEnter={()=>setCountOn(true)}>
    <div className={styles.outer}>
      <div className={`${styles.inner} grid grid-four`}>
        {/* <div className={`${styles.outerBox} grid grid-two`}> */}
          <div className={styles.box}>
            <h3 className={styles.heading}>{countOn == true ? <CountUp start={0} end={1000} duration={4} delay={0} /> : 0} + </h3>
            <p className={styles.name}>Students</p>
          </div>
        
          <div className={styles.box}>
            <h3 className={styles.heading}>{countOn == true ? <CountUp start={0} end={100} duration={4} delay={0} /> : 0} + </h3>
            <p className={styles.name}>Teachers</p>
          </div>
        {/* </div> */}
        {/* <div className={`${styles.outerBox} grid grid-two`}> */}
          <div className={styles.box}>
            <h3 className={styles.heading}>{countOn == true ? <CountUp start={0} end={30} duration={4} delay={0} /> : 0} + </h3>
            <p className={styles.name}>Courses</p>
          </div>
        
          <div className={styles.box}>
            <h3 className={styles.heading}>{countOn == true ? <CountUp start={0} end={700} duration={4} delay={0} /> : 0} + </h3>
            <p className={styles.name}>Subjects</p>
          </div>
        {/* </div> */}
      </div>
    </div>
    </ScrollTrigger>
    </>
  );
};

export default Counter;
