import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './TodoSlice';
import cartReducer from './CartSlice';
import authReducer from './AuthSlice';
import expensesReducer from "./ExpensesSlice";
import weatherReducer from "./WeatherSlice";
import movieReducer from "./MovieSlice"; 
import postReducer from "./PostSlice";
import productReducer from "./ProductsSlice";
import wishlistReducer from "./WishlistReducer";
import chatReducer from './ChatSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    cart: cartReducer,
    auth: authReducer, 
    expenses: expensesReducer,
    weather: weatherReducer,
    movies: movieReducer,
    posts: postReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    chat: chatReducer,
  },
});

export default store;
