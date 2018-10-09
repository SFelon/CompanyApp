import {
    ACCESS_TOKEN,
    API_BASE_URL,
    IS_LOADING_DEPARTMENT,
    SET_DEPARTMENT_LIST,
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