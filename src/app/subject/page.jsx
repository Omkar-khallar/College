import React from "react";
import styles from "./subject.module.css";
import Card from "@/components/card/Card";

const page = () => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>Subjects</h2>
        <div className={styles.wrapper}>
          <Card name={"OS"} />
        </div>
      </div>
    </>
  );
};

export default page;
