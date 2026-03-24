// Pagination helper
export const getPagination = (page = 1, limit = 12) => {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 12;
    const skip = (pageNum - 1) * limitNum;

    return {
        skip,
        limit: limitNum,
        page: pageNum
    };
};

// Build pagination response
export const paginateResponse = (data, page, limit, total) => {
    const totalPages = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
};
