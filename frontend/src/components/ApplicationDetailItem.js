import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateApplication } from '../actions/ApplicationActions';
import { connect } from 'react-redux';
import JobCard from './JobCard';
import * as Colors from '../Colors';
import { Star, MoreHoriz } from '@material-ui/icons';
import {
  makeStyles,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from '@material-ui/core';

const SwitchEl = ({ value, setValue }) => {
  const [val, setVal] = useState(value);
  return (
    <Switch
      checked={val}
      onChange={() => {
        setVal(!val);
        setValue();
      }}
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    ></Switch>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    minWidth: 900,
    marginTop: 35,
    paddingLeft: '3rem',
    paddingTop: '5rem',
    paddingBottom: '5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eaeaea',
  },
  companyInfo: {
    marginLeft: '5rem',
  },
  leftPanel: {
    flex: 0.7,
    display: 'flex',
  },
  procedure: {
    fontSize: 30,
    fontWeight: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  status: {
    fontSize: 20,
    fontWeight: 400,
    fontStyle: 'italic',
    color: 'green',
    marginLeft: 10,
  },
  notyet: {
    fontSize: 20,
    fontStyle: 'italic',
    color: 'red',
  },
  rightPanel: {
    flex: 0.3,
    height: 300,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
}));

function ApplicationDetailItem({ application, updateApplication }) {
  // application = application || {
  //   company: 'Google',
  //   date: new Date(),
  //   link:
  //     'https://www.google.com/about/careers/applications/packets/dcbcb991-8725-409e-bc26-b315727b8aca/form',
  //   location: 'San Francisco',
  //   note: '',
  //   position: 'Front End Engineer',
  //   salaryMin: 0,
  //   salaryMax: 100000,
  //   user: '600480d08f58520e79626ff9',
  //   _id: '6004916a2e6c3c165f30b26c',
  //   phoneScreen: true,
  // };
  const classes = useStyles();
  const menuId = 'application-more-info';
  const [anchor, setAnchor] = useState(null);
  const isMenuOpen = Boolean(anchor);
  const handleMenuClose = () => {
    setAnchor(null);
  };
  const handleMenuOpen = (e) => {
    setAnchor(e.currentTarget);
  };
  const handleToggle = (fieldName) => {
    application[fieldName] = !application[fieldName];
    console.log('application', application);
    updateApplication(application);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {['phoneScreen', 'techInterview', 'onSite', 'Offer'].map((progress) => (
        <MenuItem className={classes.menuItem} key={progress}>
          <Typography>{progress.toUpperCase()}</Typography>
          <SwitchEl
            value={application[progress]}
            setValue={() => {
              handleToggle(progress);
              handleMenuClose();
            }}
          ></SwitchEl>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <div className={classes.leftPanel}>
        {/* <JobCard /> */}
        <img
          src="https://res.cloudinary.com/willwang/image/upload/v1611016309/JobCard_2_tzffxc.png"
          alt="card replacement"
        />
        <div className={classes.companyInfo}>
          <Typography style={{ fontWeight: 800, fontSize: 40 }}>
            {/* {application.date.toString().split(' ').slice(0, 4).join(' ') +
              ' ' +
              application.date.toString().split(' ')[4].slice(0, 5)} */}
            {application.date}
          </Typography>
          <div>
            <a
              href={application.resume || 'https://www.google.com/docs/about/'}
              target="_blank"
            >
              <Typography
                style={{
                  fontWeight: 100,
                  fontSize: 30,
                  color: Colors.navBlack,
                  marginRight: '1rem',
                }}
              >
                Resume link
              </Typography>
            </a>

            <Typography className={classes.procedure}>
              Phone Screening:{' '}
              <span className={classes.status}>
                {!application.phoneScreen ? (
                  <span className={classes.notyet}>Not yet</span>
                ) : (
                  'attended'
                )}
              </span>
            </Typography>
            <Typography className={classes.procedure}>
              Tech interview:{' '}
              <span className={classes.status}>
                {!application.techInterview ? (
                  <span className={classes.notyet}>Not yet</span>
                ) : (
                  'attended'
                )}
              </span>
            </Typography>
            <Typography className={classes.procedure}>
              On site:{' '}
              <span className={classes.status}>
                {!application.onSite ? (
                  <span className={classes.notyet}>Not yet</span>
                ) : (
                  'attended'
                )}
              </span>
            </Typography>
            <Typography className={classes.procedure}>
              Offer:{' '}
              <span className={classes.status}>
                {!application.Offer ? (
                  <span className={classes.notyet}>Not yet</span>
                ) : (
                  'attended'
                )}
              </span>
            </Typography>
          </div>
        </div>
      </div>

      <div className={classes.rightPanel}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton>
            <Star style={{ color: 'gold', width: 50, height: 50 }} />
          </IconButton>
          <Typography
            style={{
              color: '#FFB400',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Favorite
          </Typography>
        </div>
        <IconButton onClick={(e) => handleMenuOpen(e)}>
          <MoreHoriz
            style={{ color: Colors.darkerGreen, width: 50, height: 50 }}
          />
        </IconButton>
      </div>
      {renderMenu}
    </div>
  );
}

export default connect(null, (dispatch) => ({
  updateApplication: (application) => dispatch(updateApplication(application)),
}))(ApplicationDetailItem);
