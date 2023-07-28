"use client";

import axios from "axios";

const getUser = async (id) => {
  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  try {
    const res = await axios.get(`${URL}/api/user/${id}`);
    return res.data.userData;
  } catch (error) {
    console.log(error);
    return "User Not Fetched"
  }
};


export default getUser;