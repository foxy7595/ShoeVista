import express from "express";
import {
    addProduct,
    filterProducts,
    getBestSellers,
    getByBrand,
    getByCategory,
    getProduct,
    getProducts,
    getTopRated,
    listOfProducts,
    searchProducts,
}
    from "../controllers/productControllers.js";

const router = express.Router();

//Route to get all products
router.get('/', getProducts);

//Route to get a single product by id
router.get('/product/:id', getProduct);

//Route to add a product
router.post("/product", addProduct);

//Route to send products based on men,women and kid
router.get('/category/:category', getByCategory);

//Route to get top rated products
router.get('/filter/topRated', getTopRated);

//Route to get best sellers
router.get('/filter/bestSellers', getBestSellers);

//Route to filter by type (topRated, bestSellers, etc)
router.get('/filter/:type', async (req, res) => {
    const { type } = req.params;
    if (type === 'topRated') {
        return getTopRated(req, res);
    } else if (type === 'bestSellers') {
        return getBestSellers(req, res);
    }
    return res.status(400).json({ message: 'Invalid filter type' });
});

//Route to search for an item
router.get('/products/search', searchProducts)

//Route to sort products
// router.get('/products/:category/sortby/:criteria/:order', sortProducts)

//Route to filter products
router.get('/products/filterBy', filterProducts)

//Route to get list of products
router.get('/products/:list', listOfProducts)

//Route to get products by brand
router.get('/brand/:brand', getByBrand)


export default router;