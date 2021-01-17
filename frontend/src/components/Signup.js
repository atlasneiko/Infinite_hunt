import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/SessionActions';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Typography,
  Button,
  TextField,
  withStyles,
} from '@material-ui/core';
import { validate } from 'email-validator';
import * as Colors from '../Colors';
const CssTextField = withStyles({
  root: {
    '& label': {
      color: Colors.lightestGreen,
    },
    '& label.Mui-focused': {
      color: Colors.lightestGreen,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: Colors.lightestGreen,
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: Colors.lighterGreen,
      },
    },
  },
})(TextField);
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100wh',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 105,
  },
  signincard: {
    width: '40%',
    minWidth: 500,
    height: 400,
    borderRadius: 10,
    backgroundColor: Colors.navBlack,
    padding: 30,
    paddingLeft: 50,
    color: Colors.lightestGreen,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },

  leftPanel: {
    flex: 0.6,
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  rightPanel: {
    paddingTop: 50,
    flex: 0.4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButton: {
    color: Colors.lightestGreen,
    fontSize: 18,
  },
  input: {
    color: 'white',
  },
  logo: {
    marginTop: -100,
    width: '50%',
  },
  signin: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

function Signup({ signupUser }) {
  const classes = useStyles();
  const [userNameErrors, setUserNameErrors] = useState('');
  const [emailErrors, setEmailErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const handleSignup = () => {
    setUserNameErrors('');
    setEmailErrors('');
    setPasswordErrors('');
    if (username.length < 6)
      setUserNameErrors('Username must be at least 6 characters');
    if (!validate(email)) setEmailErrors('Email is invalid');
    if (password.length < 6)
      setPasswordErrors('Password must be at least 6 characters');
    if (!userNameErrors && !emailErrors && !passwordErrors) {
      signupUser({
        username,
        email,
        password,
      });
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.signincard}>
        <div className={classes.leftPanel}>
          <Typography style={{ fontSize: 18 }}>SIGN UP</Typography>
          <div>
            <CssTextField
              className={classes.textField}
              required
              label="username"
              variant="outlined"
              fullWidth={true}
              inputProps={{
                className: classes.input,
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p style={{ color: 'red' }}>{userNameErrors}</p>
            <CssTextField
              className={classes.textField}
              required
              label="email"
              variant="outlined"
              fullWidth={true}
              inputProps={{
                className: classes.input,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ color: 'red' }}>{emailErrors}</p>
            <CssTextField
              className={classes.textField}
              required
              label="password"
              variant="outlined"
              fullWidth={true}
              inputProps={{
                className: classes.input,
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p style={{ color: 'red' }}>{passwordErrors}</p>
            <div className={classes.signin}>
              <Typography style={{ fontSize: '0.8rem' }}>
                Already registered?{' '}
                <Link
                  style={{ marginLeft: 10, color: Colors.lighterGreen }}
                  to="/signin"
                >
                  Sign in
                </Link>
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.rightPanel}>
          <div></div>
          <img
            className={classes.logo}
            src={`https://res.cloudinary.com/willwang/image/upload/v1610862325/verticalLogo_fiosdq.png`}
            alt={'vertical logo'}
          />
          <Button onClick={handleSignup} className={classes.submitButton}>
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
  signupUser: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
