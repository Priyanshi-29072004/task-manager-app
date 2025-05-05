import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Box,
  Checkbox,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task._id} divider>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            {/* Checkbox and task info */}
            <Box display="flex" alignItems="center" flex={1}>
              <Checkbox
                checked={task.status === "Completed"}
                onChange={() => onComplete(task)}
              />
              <ListItemText
                primary={task.title}
                secondary={task.description}
              />
            </Box>

            {/* Status chip */}
            <Chip
              label={task.status}
              color={task.status === "Completed" ? "success" : "default"}
              size="small"
              sx={{ mx: 2 }}
            />

            {/* Edit/Delete buttons */}
            <Box display="flex" gap={1}>
              <IconButton onClick={() => onEdit(task)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(task._id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
