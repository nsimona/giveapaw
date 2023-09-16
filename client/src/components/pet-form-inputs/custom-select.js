import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  selectProps,
}) => {
  return (
    <FormControl fullWidth required={required}>
      <InputLabel id={id} size={selectProps?.size || ""}>
        {label}
      </InputLabel>
      <Select
        labelId={id}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        {...selectProps}
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
