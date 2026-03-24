import React, { useMemo } from 'react';
import { Error, Loading } from './Loading';
import HorSlider from './HorSlider';
import { useProductsByCategory } from '../hooks';

const Similar = ({ gender, id }) => {
  const { data: products = [], error, isLoading } = useProductsByCategory(gender);

  const filteredProducts = useMemo(() => {
    return products
      .slice(0, 15)
      .filter(elem => elem._id !== id);
  }, [products, id]);

  return (
    <>
      <div className='xs:w-[95vw] md:max-w-screen-xl mx-auto overflow-x-scroll overflow-y-hidden scroll-container'>
        {isLoading && <Loading />}
        {error && <Error error={error} />}
        <div className='flex flex-nowrap'>
          {filteredProducts.map(elem => (
            <HorSlider product={elem} key={elem._id} className="inline-block" />
          ))}
        </div>
      </div>
    </>
  );
};

export default Similar;
