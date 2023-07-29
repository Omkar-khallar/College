"use client";
import { useEffect, useState } from "react";
import styles from "./ProfileUpdate.module.css";
import Image from "next/image";
import star from "../../../public/images/star.png";
import { useSession } from "next-auth/react";
import getUser from "@/app/getUser";
import Link from "next/link";

const ProfileUpdate = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const id = session?.user?._id;

  useEffect(() => {
    const getData = async () => {
      const res = await getUser(id);
      setUserData(res);
    };
    id && getData();
  }, [session?.user]);
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.box}>
          <div className={styles.upperBorder}></div>
          <div className={styles.imageContainer}>
            <Image src={star} className={styles.star} alt="star image" />
          </div>
          <h2 className={styles.name}>
            Hi {status === "authenticated" ? userData.name : "User"}
          </h2>
          {status === "authenticated" ? (
            <p className={styles.desc}>
              Unlock personalized course recommendations. Update your subject
              field for enhanced learning experience.
            </p>
          ) : (
            <p className={styles.desc}>
              Unlock the full potential of your college experience. Login to
              unleash enhanced website functionalities.
            </p>
          )}
          {status === "authenticated" ? (
            <Link href="/profile">
              <button className={styles.gradiantButton}>Lets Go</button>
            </Link>
          ) : (
            <Link href="/auth/login">
            <button className={styles.gradiantButton}>Log in</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
