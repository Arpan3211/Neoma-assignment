import express from "express";
import { 
    GetAllProducts, 
    CreateProduct, 
    UpdateRating, 
    UpdateProduct, 
    DeleteProduct } from "../controllers/productController.js";
import { SearchProducts, FilterProducts } from "../controllers/search&filterController.js";

const router = express.Router();

// maintaining routs end points with function's controller that perform the operation for that end points 
router.get("/products", GetAllProducts);
router.post("/products", CreateProduct);
router.put("/products/:id/rating", UpdateRating);
router.delete("/products/:id", DeleteProduct);
router.put("/products/:id", UpdateProduct);
router.get("/products/search", SearchProducts);
router.get('/products/filter', FilterProducts);

export default router; 