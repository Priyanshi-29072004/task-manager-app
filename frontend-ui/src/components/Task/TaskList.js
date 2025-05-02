import React from "react";
import {List,ListItem,ListItemText,IconButton,Chip,Box,} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TaskList = ({ tasks, onEdit, onDelete }) => {
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
            {/* Task title + description */}
            <ListItemText
              primary={task.title}
              secondary={task.description}
              sx={{ flex: 1 }}
            />

            {/* Status chip in center */}
            <Chip
              label={task.status}
              color={task.status === "Completed" ? "success" : "default"}
              size="small"
              sx={{ mx: 2 }}
            />

            {/* Action buttons */}
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
