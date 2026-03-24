import React from 'react';
import Products from '../components/Products';
import { useProductsByCategory } from '../hooks';

const Women = () => {
  const { data: products = [], error, isLoading } = useProductsByCategory('women');
  const sortedProducts = [...products].sort((a, b) => parseInt(b.reviews) - parseInt(a.reviews));

  return (
    <>
      <Products loading={isLoading} error={error} products={sortedProducts} />
    </>
  );
};

export default Women;
