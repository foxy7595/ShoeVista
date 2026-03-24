// Cache headers middleware
export const cacheHeaders = (maxAge = 300) => (req, res, next) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    next();
};

// No cache for dynamic data
export const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
};
