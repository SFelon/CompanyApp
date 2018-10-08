import { IS_LOADING, SET_USER_DATA } from '../constants';

const initialState = {
  userData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        userData: action.userData,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
