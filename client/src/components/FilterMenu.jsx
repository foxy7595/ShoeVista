import React, { forwardRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const FilterMenu = forwardRef(({ setData, isVisible, setVisibility }, ref) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterBy, setFilterBy] = useState({
    brand: "",
    rating: "",
    category: "",
    price: "",
    discount: ""
  });

  const filterBtns = [
    { name: "Brand", values: ["adidas", "Puma", "Skechers", "Nike"] },
    { name: "Price", values: ["₹0-₹1000", "₹1000-₹2000", "₹2000-₹3000", "₹3000+"] },
    { name: "Category", values: ["Men", "Women", "Kids", "Unisex"] },
    { name: "Rating", values: ["1⭐ & Up", "2⭐ & Up", "3⭐ & Up", "4⭐ & Up"] },
    { name: "Discount", values: ["Over 10%", "Over 20%", "Over 30%", "Over 40%", "Over 50%", "Over 60%"] },
  ];

  const toggleFilterMenu = () => setVisibility(prev => !prev);
  const openSubMenu = (index) => setActiveFilter(prev => (prev === index ? null : index));

  const handleFilterChange = (category, value) => {
    if (filterBy[category] === value) {
      return setFilterBy(prev => ({ ...prev, [category]: '' }));
    }
    setFilterBy(prev => ({ ...prev, [category]: value }));
  };

  const { refetch } = useQuery({
    queryKey: ['products', 'filtered', filterBy],
    queryFn: async () => {
      const queryString = new URLSearchParams(filterBy).toString();
      return await api.get(`/api/products/filterBy?${queryString}`);
    },
    enabled: false,
  });

  const handleFilter = async () => {
    const hasActiveFilters = Object.values(filterBy).some(val => val !== "");
    if (!hasActiveFilters) {
      setData([]);
      setVisibility(false);
      return;
    }
    const result = await refetch();
    if (result.data) {
      setData(result.data);
    }
    setVisibility(false);
  };

  return (
    <div className='xs:mx-2 md:text-base' ref={ref}>
      <button
        className='border-1 border-gray-600 px-4 sm:py-1 hover:bg-gray-900 hover:text-white cursor-pointer'
        onClick={toggleFilterMenu}
        aria-expanded={isVisible}
        aria-haspopup="true"
      >
        Filter
      </button>
      {isVisible && (
        <div className='flex flex-col z-20 absolute xs:right-2 md:right-0 shadow-lg bg-white'>
          {filterBtns.map((btn, index) => (
            <div key={index} className='flex flex-col w-[200px] '>
              <button
                className='w-full pr-6 pl-4 md:py-1 text-left border-1 border-gray-100 hover:bg-gray-900 hover:text-white'
                onClick={() => openSubMenu(index)}
              >
                {btn.name}
                <span className='float-right'>{activeFilter === index ? '−' : '+'}</span>
              </button>
              {activeFilter === index && (
                <div className='xs:text-sm md:text-base'>
                  {btn.values.map((value, id) => (
                    <div key={id} className='flex justify-between hover:bg-gray-900 hover:text-white w-full border-b-1'>
                      <button
                        className='px-4 md:py-1 '
                        onClick={() => handleFilterChange(btn.name.toLowerCase(), value)}
                      >
                        {value}
                      </button>
                      {filterBy[btn.name.toLowerCase()] === value && (
                        <p className='text-green-500 px-4'> ✓</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={handleFilter} className='hover:bg-gray-900 hover:text-white'>Apply</button>
        </div>
      )}
    </div>
  );
});

export default FilterMenu;
