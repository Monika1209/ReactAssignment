import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TodoApp from "./components/TodoApp";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import WeatherApp from "./components/WeatherApp";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import PostList from "./components/PostList"; 
import PostForm from "./components/PostForm"; 
import PostDetails from "./components/PostDetails"; 
import { useState } from "react";
import ProductFilters from "./components/ProductsFilter";
import StoreProducts from "./components/StoreProducts";
import Wishlist from "./components/Wishlist";
import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [editingExpense, setEditingExpense] = useState(null);

  return (
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<TodoApp />} />
            <Route path="/productList" element={<StoreProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/expense-tracker"
              element={
                <div className="container mt-5">
                  <h2 className="text-light text-center">Expense Tracker</h2>
                  <ExpenseFilter />
                  <ExpenseForm existingExpense={editingExpense} closeModal={() => setEditingExpense(null)} />
                  <ExpenseList openEditModal={setEditingExpense} />
                </div>
              }
            />
            <Route path="/weather" element={<WeatherApp />} />

            {/* Movie Search Integration */}
            <Route path="/movies" element={<MovieSearch />} />
            <Route path="/movie/:id" element={<MovieDetails />} />

            {/* Blog App Routes */}
            <Route path="/blog" element={<PostList />} />
            <Route path="/blog/add" element={<PostForm />} />
            <Route path="/blog/post/:id" element={<PostDetails />} />

            {/* E-Commerce Product Listing Route */}
            <Route
              path="/ecommerce"
              element={
                <div className="bg-black min-vh-100 text-white">
                  <h1 className="text-center py-4">E-Commerce Store</h1>
                  <ProductFilters />
                  <StoreProducts />
                </div>
              }
            />

            <Route path="/wishlist" element={<Wishlist />} /> 

            {/* Chat App Integration */}
            <Route path="/chat" element={<Chat />} />

            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
