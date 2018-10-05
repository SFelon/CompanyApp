import { SET_CURRENT_USER, IS_LOADING } from '../constants';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
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
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
