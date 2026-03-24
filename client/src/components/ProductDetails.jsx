import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Error, Loading } from './Loading';
import Similar from './Similar';
import ReactStars from 'react-stars';
import { useWishList } from '../context/WishListContext';
import { useCart } from '../context/CartContext';
import { useProduct } from '../hooks';

const ProductDetails = () => {
  const { toggleItemWishList, list } = useWishList();
  const { toggleItemCart, cartList } = useCart();
  const { id } = useParams();
  const [count, setCount] = useState(1);

  const { data: product, error, isLoading } = useProduct(id);

  const incCount = () => {
    if (count >= 5) return alert("You can only purchase a maximum of 5 units per item.");
    setCount(prev => prev + 1);
  };

  const decCount = () => {
    if (count <= 1) return alert("The quantity cannot be less than 1.");
    setCount(prev => prev - 1);
  };

  const desc = `Lorem ipsum dolor sit amet consectetur adipisicing elit.Sequi,
    laudantium? Quaerat, magni.Consectetur modi vel adipisci voluptatum tenetur
    repellendus non vero eveniet, quia laborum tempora saepe aut labore deleniti
    assumenda! Lorem ipsum dolor sit amet consectetur adipisicing elit.Sequi,
    laudantium? Quaerat, magni.Consectetur modi vel adipisci voluptatum tenetur
    repellendus non vero eveniet, quia laborum tempora saepe aut labore deleniti
    assumenda!`;

  return (
    <>
      {isLoading ? <Loading /> : error ? <Error error={error} /> : (
        <div className='xs:w-[95vw] sm:w-[90vw] md:w-full md:max-w-screen-xl mx-auto my-6'>
          <div className='flex xs:justify-start xs:items-start xs:p-4 md:p-8 md:mx-4 md:justify-between md:items-start border-2 xs:flex-col md:flex-row '>
            <div className='md:w-2/3 xs:w-full relative md:border-r-1 md:pr-2 '>
              <button onClick={() => toggleItemWishList(product._id)} className='z-20 absolute top-0 right-2 md:right-4 w-4 h-4'>
                {list.includes(product._id) ? "❤️" : "🤍"}
              </button>
              <img src={product.img} alt={product.title} className='md:w-2/3 m-auto xs:my-8 ' />
            </div>
            <div className='md:w-1/2 xs:w-full flex flex-col md:justify-between md:pl-4 md:ml-4 h-full'>
              <div>
                <p className='text-3xl font-bold'>{product.title}</p>
                <p className='text-gray-500'>{product.brand}</p>
              </div>
              <div className='flex gap-2 items-baseline mb-4'>
                <p className='text-xl font-semibold'>
                  {`\u20B9 ${new Intl.NumberFormat('en-IN').format(product.sellPrice)}`}
                </p>
                <p className='line-through text-sm text-gray-500'>{product.mrp} </p>
                {product.discount ? (
                  <span className='text-sm text-red-500 md:px-2'>{product.discount}% off</span>
                ) : ''}
              </div>
              <div className='flex flex-col mb-4 '>
                <div className='flex gap-2 items-baseline'>
                  <p className='flex items-center'>
                    {product.rating}
                    <ReactStars
                      count={5}
                      value={product.rating}
                      size={24}
                      color2={'#FFD700'}
                      color1={'#e7e7e7'}
                      edit={false}
                      half={true}
                    />
                  </p>
                  <p className='xs:text-xs sm:text-base'> {product.reviews} reviews</p>
                </div>
                <p className='text-gray-500 text-sm'>{product.orders ? product.orders + ` bought in past month` : ''} </p>
              </div>
              <div className='md:w-1/2 flex justify-start items-baseline my-2'>
                <button onClick={decCount} className='w-1/6 text-sm border-2 border-gray-500 hover:text-white hover:bg-black '>-</button>
                <p className='w-1/6 text-sm text-center border-t-2 border-b-2 border-gray-500'>{count}</p>
                <button onClick={incCount} className='w-1/6 text-sm border-2 border-gray-500 hover:text-white hover:bg-black '>+</button>
              </div>
              <div className='flex justify-between flex-col items-baseline '>
                <button
                  className='xs:w-full sm:w-1/2 md:w-2/3 lg:w-1/2 py-2 mt-1 border-2 border-black hover:text-white hover:bg-black text-sm uppercase tracking-wider'
                  onClick={() => toggleItemCart(product._id)}
                >{cartList.includes(product._id) ? 'Remove from ' : "Add to "} Cart</button>
                <button
                  className='xs:w-full sm:w-1/2 md:w-2/3 lg:w-1/2 py-2 mt-1 border-2 border-black hover:text-white hover:bg-black text-sm uppercase tracking-wider'
                > Buy now</button>
              </div>
            </div>
          </div>
          <div className='mt-8  md:mx-4'>
            <p className='text-xl font-bold'>Description :</p>
            <p className='xs:w-full md:w-1/2'>{desc + desc}</p>
          </div>
          <p className='text-2xl mt-16 uppercase  md:mx-4'>You may also like</p>
          <Similar gender={product.category} id={id} home={1} />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
