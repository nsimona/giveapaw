import React from "react";
import { Autocomplete } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CustomAutocomplete = ({ options, id, label, value, onChange }) => {
  return (
    <Autocomplete
      fullWidth
      multiple
      id={id}
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      name=""
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomAutocomplete;
