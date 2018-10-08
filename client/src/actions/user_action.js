import {
    ACCESS_TOKEN,
    API_BASE_URL,
    IS_LOADING_PROFILE,
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
        isLoadingProfile: false,
    };
}

export function loadingIndicator(toggle) {
    return {
        type: IS_LOADING_PROFILE,
        isLoadingProfile: toggle,
    };
}

export function getUserProfile(username) {
return (dispatch) => {
    dispatch(loadingIndicator(true));
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        dispatch(loadingIndicator(false));
        return Promise.reject('No access token set.');
    }
    return request({
    url: `${API_BASE_URL}/users/${username}`,
    method: 'GET',
    }).then((response) => {
        dispatch(setUserData(response));
    }).catch((error) => {
    notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Could not load the user profile!',
    });
    });
};
}
