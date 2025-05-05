import React from "react";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

const Sidebar = ({ onSectionChange }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const sections = ["Today",  "Completed", "Add Task"];

  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ width: 200, padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          {user ? user.username : "Guest"}
        </Typography>
        <List>
          {sections.map((section) => (
            <ListItem button key={section} onClick={() => onSectionChange(section)}>
              <ListItemText primary={section} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
