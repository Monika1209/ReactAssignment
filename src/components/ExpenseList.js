import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../store/ExpensesSlice";

const ExpenseList = ({ openEditModal }) => {
  const { list, filter } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const filteredExpenses = list.filter((expense) => {
    return (
      (filter.category === "All" || expense.category === filter.category) &&
      (!filter.date || expense.date === filter.date)
    );
  });

  return (
    <div className="expense-list-container">
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-light">No expenses found</p>
      ) : (
        filteredExpenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-details">
              <h5>{expense.title}</h5>
              <p>{expense.category} - ${expense.amount} - {expense.date}</p>
            </div>
            <div className="expense-actions">
              <button
                className="btn btn-warning edit-btn"
                onClick={() => openEditModal(expense)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger delete-btn"
                onClick={() => dispatch(deleteExpense(expense.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
