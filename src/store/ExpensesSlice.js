import { createSlice } from "@reduxjs/toolkit";

const loadExpenses = () => JSON.parse(localStorage.getItem("expenses")) || [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    list: loadExpenses(),
    filter: { category: "All", date: "" },
  },
  reducers: {
    addExpense: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.list));
    },
    editExpense: (state, action) => {
      const index = state.list.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        localStorage.setItem("expenses", JSON.stringify(state.list));
      }
    },
    deleteExpense: (state, action) => {
      state.list = state.list.filter((exp) => exp.id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.list));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addExpense, editExpense, deleteExpense, setFilter } =
  expenseSlice.actions;
export default expenseSlice.reducer;
