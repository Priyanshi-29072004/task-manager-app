// src/components/TaskList.js
import React from "react";
import { List, ListItem, ListItemText, IconButton, Chip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task._id}
          secondaryAction={
            <>
              <IconButton onClick={() => onEdit(task)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(task._id)}>
                <Delete />
              </IconButton>
            </>
          }
        >
          <ListItemText primary={task.title} secondary={task.description} />
          <Chip
            label={task.status}
            color={task.status === "Completed" ? "success" : "default"}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
