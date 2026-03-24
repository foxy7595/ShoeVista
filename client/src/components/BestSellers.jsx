import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductsByBrandFilter } from "../hooks";

const BestSellers = () => {
  const navigate = useNavigate();

  const adidasQuery = useProductsByBrandFilter('Adidas');
  const nikeQuery = useProductsByBrandFilter('Nike');
  const skechersQuery = useProductsByBrandFilter('Skechers');
  const pumaQuery = useProductsByBrandFilter('Puma');

  const queries = [adidasQuery, nikeQuery, skechersQuery, pumaQuery];
  const isLoading = queries.some(q => q.isLoading);

  const products = React.useMemo(() => {
    const allProducts = [];
    queries.forEach(query => {
      if (query.data && Array.isArray(query.data)) {
        allProducts.push(...query.data);
      }
    });
    return allProducts
      .filter((product, index, self) =>
        index === self.findIndex((p) => p._id === product._id)
      )
      .slice(0, 8);
  }, [queries]);

  const data = [
    { src: "/GenInfo/adidas.jpg", name: "Adidas", to: "/search/adidas" },
    { src: "/GenInfo/nike.png", name: "Nike", to: "/search/nike" },
    { src: "/GenInfo/skechers.jpg", name: "Skechers", to: "/search/skechers" },
    { src: "/GenInfo/puma.jpg", name: "Puma", to: "/search/puma" },
  ];

  return (
    <div className="flex flex-col items-center my-16 w-full">
      <p className="font-bold mb-6">Best Sellers</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {data.map((elem, id) => {
            // Get first product for this brand to display
            const brandProduct = products.find(p =>
              p.brand && elem.name && p.brand.toLowerCase() === elem.name.toLowerCase()
            );

            return (
              <div
                key={id}
                className="relative w-[340px] h-[340px] mx-2 mb-6 hover:text-white"
              >
                <div className="absolute w-full flex justify-center items-center top-4">
                  <p className="logo font-semibold z-50">{elem.name}</p>
                </div>
                <img
                  src={brandProduct ? brandProduct.img : elem.src}
                  alt={elem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => navigate(elem.to)}
                  className="absolute inset-0 flex items-center justify-center
                                 bg-gray-800 text-white opacity-0 hover:opacity-80 transition-opacity duration-200"
                >
                  Explore →
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BestSellers;
