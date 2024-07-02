import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  fetchTodos();

  document
    .getElementById("todoForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const input = document.getElementById("todoInput");
      const value = input.value.trim();

      if (isValidTodoValue(value)) {
        await postTodoToBackend(value);
        addTodoToList(value);
        input.value = "";
      } else {
        alert("Todo must be between 1 and 140 characters.");
      }
    });
});

async function fetchTodos() {
  try {
    // We make the call to the backend service using the service name
    const response = await axios.get("http://backend-svc:3002/todos");
    const todos = response.data;
    // We iterate over the todos and add them to the list
    todos.forEach((todo) => addTodoToList(todo));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

async function postTodoToBackend(todo) {
  try {
    const data = await axios.post("http://backend-svc:3002/todos", { todo });
    console.log("Posted todo:", data);
    return data;
  } catch (error) {
    console.error("Error posting todo:", error);
  }
}

function createTodoItem(value) {
  const li = document.createElement("li");
  li.textContent = value;
  return li;
}

function addTodoToList(value) {
  const list = document.getElementById("todoList");
  const todoItem = createTodoItem(value);
  list.appendChild(todoItem);
}

function isValidTodoValue(value) {
  return value.length > 0 && value.length <= 140;
}
