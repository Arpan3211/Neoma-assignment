import { Product } from "../mongoDB/productSchema.js";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

// dotenv config for accessing .env file variables
dotenv.config();

// cloudinary config for store images in cloud 
cloudinary.config({
    //values are accessing from .env file 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// handleImageUploadOrUseURL function for cheack the given response for thumbinal and images are string URL are image file
const handleImageUploadOrUseURL = async (image) => {
    // cheacking the response in URL or not
    const isURL = /^https?:\/\//.test(image);

    // if it's URl than return and if it's image file than first store in cloudinary and return the cloud image URL
    if (isURL) {
        return image;
    } else {
        const uploadedImage = await cloudinary.uploader.upload(image, { folder: 'products' });
        return uploadedImage.secure_url;
    }
};


// ----- CRUD operation controller's functions ------

// function for get all the products from mongoDB database
export const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// function for create new products and store in mongoDB database
export const CreateProduct = async (req, res) => {
    try {
        // getting all the field's as req.body 
        const {
            title,
            description,
            brand,
            category,
            thumbnail,
            images,
            rating,
            price,
            discountPercentage,
            stock
        } = req.body;

        // mandatery field's for create new products if one of tham is not given the error is showen 
        if (!title || !description || !brand || !category) {
            return res.status(400).json({ error: "Please provide all required fields." });
        }

  // cheacking the response the image or string URL and create the url if response is image;
        const thumbnailURL = await handleImageUploadOrUseURL(thumbnail);

        const imagesURLs = await Promise.all(images.map(async (image) => {
            return await handleImageUploadOrUseURL(image);
        }));

// create newProducts and store in mongoDB
        const newProduct = await Product.create({
            title,
            description,
            brand,
            category,
            thumbnail: thumbnailURL,
            images: imagesURLs,
            rating: rating || 0,
            price: price || 0,
            discountPercentage: discountPercentage || 0,
            stock: stock || null
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// function to update rating 
export const UpdateRating = async (req, res) => {
    try {
        // we need id and rating as a response 
        const { id } = req.params;
        const { rating } = req.body;

        if (!id || !rating) {
            return res.status(400).json({ error: "Please provide product ID and new rating value." });
        }
// updating rating by using mongoDB objectID
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: { rating } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// function for update the changes in products by cheacking ID
export const UpdateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// function for delete the product by cheacking ID
export const DeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};