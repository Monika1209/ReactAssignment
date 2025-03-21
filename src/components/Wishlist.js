import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/WishlistReducer";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container text-white">
      <h2 className="text-center my-4">Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card bg-dark text-white">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title.substring(0, 20)}...</h5>
                  <p className="card-text">${item.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
