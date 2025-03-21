import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/ProductsSlice';
import { addToWishlist } from '../store/WishlistReducer';


const StoreProducts = () => {
  const dispatch = useDispatch();
  const { filteredItems, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <h3 className="text-white">Loading...</h3>;

  return (
    <div className="container text-white">
      <div className="row">
        {filteredItems.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card bg-dark text-white">
              <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'contain' }} />
              <div className="card-body">
                <h5 className="card-title">{product.title.substring(0, 20)}...</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-warning" onClick={() => dispatch(addToWishlist(product))}>Add to Wishlist</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreProducts;
