import * as APIUtil from '../util/SessionApiUtil';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_SIGN_OUT = 'RECEIVE_USER_SIGN_OUT';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const signoutUser = () => ({
  type: RECEIVE_USER_SIGN_OUT,
});

export const signout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(signoutUser());
};

export const signup = (user) => (dispatch) => {
  APIUtil.signup(user).then(
    (payload) => {
      dispatch(receiveCurrentUser(payload.data.user));
      dispatch(receiveUserSignIn());
    },
    (err) => dispatch(receiveErrors(err.response.data))
  );
};

export const signin = (user) => (dispatch) => {
  APIUtil.signin(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser({ ...decoded, ...res.data.user }));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};
