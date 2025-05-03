const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

let tasks = [];

app.use(cors());
app.use(express.json());

app.post('/api/tasks', (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: "Title and status are required." });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    status,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;

  res.json(task);
});


app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
