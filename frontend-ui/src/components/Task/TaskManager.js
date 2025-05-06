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

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

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
