import React from "react";
import HorSlider from "./HorSlider";
import { useProductsByFilter } from "../hooks";

const ShopBy = ({ filter, title }) => {
  const { data: products = [], error, isLoading } = useProductsByFilter(filter);

  return (
    <>
      <div className="mt-10 mb-2 text-2xl">{title}</div>
      <div className="overflow-x-auto overflow-y-hidden md:max-w-full scroll-container mb-10 mx-auto relative scroll-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error while fetching: {error.message}</p>}

        <div className="flex flex-nowrap space-x-4">
          {products.map((elem) => (
            <HorSlider
              product={elem}
              key={elem._id || elem.id}
              className="inline-block"
              home={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopBy;
