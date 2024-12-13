import React, { useState, useEffect } from "react";
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
}

function App() {
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

  /* modal */

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ padding: "20px" }}>
      <Navbar
        className="mb-3 "
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
                  <NavDropdown.Item href="#action3">Liked</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Alarm</NavDropdown.Item>
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
          />
          <Form.Control
            as="textarea"
            placeholder="Discription"
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
            style={{
              overflowY: "scroll",
              height: "250px",
              position: "relative",
            }}
          >
            <Card.Body>
              <Card.Title  style={{justifyContent:"space-between", display:"flex", alignItems:"center", fontSize:"18px"}}> 
                Title : {todo.Title}{" "}
                <Button variant="link" onClick={() => deleteTodo(todo.id)}>
                  <img
                    src={`${process.env.PUBLIC_URL}/Icons/trash.png`}
                    alt=""
                  />
                </Button>
              </Card.Title>
              <hr />
              <Card.Text style={{fontSize:"12px"}}>{todo.text}</Card.Text>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "solid 1px gray",
                  bottom: "0px",
                  width: "90%",
                  background: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="link">
                    <img
                      src={`${process.env.PUBLIC_URL}/Icons/heart.png`}
                      alt=""
                    />
                  </Button>
                  <Button variant="link">
                    <img
                      src={`${process.env.PUBLIC_URL}/Icons/send.png`}
                      alt=""
                    />
                  </Button>
                </div>
              </div> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
