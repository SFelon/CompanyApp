import { IS_LOADING_PROFILE, SET_USER_DATA } from '../constants';

const initialState = {
  userData: {
    firstName: "",
    lastName: "",
    privatePhone: "",
    businessPhone: "",
    dateOfEmployment: "",
    lastLogged: "",
    accountActive: false,
    department: "",
  },
  isLoadingProfile: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_PROFILE:
      return {
        isLoadingProfile: action.isLoadingProfile,
      };
    case SET_USER_DATA:
      return {
        userData: action.userData,
        isLoadingProfile: action.isLoadingProfile,
      };
    default:
      return state;
  }
};
