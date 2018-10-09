import {IS_LOADING_DEPARTMENT, LOGOUT_USER, SET_DEPARTMENT_LIST} from '../constants';

const initialState = {
    departments: [],
    isLoadingDepartments: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_DEPARTMENT:
      return {
        isLoadingDepartments: action.isLoadingDepartments,
      };
    case SET_DEPARTMENT_LIST:
      return {
        departments: action.departments,
        isLoadingDepartments: action.isLoadingDepartments,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};