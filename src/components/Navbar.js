import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-blue-400" to="/">
          My Apps
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todo">To-Do List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productList">Shopping Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">User Auth</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expense-tracker">Expense Tracker</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/weather">Weather App</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movie Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog App</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ecommerce">E-Commerce</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">Chat App</Link>
            </li>
          </ul>

          {/* Expense Tracker Button with Icon */}
          <Link to="/expense-tracker" className="nav-link text-white position-relative me-3" />

          {/* Cart Button with Icon & Count */}
          <Link to="/cart" className="nav-link text-white position-relative me-3">
            <FaShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </Link>



          <Link to="/wishlist" className="nav-link text-white position-relative me-3">
            <FaHeart size={24} className="text-danger" />
            {wishlistItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
