import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputValue }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setInputValue("");
      });
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTodos(todos.filter((todo) => todo.id !== id));
        }
      });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          My Todo List
        </Typography>

        <Box display="flex" gap={2} marginBottom={3}>
          <TextField
            fullWidth
            label="New Todo"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Box>

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              }
            >
              <ListItemText primary={todo.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
