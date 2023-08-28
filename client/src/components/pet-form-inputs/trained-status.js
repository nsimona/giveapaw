import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const TrainedStatus = ({ trained, onChange, label }) => {
  const trainedOptions = [
    { value: true, label: "Да" },
    { value: false, label: "Не" },
  ];

  return (
    <FormControl>
      <FormLabel id="trained-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="trained-label"
        name="trained-radio-buttons-group"
        value={trained}
        onChange={onChange}
      >
        {trainedOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default TrainedStatus;
