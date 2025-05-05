import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const Sidebar = ({ onSectionChange, currentSection }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const sections = ["Today", "Upcoming", "Completed", "Add Task"];

  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ width: 200, padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          {user ? user.username : "Guest"}
        </Typography>
        <List>
          {sections.map((section) => (
            <ListItemButton
              key={section}
              selected={currentSection === section}
              onClick={() => onSectionChange(section)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              <ListItemText primary={section} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
