// Filter validation helpers
export const validateRating = (rating) => {
    const value = parseFloat(rating);
    return !isNaN(value) && value >= 1 && value <= 5 ? value : null;
};

export const validatePriceRange = (price) => {
    if (!price) return null;

    const priceRangeMatch = price.match(/₹(\d+)-₹(\d+)/);
    if (priceRangeMatch) {
        const minPrice = parseFloat(priceRangeMatch[1].replace(',', ''));
        const maxPrice = parseFloat(priceRangeMatch[2].replace(',', ''));
        return { $gte: minPrice, $lte: maxPrice };
    }

    if (price === "₹3000+") {
        return { $gte: 3000 };
    }

    return null;
};

export const validateDiscount = (discount) => {
    if (!discount) return null;

    const discountMatch = discount.match(/(\d+)%/);
    if (discountMatch) {
        const value = parseInt(discountMatch[1], 10);
        return { $gte: value };
    }

    return null;
};

export const normalizeCategory = (category) => {
    if (!category) return null;

    const categoryMap = {
        'Unisex': 'adult',
        'Kids': 'child',
        'Men': 'men',
        'Women': 'women'
    };

    return categoryMap[category] || category.toLowerCase();
};

// Product field projection - only return needed fields
export const PRODUCT_PROJECTION = {
    _id: 1,
    img: 1,
    brand: 1,
    title: 1,
    rating: 1,
    reviews: 1,
    sellPrice: 1,
    orders: 1,
    mrp: 1,
    discount: 1,
    category: 1
};
