import Products from "../models/productModel.js";
import { validateRating, validatePriceRange, validateDiscount, normalizeCategory } from "./validators.js";

// Build product filter query object
export const buildProductFilter = (queryParams) => {
    const { brand, rating, category, price, discount } = queryParams;
    const filter = {};

    if (brand) {
        filter.brand = new RegExp(brand, 'i');
    }

    if (rating) {
        const ratingValue = validateRating(rating);
        if (ratingValue) {
            filter.rating = { $gte: ratingValue };
        }
    }

    if (category) {
        filter.category = normalizeCategory(category);
    }

    if (price) {
        const priceRange = validatePriceRange(price);
        if (priceRange) {
            filter.sellPrice = priceRange;
        }
    }

    if (discount) {
        const discountFilter = validateDiscount(discount);
        if (discountFilter) {
            filter.discount = discountFilter;
        }
    }

    return filter;
};

// Execute product query with filters
export const findProducts = async (filter = {}, options = {}) => {
    const {
        sort = {},
        skip = 0,
        limit = 0,
        projection = null
    } = options;

    const query = Products.find(filter);

    if (projection) {
        query.select(projection);
    }

    if (Object.keys(sort).length > 0) {
        query.sort(sort);
    }

    if (skip > 0) {
        query.skip(skip);
    }

    if (limit > 0) {
        query.limit(limit);
    }

    return await query.lean().exec(); // lean() for better performance
};
