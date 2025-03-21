import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleComplete, deleteTask, updateTask, setFilter } from "../store/TodoSlice";
import { v4 as uuidv4 } from "uuid";

function TodoApp() {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.todos);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(addTask({ id: uuidv4(), title: newTask, completed: false }));
      setNewTask("");
    }
  };

  const handleUpdateTask = (id) => {
    if (editingText.trim()) {
      dispatch(updateTask({ id, title: editingText }));
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center bg-dark text-light py-5">
      <h2 className="mb-4">To-Do List</h2>

      {/* Input Form */}
      <form onSubmit={handleAddTask} className="w-50 mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="Enter new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Add Task</button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div className="mb-3">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            className={`btn btn-sm mx-1 ${
              filter === f ? "btn-light" : "btn-outline-light"
            }`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="list-group w-50">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex align-items-center justify-content-between bg-secondary text-light border-0 mb-2"
          >
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={task.completed}
              onChange={() => dispatch(toggleComplete(task.id))}
            />
            {editingId === task.id ? (
              <div className="d-flex flex-grow-1">
                <input
                  type="text"
                  className="form-control me-2 bg-dark text-light border-0"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdateTask(task.id)}>✔</button>
                <button className="btn btn-warning btn-sm" onClick={() => { setEditingId(null); setEditingText(""); }}>✖</button>
              </div>
            ) : (
              <span
                className={`flex-grow-1 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}
              >
                {task.title}
              </span>
            )}
            <div className="d-flex gap-2">
              <button className="btn btn-info btn-sm" onClick={() => { setEditingId(task.id); setEditingText(task.title); }}>✎</button>
              <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteTask(task.id))}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
