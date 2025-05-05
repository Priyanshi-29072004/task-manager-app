import React, { useState, useEffect, useCallback,useMemo} from "react";
import {
  Container,
  Paper,
  Box,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/taskApi";
import Sidebar from "../Sidebar";
import AddTaskModal from "../AddTaskModal"; 

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [currentSection, setCurrentSection] = useState("Today");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const loadTasks = useCallback(async () => {
    if (user) {
      const res = await getTasks(user._id);
      setTasks(res.data);
    } else {
      console.error("User not authenticated");
    }
  }, [user]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  

const handleSubmit = async (task) => {
  if (task._id) {
    await updateTask(task._id, task);
  } else {
    task.status = "Pending";
    if (!task.date) {
      task.date = new Date().toISOString();
    }
    await createTask(task);
  }
  setOpenModal(false);
  loadTasks();
};


const handleDelete = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    await deleteTask(id, token);
    loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

  const handleComplete = async (task) => {
    await updateTask(task._id, { ...task, status: "Completed" });
    setOpenSnackbar(true);
    loadTasks();
  };

const today = new Date().toISOString().split("T")[0];
  let filteredTasks = tasks;

  if (currentSection === "Add Task") {
    filteredTasks = tasks.filter((t) => t.status === "Pending");
  } else if (currentSection === "Today") {
    filteredTasks = tasks.filter((t) => {
      if (!t.date || isNaN(new Date(t.date))) return false;
      const taskDate = new Date(t.date).toISOString().split("T")[0];
      const todayDate = new Date().toISOString().split("T")[0];
      return taskDate === todayDate && t.status !== "Completed";
    });
  } else if (currentSection === "Completed") {
    filteredTasks = tasks.filter((t) => t.status === "Completed");
  }
  

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onSectionChange={(section) => {
        setCurrentSection(section);
        if (section === "Add Task") setOpenModal(true);
      }} />

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {currentSection}
        </Typography>
        <Paper sx={{ p: 3 }}>
          <FilterBar filter={filter} setFilter={setFilter} />
          
          <TaskList
  tasks={filteredTasks}
  currentSection={currentSection}
  onEdit={(task) => {
    setSelectedTask(task);
    setOpenModal(true); 
  }}
  onDelete={handleDelete}
  onComplete={handleComplete}
/>

        </Paper>
      </Container>

      <AddTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        selectedTask={selectedTask}
        clearSelected={() => setSelectedTask(null)}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">Task Completed!</Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskManager;
