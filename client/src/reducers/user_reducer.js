import {IS_LOADING_PROFILE, LOGOUT_USER, SET_USER_DATA, SET_HEADS_NAME} from '../constants';

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
  headsName: [],
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
    case SET_HEADS_NAME:
      return {
        headsName: action.headsName,
        isLoadingProfile: action.isLoadingProfile,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};
