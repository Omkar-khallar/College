"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { ToogleContext } from "@/store/context";
import Carosile from "@/components/Carosile/Carosile";
import BookShell from "@/components/BookShell/BookShell";
import Counter from "@/components/Counter/Counter";
import Contact from "@/components/Contact/Contact";
import Testmonial from "@/components/Testmonial/Testmonial";
import Footer from "@/components/Footer/Footer";
import ProfileUpdate from "@/components/ProfileUpdate/ProfileUpdate";
import { useSession } from "next-auth/react";
import getUser from "./getUser";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function Home() {
  const { toogle } = useContext(ToogleContext);
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
    <>
      <div className={toogle === true ? "containerExpand" : "mainContainer"}>
        {status === "loading" ? <LoadingScreen/>:<>
        <Carosile />
        {status === "authenticated" ? userData.role === "Student" ? userData.subject == "" ? <ProfileUpdate /> : "" : "" : <ProfileUpdate />}
        {status === "authenticated" ? userData.role === "Student" && userData.subject != "" && <BookShell /> : ""}
        <Counter />
        {/* <Testmonial /> */}
        <Contact />
        <Footer /></>}
      </div>
    </>
  );
}
