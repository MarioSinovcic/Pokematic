import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { sizing } from '@material-ui/system';




function StatusDropdown() {

    return(
      <FormControl height="80%" variant="filled">

        <Select
          native
          height="20%" 
          // value={state.age}
          // onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'filled-age-native-simple',
          }}
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