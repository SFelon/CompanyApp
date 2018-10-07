import { IS_LOADING, SET_USER_DATA } from '../constants';

const initialState = {
  userData: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        isLoading: action.isLoading,
      };
    case SET_USER_DATA:
      return {
        userData: action.userData,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
