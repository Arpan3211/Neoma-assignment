import { Product } from "../mongoDB/productSchema.js";

// function for search products by name 
export const SearchProducts = async (req, res) => {
    try {
        // getting the name in response
        const { name } = req.query;
// error handeling for name or given or not
        if (!name) {
            return res.status(400).json({ error: "Please provide a name to search." });
        }

        // finding the products by name -- using regex for search in case-insensitive  -- $options: 'i' --
        const products = await Product.find({ title: { $regex: name, $options: 'i' } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// filter products by category and price 
export const FilterProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;

        // Create an empty filter object and storing category and minprice, maxprice for filtering query
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        } else if (minPrice !== undefined) {
            filter.price = { $gte: Number(minPrice) };
        } else if (maxPrice !== undefined) {
            filter.price = { $lte: Number(maxPrice) };
        }

        // Find products in the database that match the constructed filter
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
