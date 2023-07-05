"use client";

import axios from "axios";

const getUser = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/user/${id}`);
    return res.data.userData;
  } catch (error) {
    console.log(error);
    return "User Not Fetched"
  }
};


export default getUser;