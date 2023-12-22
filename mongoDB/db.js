import mongoose from "mongoose";

// function for connecting with mongoDB this function is userd in server.js file for connecting with mongoDB 
const connectDB = (url) => {
  // using mongoose library to connect with mongoDb and implement schema for products in productsSchema.js file
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err));
};

export default connectDB;