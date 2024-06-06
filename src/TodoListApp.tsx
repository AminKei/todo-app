import React, { useState, useEffect, useRef } from "react";
import "./TodoListApp.css";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

const TodoListApp: React.FC = () => {
  const initialTodos: Todo[] = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: todos.length + 1,
        text: newTodo,
        isCompleted: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
  
    }
  };

  const toggleTodoCompletion = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <div className="input-container">
        <input
          autoFocus
          className="input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />

        <button className="button type1" onClick={addTodo}>
          <span className="btn-txt">+ Add New Note</span>
        </button>
        
      </div>

      <div className="parent">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={todo.isCompleted ? "completed" : ""}
            id="item"
          >
            <div className="div-option">
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
              {/* ckeckbox */}
              <div className="col-md-6 reject-checkbox">
                <div className="mb-2 text-center">
                  <div className="checkbox-wrapper">
                    <input
                      className="form-check-label custom-radio-label"
                      id="Rejected"
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => toggleTodoCompletion(todo.id)}
                    />
                    <label htmlFor="Rejected">
                      <div className="tick_mark">
                        <div className="cross"></div>
                      </div>
                    </label>
                  </div>
                  {/* ckeckbox */}
                </div>
              </div>
            </div>
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListApp;
