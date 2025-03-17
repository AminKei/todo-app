import { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

interface Todo {
  id: number;
  text: string;
  Title: string;
  isCompleted: boolean;
  liked: boolean;
}

function App() {
  const initialTodos: Todo[] = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  const [show, setShow] = useState(false);

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
        liked: false,
      };
      if (title.length < 5 && title.length > 10) {
        alert(
          "Title must be less than 5 characters and more than 10 characters"
        );
        return;
      }
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

  const filteredTodos = todos
    .filter((todo) => (likedFilter ? todo.liked : true))
    .filter((todo) =>
      todo.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ padding: "20px" }}>
      <Navbar
        className="mb-3"
        style={{ borderBottom: "solid 1px black", paddingBottom: "20px" }}
      >
        <Container fluid>
          <Navbar.Brand href="#" style={{ fontSize: "18px" }}>
            Todo App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title="Filter by :"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item onClick={() => setLikedFilter(false)}>
                    All
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setLikedFilter(true)}>
                    Liked
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Button variant="warning" onClick={handleShow} size="sm">
            + Add new Note
          </Button>
        </Container>
      </Navbar>

      <Form.Control
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title"
        style={{ width: "100%" }}
      />

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ gap: "10px", display: "grid" }}>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            maxLength={28}
          />
          <Form.Control
            as="textarea"
            placeholder="Description"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="button" onClick={addTodo} variant="warning">
            + Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container2">
        {filteredTodos.map((todo) => (
          <Card
            key={todo.id}
            style={{ position: "relative", margin: "10px 0" }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  height: "20px",
                }}
              >
                <p style={{ width: "80%" }}>{todo.Title} </p>
                <Button
                  variant="warning"
                  style={{ display: "flex", gap: "10px" }}
                  onClick={() => deleteTodo(todo.id)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1206/1206462.png"
                    width={20}
                    alt=""
                  />
                </Button>
              </Card.Title>
              <hr />
              <Card.Text
                style={{
                  fontSize: "12px",
                  overflowY: "scroll",
                  height: "250px",
                }}
              >
                {todo.text}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
