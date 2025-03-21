import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage if available
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const initialState = {
  tasks: savedTasks,
  filter: 'all', // 'all' | 'completed' | 'pending'
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleComplete, deleteTask, updateTask, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
