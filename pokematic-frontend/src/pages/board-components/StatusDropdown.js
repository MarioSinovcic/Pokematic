import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './StatusDropdown.css';

function StatusDropdown() {

    return(
      <FormControl height="80%" variant="filled">

        <Select
          native
          height="20%" 
          fullWidth
          // value={state.age}
          // onChange={handleChange}
        >
          <option className="StatusPlaceholder" value={10}>To Do</option>
          <option className="StatusPlaceholder" value={20}>In Progress</option>
          <option className="StatusPlaceholder" value={30}>In Review</option>
          <option className="StatusPlaceholder" value={30}>Done</option>

        </Select>
      </FormControl>
    )
}

export default StatusDropdown;