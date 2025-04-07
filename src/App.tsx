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
  Dropdown,
} from "react-bootstrap";
import NotItems from "./Components/NotItems/NotItems";
import "./App.css";
import useTodos from "./Hooks/useTodo";

function App() {
  const {
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
    handleClose,
    handleShow,
    addTodo,
    filteredTodos,
    toggleLike,
    toggleComplete,
    deleteTodo,
    isRTLText,
  } = useTodos();

  const getFilterText = () => {
    if (likedFilter) return "Liked";
    if (completedFilter) return "Completed";
    return "All";
  };

  return (
    <div style={{ padding: "15px" }}>
      <Navbar
        className="mb-4"
        style={{
          borderBottom: "solid 1px gray",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          paddingBottom: "20px",
        }}
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
              <Nav className="justify-content-end flex-grow-1 pe-4 ps-4">
                <Form.Control
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title"
                  className="searcbar"
                  style={{ width: "350px" }}
                />
                <NavDropdown
                  title={`Filter by: ${getFilterText()}`}
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item
                    onClick={() => {
                      setLikedFilter(false);
                      setCompletedFilter(false);
                    }}
                    active={!likedFilter && !completedFilter}
                  >
                    All
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      setLikedFilter(true);
                      setCompletedFilter(false);
                    }}
                    active={likedFilter}
                  >
                    Liked
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      setLikedFilter(false);
                      setCompletedFilter(true);
                    }}
                    active={completedFilter}
                  >
                    Completed
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Button onClick={handleShow} variant="warning">
            <span className="d-none d-md-inline">+ Add New Notes</span>
            <span className="d-md-none">+</span>
          </Button>
        </Container>
      </Navbar>

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
        {todos.length === 0 && <NotItems />}
        {filteredTodos.map((todo: any) => (
          <Card
            key={todo.id}
            style={{
              position: "relative",
              margin: "10px 0",
              marginTop: "30px",
              borderRadius: "12px",
              border: "#d6d6d6 1px solid",
              backgroundColor: "#fff",
              transition: "transform 0.2s ease-in-out",
              cursor: "pointer",
            }}
          >
            <Card.Body style={{ padding: "20px" }}>
              <Card.Title
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  height: "auto",
                  marginBottom: "15px",
                  gap: "6px",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    margin: "0",
                    fontWeight: "600",
                    color: "#2c3e50",
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                    direction: isRTLText(todo.Title) ? "rtl" : "ltr",
                  }}
                >
                  {todo.Title}
                </p>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => toggleLike(todo.id)}>
                      {todo.liked ? "❤️ Unlike" : "🤍 Like"}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleComplete(todo.id)}>
                      {todo.isCompleted
                        ? "✓ Mark Incomplete"
                        : "  Mark Complete"}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteTodo(todo.id)}>
                      🗑️ Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Title>
              <hr style={{ margin: "10px 0", opacity: "0.2" }} />
              <Card.Text
                style={{
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "#555",
                  overflowY: "auto",
                  height: "200px",
                  padding: "10px 5px",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  direction: isRTLText(todo.text) ? "rtl" : "ltr",
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
