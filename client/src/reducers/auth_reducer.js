import { SET_CURRENT_USER, IS_LOADING, LOGOUT_USER } from '../constants';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  roles: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        isLoading: action.isLoading,
      };
    case SET_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        isAuthenticated: action.isAuthenticated,
        roles: action.currentUser.map(data => data.authorities),
        isLoading: action.isLoading,
      };
    case LOGOUT_USER:
      return state;
    default:
      return state;
  }
};
