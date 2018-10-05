import { SET_CURRENT_USER } from '../constants';
import isEmpty from 'lodash';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
};

export default (state = initialState, action) => {
  console.log("w reducerze");
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        isAuthenticated: !isEmpty(action.currentUser),
      };
    default:
      return state;
  }
};
