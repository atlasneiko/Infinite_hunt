import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography, Checkbox } from '@material-ui/core';
import { updateApplication } from '../actions/ApplicationActions';
import { connect } from 'react-redux';

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

function ApplicationListItem({ application, updateApplication }) {
  const [phoneScreen, setPhoneScreen] = useState(application.phoneScreen);
  const [techInterview, setTechInterview] = useState(application.techInterview);
  const [onSite, setOnsite] = useState(application.onSite);
  const [Offer, setOffer] = useState(application.Offer);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link
        to={{
          pathname: `/editApplication/${application._id}`,
          data: application,
        }}
        className="app-item-link"
      >
        {console.log(application._id)}
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
              checked={phoneScreen}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              onChange={() => {
                setPhoneScreen(!phoneScreen);
                application.phoneScreen = !application.phoneScreen;
                updateApplication(application);
              }}
            />
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1rem',
            }}
          >
            <Typography style={{ fontWeight: 800, fontSize: 12 }}>
              Tech Interview
            </Typography>
            <Checkbox
              checked={techInterview}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              onChange={() => {
                setTechInterview(!techInterview);
                application.techInterview = !application.techInterview;
                updateApplication(application);
              }}
            />
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1rem',
            }}
          >
            <Typography style={{ fontWeight: 800, fontSize: 12 }}>
              On Site
            </Typography>
            <Checkbox
              checked={onSite}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              onChange={() => {
                setOnsite(!onSite);
                application.onSite = !application.onSite;
                updateApplication(application);
              }}
            />
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1rem',
            }}
          >
            <Typography style={{ fontWeight: 800, fontSize: 12 }}>
              Offer
            </Typography>
            <Checkbox
              checked={Offer}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              onChange={() => {
                setOffer(!Offer);
                application.Offer = !application.Offer;
                updateApplication(application);
              }}
            />
          </label>
        </div>
      </Link>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  updateApplication: (application) => dispatch(updateApplication(application)),
}))(ApplicationListItem);
