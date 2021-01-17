import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  makeStyles,
  Typography,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  AppBar,
  Avatar,
  Button,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { signout } from '../actions/SessionActions';

import * as Colors from '../Colors';
import { fetchUser } from '../actions/UserActions';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: Colors.navBlack,
    display: 'flex',
    justifyContent: 'center',
    height: 120,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {},
  sectionDesktop: {
    display: 'flex',
  },
  sectionMobile: {
    display: 'flex',
  },
  buttons: {
    display: 'none',
    marginRight: '1rem',
    position: 'absolute',
    right: 20,
    bottom: 37,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  button: {
    fontSize: '1.2rem',
    fontWeight: 100,
    color: Colors.lightestGreen,
  },
  avatar: {
    display: 'none',
    marginRight: '1rem',
    position: 'absolute',
    right: 20,
    bottom: 20,
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  moreButtons: {
    display: 'block',
    marginRight: '1rem',
    position: 'absolute',
    right: 20,
    bottom: 35,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuItem: {
    padding: '20px 40px',
  },
}));

function Navbar({ currentUser, fetchUser, signout }) {
  useEffect(() => {
    if (currentUser) {
      fetchUser(currentUser.id);
    }
  }, []);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderAuthButtons = () => (
    <IconButton
      className={classes.moreButtons}
      aria-controls={mobileMenuId}
      aria-haspopup="true"
      onClick={handleMobileMenuOpen}
      color="inherit"
    >
      <MoreVert />
    </IconButton>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
        User Profile
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
        Edit Profile
      </MenuItem>

      <MenuItem
        className={classes.menuItem}
        onClick={() => {
          handleMenuClose();
          signout();
        }}
      >
        Sign Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUser ? (
        <div>
          <MenuItem className={classes.menuItem}>
            <Typography>User Profile</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <Typography>Edit Profile</Typography>
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              signout();
              handleMenuClose();
            }}
          >
            Sign Out
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              history.push('/signin');
              handleMenuClose();
            }}
          >
            <Typography>SIGN IN</Typography>
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              history.push('/signup');
              handleMenuClose();
            }}
          >
            <Typography>SIGN UP</Typography>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
  const renderButtons = () =>
    currentUser ? (
      <IconButton className={classes.avatar} onClick={handleProfileMenuOpen}>
        <Avatar
          src={`https://res.cloudinary.com/willwang/image/upload/v1610852026/infiHuntLogo_rru0vl.png`}
          style={{ backgroundColor: '#020202', width: 50, height: 50 }}
        />
      </IconButton>
    ) : (
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          style={{ marginRight: 20 }}
          onClick={() => history.push('/signin')}
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => history.push('/signup')}
          style={{
            backgroundColor: Colors.lightestGreen,
            color: Colors.navBlack,
          }}
        >
          Sign up
        </Button>
      </div>
    );

  return (
    <div>
      <AppBar position="static" elevation={1}>
        <Toolbar className={classes.navbar}>
          <div className={classes.logo}>
            <img
              src="https://res.cloudinary.com/willwang/image/upload/v1610852069/logoPlusChar_zbzkok.png"
              alt={'logo'}
              onClick={() => history.push('/')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {location.pathname === '/signin' ||
          location.pathname === '/signup' ? (
            <div></div>
          ) : (
            <div>
              <div>{renderButtons()}</div>
              <div>{renderAuthButtons()}</div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  currentUser: session.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  signout: () => dispatch(signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
