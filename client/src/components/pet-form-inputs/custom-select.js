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
  fullWidth = true,
  sx,
}) => {
  return (
    <FormControl fullWidth={fullWidth} required={required} sx={sx}>
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
          <MenuItem key={option.value} value={option.value} color="neutralText">
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
