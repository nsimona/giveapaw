import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <FormControl fullWidth required={required}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
