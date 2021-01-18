import React from 'react';
import { makeStyles, Typography, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    minWidth: 900,
    borderRadius: 999,
    marginTop: 35,
    height: '10vh',
    paddingLeft: '3rem',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 3px 3px 0px rgba(0,0,0, 0.1)',
  },
  logo: {
    height: '6vh',
    marginRight: '2rem',
  },
  leftPanel: {
    display: 'flex',
  },
  rightPanel: {
    paddingRight: 50,
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function ApplicationListItem({ application }) {
  // application = application || {
  //   company: 'Google',
  //   date: Data.now(),
  //   link:
  //     'https://www.google.com/about/careers/applications/packets/dcbcb991-8725-409e-bc26-b315727b8aca/form',
  //   location: 'San Francisco',
  //   note: '',
  //   position: 'Front End Engineer',
  //   salaryMin: 0,
  //   salaryMax: 100000,
  //   user: '600480d08f58520e79626ff9',
  //   _id: '6004916a2e6c3c165f30b26c',
  // };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.leftPanel}>
        <img
          className={classes.logo}
          src={
            application.logo ||
            'https://cdn.worldvectorlogo.com/logos/google-icon.svg'
          }
        />

        <div className={classes.companyInfo}>
          <Typography style={{ fontWeight: 800 }}>
            {application.company}
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{
                fontWeight: 100,
                fontSize: 14,
                marginRight: '1rem',
              }}
            >
              {application.position}
            </Typography>
            <Typography
              style={{
                fontWeight: 100,
                fontSize: 14,
              }}
            >
              {application.location}
            </Typography>
          </div>
        </div>
      </div>

      <div className={classes.rightPanel}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            style={{ fontWeight: 800, fontSize: 12, marginLeft: '1rem' }}
          >
            phone screen
          </Typography>
          <Checkbox
            checked={application.screened}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </label>
        <label
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <Typography style={{ fontWeight: 800, fontSize: 12 }}>
            Tech Interview
          </Typography>
          <Checkbox
            checked={application.tech}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </label>
        <label
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <Typography style={{ fontWeight: 800, fontSize: 12 }}>
            On Site
          </Typography>
          <Checkbox
            checked={application.onsite}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </label>
        <label
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <Typography style={{ fontWeight: 800, fontSize: 12 }}>
            Offer
          </Typography>
          <Checkbox
            checked={application.offer}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </label>
      </div>
    </div>
  );
}

export default ApplicationListItem;
