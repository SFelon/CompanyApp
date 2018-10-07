import {
    ACCESS_TOKEN,
    API_BASE_URL,
    IS_LOADING,
    SET_USER_DATA,
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

export function setUserData(userData) {
    return {
        type: SET_USER_DATA,
        userData,
        isLoading: false,
    };
}

export function loadingIndicator(toggle) {
    return {
        type: IS_LOADING,
        isLoading: toggle,
    };
}


export function getUserProfile(userId) {
return (dispatch) => {
    dispatch(loadingIndicator(true));
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        dispatch(loadingIndicator(false));
        return Promise.reject('No access token set.');
    }
    return request({
    url: `${API_BASE_URL}/user/${userId}`,
    method: 'GET',
    }).then((response) => {
        dispatch(setUserData(response));
    }).catch((error) => {
    notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Something went wrong. Please try again!',
    });
    });
};
}  