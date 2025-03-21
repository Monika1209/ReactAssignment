import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByCategory, filterByPrice } from '../store/ProductsSlice';

const ProductFilters = () => {
  const dispatch = useDispatch();

  return (
    <div className="container text-white my-3">
      <select className="form-select bg-dark text-white" onChange={(e) => dispatch(filterByCategory(e.target.value))}>
        <option value="">All Categories</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelry</option>
      </select>
      <select className="form-select bg-dark text-white mt-2" onChange={(e) => dispatch(filterByPrice(e.target.value))}>
        <option value="">Sort by Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;
