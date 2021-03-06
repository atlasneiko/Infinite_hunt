import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import JobItem from './jobItem';

function Landing({ jobs, fetchJobs }) {
  useEffect(() => {
    fetchJobs();
  }, []);

  const [location, setLocation] = useState('All');
  const [positions, setPositions] = useState([]);

  function handleChange(e) {
    e.preventDefault();
    setLocation(e.target.value);
  }

  function handlePos(e) {
    const { value } = e.target;

    if (positions.indexOf(value) === -1) {
      setPositions([...positions, value]);
    } else {
      setPositions(positions.filter((pos) => pos !== value));
    }
  }

  return (
    <div className="landing">
      <div className="land-top">
        <div className="loca-drop">
          <FormControl variant="outlined">
            <InputLabel id="loca">Location</InputLabel>
            <Select
              labelId="loca"
              id="demo-simple-select-outlined"
              value={location}
              onChange={handleChange}
              label="Location"
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={'Remote'}>Remote</MenuItem>
              <MenuItem value={'Los Angeles'}>LA</MenuItem>
              <MenuItem value={'San Francisco'}>SF</MenuItem>
              <MenuItem value={'Berlin'}>Berlin</MenuItem>
              <MenuItem value={'New York'}>NY</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="land-check">
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="fullstack"
                control={<Checkbox color="primary" />}
                onChange={handlePos}
                label="Full-Stack"
                labelPlacement="start"
              />
              <FormControlLabel
                value="frontend"
                control={<Checkbox color="primary" />}
                onChange={handlePos}
                label="Frontend"
                labelPlacement="start"
              />
              <FormControlLabel
                value="backend"
                control={<Checkbox color="primary" />}
                onChange={handlePos}
                label="Backend"
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>

      <div className="job-container">
        {jobs.map((job, idx) => (
          <JobItem
            job={job}
            key={job.id + idx}
            location={location}
            positions={positions}
          />
        ))}
      </div>
    </div>
  );
}

export default Landing;
