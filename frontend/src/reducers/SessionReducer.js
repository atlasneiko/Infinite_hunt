import {
  RECEIVE_USER_SIGN_OUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
} from '../actions/SessionActions';
import { RECEIVE_USER } from '../actions/UserActions';
import { currentUserDetails } from '../util/UserApiUtil';

const _initialState = {
  isAuthenticated: false,
  user: undefined,
};

export default function SessionReducer(state = _initialState, action) {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      const user = action.payload;
      if (state.user && state.user.id === user._id) {
        return {
          ...state,
          user: currentUserDetails(user),
        };
      }
      return state;

    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };

    case RECEIVE_USER_SIGN_OUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };

    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };
    default:
      return state;
  }
}
