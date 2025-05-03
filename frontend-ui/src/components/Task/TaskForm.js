import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";

const TaskForm = ({ onSubmit, selectedTask, clearSelected }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
  }, [selectedTask]);

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: "", description: "", status: "" });
    clearSelected();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        name="title"
        label="Title"
        value={task.title}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        name="description"
        label="Description"
        value={task.description}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        select
        name="status"
        label="Status"
        value={task.status}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        {selectedTask ? "Update Task" : "Add Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;
