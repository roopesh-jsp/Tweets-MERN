import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log("error connecting to Database");
    console.log(error);
  }
};
