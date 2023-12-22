import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/db.js";
import bodyParser from 'body-parser';
import productRoutes from "./routes/productRoutes.js";

// for load .env file configs ( info )
dotenv.config();

const app = express();

// Middleware's
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());


// routes implement with first end point as /api and rest of the route's( end points ) are in routs folder and files's
app.use('/api', productRoutes);


// home page 
app.get("/", (req, res) => {
    res.send("<h1>Welcome to E-Commerce store by Neoma</h1>");
});


const PORT = process.env.PORT || 7080;

// node server start function with connecting mongoDB 
const serverStart = async () => {
    try {
        connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () =>
            console.log("server is running on port 7080"))
    } catch (error) {
        console.log(error)
    }
};

serverStart();

export default app;