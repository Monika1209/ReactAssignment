import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/ExpensesSlice";

const ExpenseFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.expenses.filter);

  const handleCategoryChange = (e) => {
    dispatch(setFilter({ ...filter, category: e.target.value }));
  };

  const handleDateChange = (e) => {
    dispatch(setFilter({ ...filter, date: e.target.value }));
  };

  return (
    <div className="expense-filter-container">
      <select className="form-select" onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
      </select>
      <input type="date" className="form-control" onChange={handleDateChange} />
    </div>
  );
};

export default ExpenseFilter;
