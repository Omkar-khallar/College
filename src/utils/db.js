import mongoose from "mongoose";
// console.log(process.env.DB);

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connection SuccessFul");
  } catch (error) {
    console.log("connection UnSuccessFul !!!");
    console.log(error);
  }
}

export default connection;
