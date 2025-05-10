import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/taskApi";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("All");

  // Get the user from localStorage (or use context)
  const user = JSON.parse(localStorage.getItem("user"));

  const loadTasks = async () => {
    if (user) {
      const res = await getTasks(user._id); // Pass userId to the API
      setTasks(res.data);
    } else {
      // Handle scenario where the user is not logged in
      // Maybe show an error or redirect to login
      console.error("User not authenticated");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []); // Empty dependency array to run this once on component mount

  const handleSubmit = async (task) => {
    task._id ? await updateTask(task._id, task) : await createTask(task);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const filteredTasks = tasks.filter(
    (task) => filter === "All" || task.status === filter
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <TaskForm
          onSubmit={handleSubmit}
          selectedTask={selectedTask}
          clearSelected={() => setSelectedTask(null)}
        />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onEdit={setSelectedTask}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default TaskManager;
