import React from "react";
import { ButtonGroup, Button } from "@mui/material";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <ButtonGroup sx={{ mb: 2 }}>
      {["All", "Pending", "Completed"].map((status) => (
        <Button
          key={status}
          variant={filter === status ? "contained" : "outlined"}
          onClick={() => setFilter(status)}
        >
          {status}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FilterBar;
