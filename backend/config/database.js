import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    dbName: "Samad-Zomato",
  })
  .then(() => console.log("Db connected successfully"))
  .catch((error) => {
    console.log("DB Connection Failed");
    console.error(error);
    process.exit(1);
  });
};

export default { connect };