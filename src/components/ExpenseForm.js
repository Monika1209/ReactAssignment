import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addExpense, editExpense } from "../store/ExpensesSlice";

const ExpenseForm = ({ existingExpense, closeModal }) => {
  const dispatch = useDispatch();
  const [expense, setExpense] = useState({ title: "", amount: "", category: "", date: "" });

  useEffect(() => {
    if (existingExpense) {
      setExpense(existingExpense);
    }
  }, [existingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.id) {
      dispatch(editExpense(expense));
    } else {
      dispatch(addExpense({ ...expense, id: Date.now() }));
    }
    setExpense({ title: "", amount: "", category: "", date: "" }); // Clear form after submit
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={expense.title}
          onChange={(e) => setExpense({ ...expense, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn-submit">
        {expense.id ? "Update" : "Add"} Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
