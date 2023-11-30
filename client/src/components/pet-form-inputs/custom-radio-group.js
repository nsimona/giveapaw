import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const CustomRadioGroup = ({ value, label, onChange, options, id }) => {
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={id}
        name={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
