import React, { useState, useEffect } from "react";
import "./TodoListApp.css";

interface Todo {
  id: number;
  text: string;
  Title: string;
  isCompleted: boolean;
}

const TodoListApp: React.FC = () => {
  const initialTodos: Todo[] = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "" && title.trim() !== "") {
      const newTodoItem: Todo = {
        id: todos.length + 1,
        text: newTodo,
        Title: title,
        isCompleted: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setTitle("");
    } else {
      alert("Please complete all fields");
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-app">
      <input
        type="text"
        value={searchTerm}
        className="input-search"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title"
      />
      <div className="input-container">
        <div style={{gap: "10px", alignItems: "center", justifyContent: "center"}}>
          <input
            autoFocus
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            autoFocus
            className="input2"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Description"
          />
        </div>

        <button className="button type1" onClick={addTodo}>
          <span className="btn-txt">+ Add New Note</span>
        </button>
      </div>

      <div className="parent">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className={todo.isCompleted ? "completed" : ""} id="item">
            <div className="div-option">
              <h3>{todo.Title}</h3>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListApp;