import { useEffect, useState } from "react";
import { Todo } from "../Model/ItemProp";

const useTodos = () => {
  const initialTodos: Todo[] = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  const [completedFilter, setCompletedFilter] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "" || title.trim() === "") {
      alert("Please complete all fields");
      return;
    }
    if (title.length < 1 || title.length > 28) {
      alert("Title must be between 1 and 28 characters long");
      return;
    }

    const newTodoItem: Todo = {
      id: todos.length + 1,
      text: newTodo,
      Title: title,
      isCompleted: false,
      liked: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
    setTitle("");
    handleClose();
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleLike = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, liked: !todo.liked } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (likedFilter) return todo.liked;
      if (completedFilter) return todo.isCompleted;
      return true;
    })
    .filter((todo) =>
      todo.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isRTLText = (text: string) => {
    const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    return rtlRegex.test(text);
  };

  return {
    todos,
    newTodo,
    title,
    searchTerm,
    likedFilter,
    completedFilter,
    show,
    setNewTodo,
    setTitle,
    setSearchTerm,
    setLikedFilter,
    setCompletedFilter,
    setShow,
    addTodo,
    deleteTodo,
    toggleLike,
    toggleComplete,
    filteredTodos,
    handleShow,
    handleClose,
    isRTLText,
  };
};

export default useTodos;
