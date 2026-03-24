import Products from "../models/productModel.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { cacheHeaders } from "../middleware/cacheHeaders.js";
import { getPagination, paginateResponse } from "../utils/pagination.js";
import { buildProductFilter, findProducts } from "../utils/queryBuilder.js";
import { normalizeCategory, PRODUCT_PROJECTION } from "../utils/validators.js";

//Get all products with optional pagination
export const getProducts = asyncHandler(async (req, res) => {
    const { page, limit = 50 } = req.query;

    // If no page parameter, return all products (backward compatibility)
    if (!page) {
        const products = await Products.find().select(PRODUCT_PROJECTION).lean();
        return res.status(200).json(products);
    }

    const { skip, limit: limitNum, page: pageNum } = getPagination(page, limit);

    const [products, total] = await Promise.all([
        Products.find().select(PRODUCT_PROJECTION).skip(skip).limit(limitNum).lean(),
        Products.countDocuments()
    ]);

    res.status(200).json(paginateResponse(products, pageNum, limitNum, total));
});

//Get single product by id
export const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id).lean();

    if (!product) {
        return res.status(404).json({ message: "Product doesn't exist." });
    }

    res.status(200).json(product);
});

//Add a product
export const addProduct = asyncHandler(async (req, res) => {
    const { img, brand, title, rating, reviews, sellPrice, orders, mrp, discount, category } = req.body;

    // Input validation
    if (!img || !brand || !title || !category) {
        return res.status(400).json({ message: "Missing required fields: img, brand, title, category" });
    }

    if (typeof sellPrice !== 'number' || sellPrice <= 0) {
        return res.status(400).json({ message: "sellPrice must be a positive number" });
    }

    if (rating && (rating < 0 || rating > 5)) {
        return res.status(400).json({ message: "rating must be between 0 and 5" });
    }

    if (reviews && reviews < 0) {
        return res.status(400).json({ message: "reviews cannot be negative" });
    }

    if (mrp && typeof mrp !== 'number') {
        return res.status(400).json({ message: "mrp must be a number" });
    }

    if (discount && (discount < 0 || discount > 100)) {
        return res.status(400).json({ message: "discount must be between 0 and 100" });
    }

    const newProduct = await Products.create({
        img, brand, title, rating, reviews, sellPrice, orders, mrp, discount, category
    });

    res.status(201).json({ message: "Product created successfully", product: newProduct });
});

//Get products by Category
export const getByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const { page, limit = 50 } = req.query;
    const dbCategory = normalizeCategory(category);

    // If no page parameter, return all products (backward compatibility)
    if (!page) {
        const products = await Products.find({ category: dbCategory })
            .select(PRODUCT_PROJECTION)
            .lean();
        return res.status(200).json(products);
    }

    const { skip, limit: limitNum, page: pageNum } = getPagination(page, limit);

    const [products, total] = await Promise.all([
        Products.find({ category: dbCategory })
            .select(PRODUCT_PROJECTION)
            .skip(skip)
            .limit(limitNum)
            .lean(),
        Products.countDocuments({ category: dbCategory })
    ]);

    res.status(200).json(paginateResponse(products, pageNum, limitNum, total));
});

//Get top rated
export const getTopRated = asyncHandler(async (req, res) => {
    const { limit = 12 } = req.query;

    const topRatedShoes = await Products.find()
        .select(PRODUCT_PROJECTION)
        .sort({ rating: -1 })
        .limit(parseInt(limit))
        .lean();

    res.status(200).json(topRatedShoes);
});

//Get best Sellers
export const getBestSellers = asyncHandler(async (req, res) => {
    const { limit = 12 } = req.query;

    const products = await Products.find()
        .select(PRODUCT_PROJECTION)
        .sort({ reviews: -1 })
        .limit(parseInt(limit))
        .lean();

    res.status(200).json(products);
});

//Get search results with optimized search
export const searchProducts = asyncHandler(async (req, res) => {
    let query = req.query.q ? req.query.q.trim() : '';

    if (query.length === 0) {
        return res.status(400).json({ message: "Empty search field" });
    }

    // Normalize search terms
    query = query
        .replace('sneakers', 'sneaker')
        .replace(/kids|boys|girls/gi, "child")
        .replace(/mens/gi, "men")
        .replace(/womens/gi, "women")
        .replace(/\b(shoe|shoes)\b/gi, ' ')
        .replace(/'/g, '')
        .trim();

    const terms = query.split(/\s+/).filter(Boolean);

    // Use text search index for better performance
    let results;
    if (terms.length === 1) {
        results = await Products.find({
            $or: [
                { title: { $regex: terms[0], $options: "i" } },
                { brand: { $regex: terms[0], $options: "i" } },
                { category: { $regex: terms[0], $options: "i" } }
            ]
        }).select(PRODUCT_PROJECTION).lean();
    } else {
        // Use text search for multiple terms
        results = await Products.find({
            $text: { $search: query }
        }).select(PRODUCT_PROJECTION).lean();
    }

    res.json(results);
});

//Filter products with refactored filter builder
export const filterProducts = asyncHandler(async (req, res) => {
    const filter = buildProductFilter(req.query);

    const result = await findProducts(filter, {
        projection: PRODUCT_PROJECTION
    });

    if (result.length === 0) {
        return res.status(404).json({ message: 'No products found matching the criteria.' });
    }

    res.status(200).json(result);
});

//Get list of products by IDs
export const listOfProducts = asyncHandler(async (req, res) => {
    const { list } = req.params;

    if (!list) {
        return res.status(400).json({ message: "No product IDs provided" });
    }

    const idArray = list.split(',').map(id => id.trim()).filter(Boolean);

    if (idArray.length === 0) {
        return res.status(400).json({ message: "No valid product IDs provided" });
    }

    const result = await Products.find({ _id: { $in: idArray } })
        .select(PRODUCT_PROJECTION)
        .lean();

    res.status(200).json(result);
});

// Get products by brand (new endpoint for BestSellers component)
export const getByBrand = asyncHandler(async (req, res) => {
    const { brand } = req.params;
    const { limit = 6 } = req.query;

    const products = await Products.find({ brand: new RegExp(brand, 'i') })
        .select(PRODUCT_PROJECTION)
        .limit(parseInt(limit))
        .lean();

    res.status(200).json(products);
});
