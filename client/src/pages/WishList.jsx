import React from 'react';
import box from "/box.png";
import { Empty, Error, Loading } from '../components/Loading';
import { useWishList } from '../context/WishListContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useProductsByIds } from '../hooks';

const WishList = () => {
  const { toggleItemCart, cartList } = useCart();
  const { toggleItemWishList, list } = useWishList();

  const { data: products = [], error, isLoading } = useProductsByIds(list);

  return (
    <div className="xs:w-[95vw] md:w-full mx-auto py-8">
      {isLoading && <Loading />}
      {error && <Error error={error} />}
      {products.length === 0 ? (
        <Empty page="wishlist" img={box} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">Your Wishlist</h1>
          <div className="grid grid-cols-2 md:w-5/6 md:mx-auto sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-1 border-1 hover:border-black xs:w-full h-[300px] overflow-hidden relative flex flex-col"
              >
                <button
                  onClick={() => toggleItemWishList(product._id)}
                  className="absolute top-0 right-0 xs:text-xs  text-white rounded-full w-8 h-8  hover:scale-110"
                >
                  ❌
                </button>
                <Link
                  to={`/product-details/${product._id}`}
                  className="xs:w-2/3 xs:h-1/2  m-auto flex items-center justify-center"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="xs:h-1/2 sm:h-2/3"
                  />
                </Link>
                <div className=" flex flex-col justify-end flex-grow ">
                  <div className='flex justify-end my-auto items-start flex-col'>
                    <h2 className="text-base font-semibold text-gray-800">{product.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Price: {`\u20B9 ${new Intl.NumberFormat('en-IN').format(product.sellPrice)}`}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleItemCart(product._id)}
                    className={`text-sm w-full py-2 rounded-md border-1 hover:border-black hover:bg-opacity-90`}
                  >
                    {cartList.includes(product._id) ? 'Remove from cart' : 'Add to cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
