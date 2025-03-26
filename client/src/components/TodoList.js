import React, { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos();
      setTodos(todosData);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!task.trim()) return;
    const newTodo = await addTodo(task);
    if (newTodo) setTodos([...todos, newTodo]);
    setTask("");
  };

  const handleToggleComplete = async (id, completed) => {
    const updatedTodo = await updateTodo(id, !completed);
    if (updatedTodo) {
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              onClick={() => handleToggleComplete(todo._id, todo.completed)}
              style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {todo.task}
            </span>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
