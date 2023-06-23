"use client"
import React from "react";
import styles from "./subject.module.css";
import Card from "@/components/card/Card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  
  const {data:session,status} = useSession();
    const Router = useRouter();

  if(status === ("unauthenticated" || "loading")){
    Router?.push("/auth/login");
  }
  return (
    <>
      <div className={styles.container}>
      {status === ("unauthenticated" || "loading") && " "}
        {status === "authenticated"  && (<>
        <h2 className={styles.heading}>Subjects</h2>
        <div className={styles.wrapper}>
          <Card name={"OS"} />
        </div></>)}
      </div>
    </>
  );
};

export default page;
