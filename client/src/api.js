const API_URL = "http://localhost:5000/todos";

export const getTodos = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const addTodo = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const updateTodo = async (id, completed) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
