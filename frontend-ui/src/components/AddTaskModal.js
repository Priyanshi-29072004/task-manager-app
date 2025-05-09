import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const AddTaskModal = ({ open, onClose, onSubmit, selectedTask, clearSelected }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    status: "Pending",
  });

  useEffect(() => {
    if (selectedTask) {
      setTask({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        date: selectedTask.date ? selectedTask.date.split("T")[0] : "",
        status: selectedTask.status || "Pending",
      });
    } else if (open) {
      setTask({
        title: "",
        description: "",
        date: "",
        status: "Pending",
      });
    }
  }, [selectedTask, open]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!task.title || !task.date) return;
    if (selectedTask && selectedTask._id) {
      task._id = selectedTask._id; // ✨ Attach _id for update
    }
  
    onSubmit(task);
    clearSelected();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{selectedTask ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    pt: 20, 
    pb: 4, 
  }}
>

        <TextField
          name="title"
          label="Title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          value={task.description}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={task.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
          <TextField
  name="status"
  label="Status"
  value={task.status}
  onChange={handleChange}
/>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
