const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Build a full-stack app" },
];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  res.json({ success: true, id: todoId });
});

app.listen(PORT, () => {
  console.log(`Server is running on httplocalhost:${PORT}`);
});
