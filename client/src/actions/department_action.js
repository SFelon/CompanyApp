import {
    ACCESS_TOKEN,
    API_BASE_URL,
    IS_LOADING_DEPARTMENT,
    SET_DEPARTMENT_LIST,
    ADD_NEW_DEPARTMENT,
} from '../constants';

import { notification } from 'antd';

const request = (options) => {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
  
    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.append('Authorization', `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`);
    }
  
    const defaults = { headers };
    const customOptions = Object.assign({}, defaults, options);
  
    return fetch(customOptions.url, customOptions)
      .then(response => response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      }));
  };

export function setDepartmentList(departments) {
    return {
        type: SET_DEPARTMENT_LIST,
        departments,
        isLoadingDepartments: false,
    };
}

export function setNewDepartment(newDepartment) {
    return {
        type: ADD_NEW_DEPARTMENT,
        newDepartment,
        isLoadingDepartments: false,
    };
}

export function loadingIndicator(toggle) {
    return {
        type: IS_LOADING_DEPARTMENT,
        isLoadingDepartments: toggle,
    };
}

export function getDepartmentList() {
return (dispatch) => {
    dispatch(loadingIndicator(true));
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        dispatch(loadingIndicator(false));
        return Promise.reject('No access token set.');
    }
    return request({
    url: `${API_BASE_URL}/departments`,
    method: 'GET',
    }).then((response) => {
        dispatch(setDepartmentList(response));
    }).catch((error) => {
    notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Could not load the department list!',
    });
    });
};
}

export function addDepartment(addDepRequest) {
    return (dispatch) => {
      dispatch(loadingIndicator(true));
      return request({
        url: `${API_BASE_URL}/departments`,
        method: 'POST',
        body: JSON.stringify(addDepRequest),
      }).then((response) => {
          if(response.status === 'ok') {
              dispatch(setNewDepartment(addDepRequest));
          }
      }).catch((error) => {
          if (error.status === 401) {
            notification.error({
              message: 'Company App',
              description: 'You are not authorized to add new department!',
            });
          } else {
            notification.error({
              message: 'Company App',
              description: error.message || 'Sorry! Something went wrong. Please try again!',
            });
          }
        }).finally(()=>{
        dispatch(loadingIndicator(false));
      });
    };
  }