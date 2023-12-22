import mongoose from 'mongoose';

// using mongoose to build schema for products and stored in a products collection in mongoDB
const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: { type: Number, default: null },
    discountPercentage: { type: Number, default: null },
    rating: { type: Number, default: 0 }, 
    stock: { type: Number, default: null },
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
});

export const Product = mongoose.model('products', productSchema);
