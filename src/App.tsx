import React, { useState, useEffect } from "react";
import "./App.css";
import TodoListApp from "./TodoApp/TodoListApp";

function App() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light");
  const [themeName, seThemeName] = useState("Light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    seThemeName(theme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#ffffff" : "#222229";
    document.body.style.color = theme === "light" ? "#1f293d" : "#fff";
  }, [theme]);

  return (
    <div>
      <div className="navbar">
        <h1>Todo App</h1>
        <div
          style={{
            backgroundColor:
              theme === "light" ? "#ffffff" : "#333333" || "transparent",
            color: theme === "light" ? "#333333" : "#ffffff",
            padding: "20px",
            textAlign: "center",
          }}
        ></div>

        <button
          style={{
            backgroundColor: theme === "light" ? "#333333" : "#ffffff",
            color: theme === "light" ? "#ffffff" : "#333333",
          }}
          className="buttonTheme"
          onClick={toggleTheme}
        >
          {themeName}
        </button>
      </div>
      <TodoListApp />
    </div>
  );
}

export default App;
