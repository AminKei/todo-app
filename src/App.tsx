import React, { useState, useEffect } from "react";
import TodoListApp from "./TodoListApp";

function App() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#ffffff" : "#333333";
    document.body.style.color = theme === "light" ? "#333333" : "#ffffff";
  }, [theme]);

  return (
    <div>
      <div
        style={{
          backgroundColor: theme === "light" ? "#ffffff" : "#333333",
          color: theme === "light" ? "#333333" : "#ffffff",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <button
          style={{
            backgroundColor: theme === "light" ? "#333333" : "#ffffff",
            color: theme === "light" ? "#ffffff" : "#333333",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={toggleTheme}
        >
          change it
        </button>
      </div>
    </div>
  );
}

export default App;
