import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Error, Loading } from './Loading';
import Products from './Products';
import { useProductSearch } from '../hooks';

const SearchResults = () => {
  const { search } = useParams();
  const { data: products = [], error, isLoading } = useProductSearch(search);

  const filteredProducts = useMemo(() => {
    if (search.includes('women')) {
      return products.filter(elem => elem.category === 'women');
    }
    return products.slice(0, 50);
  }, [products, search]);

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error error={error} />}
      <Products products={filteredProducts} error={error} loading={isLoading} />
    </>
  );
};

export default SearchResults;
