import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/productService';

export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAll,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useProduct = (id, options = {}) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useProductsByCategory = (category, options = {}) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productApi.getByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useProductSearch = (query, options = {}) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productApi.search(query),
    enabled: !!query && query.length >= 2,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useProductsByBrand = (brand, options = {}) => {
  return useQuery({
    queryKey: ['products', 'brand', brand],
    queryFn: () => productApi.getByBrand(brand),
    enabled: !!brand,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useProductsBySubcategory = (subcategory, options = {}) => {
  return useQuery({
    queryKey: ['products', 'subcategory', subcategory],
    queryFn: () => productApi.getBySubcategory(subcategory),
    enabled: !!subcategory,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useProductsByFilter = (filterType, options = {}) => {
  return useQuery({
    queryKey: ['products', 'filter', filterType],
    queryFn: () => productApi.getByFilter(filterType),
    enabled: !!filterType,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useProductsByBrandFilter = (brand, options = {}) => {
  return useQuery({
    queryKey: ['products', 'brandFilter', brand],
    queryFn: () => productApi.filterByBrand(brand),
    enabled: !!brand,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useProductsByIds = (ids, options = {}) => {
  return useQuery({
    queryKey: ['products', 'ids', ids],
    queryFn: () => productApi.getByIds(ids),
    enabled: !!ids && Array.isArray(ids) && ids.length > 0,
    staleTime: 3 * 60 * 1000,
    ...options,
  });
};
