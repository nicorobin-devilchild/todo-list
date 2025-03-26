// App.js

import React, { useState, useEffect } from "react";
import "./App.css";  // Ensure you have this linked correctly

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Fetch todos from API
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTodo }),
      })
        .then((res) => res.json())
        .then((data) => setTodos([...todos, data]))
        .catch((err) => console.error(err));

      setNewTodo("");
    }
  };

  const toggleComplete = (id, completed) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) =>
            todo._id === updatedTodo._id ? updatedTodo : todo
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-container">
      <h1>
        Done & Dusted{" "}
        <span role="img" aria-label="cat">🐱</span>
      </h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task..."
      />
      <button className="add-todo" onClick={addTodo}>
        Add Task
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <span role="img" aria-label="puppy">
              {todo.completed ? "🐶" : "🐾"}
            </span>{" "}
            {todo.task}
            <button
              className="checkmark"
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.completed ? "✔️" : "❌"}
            </button>
            <button onClick={() => deleteTodo(todo._id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
