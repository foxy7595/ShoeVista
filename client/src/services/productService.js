import api from './api';

export const productApi = {
  getAll: () => api.get('/api/products'),
  getById: (id) => api.get(`/api/product/${id}`),
  getByCategory: (category) => api.get(`/api/category/${category}`),
  search: (query) => api.get(`/api/products/search`, { params: { q: query } }),
  getByBrand: (brand) => api.get(`/api/brand/${brand}`),
  getBySubcategory: (subcategory) => api.get(`/api/subcategory/${subcategory}`),
  filter: (params) => api.get('/api/products/filter', { params }),
  filterByBrand: (brand) => api.get('/api/products/filterBy', { params: { brand } }),
  getByFilter: (filterType) => api.get(`/api/filter/${filterType}`),
  getByIds: (ids) => api.get(`/api/products/${Array.isArray(ids) ? ids.join(',') : ids}`),
  filterBy: (params) => api.get('/api/products/filterBy', { params }),
};
