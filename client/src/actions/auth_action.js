import {ACCESS_TOKEN, IS_LOADING, SET_TOKEN, API_BASE_URL, SET_CURRENT_USER} from "../constants";
import { notification } from 'antd';

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if(localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if(!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};

export function setCurrentUser(currentUser) {
  console.log("w set current user");
  return {
    type: SET_CURRENT_USER,
    currentUser,
    isAuthenticated: true,
    isLoading: false,
  };
}

export function loadingUser(toggle) {
  console.log("w set loading state");
  return {
    type: IS_LOADING,
    isLoading: toggle,
  };
}

export function setToken(data) {
  console.log("w set token");
  return {
    type: SET_TOKEN,
    token: data,
  };
}



export function signInAction(loginRequest) {
  console.log("inside action 1");
  return dispatch => {
    dispatch(loadingUser(true));
    return request({
      url: `${API_BASE_URL}/auth/signin`,
      method: 'POST',
      body: JSON.stringify(loginRequest),
    }).then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    }).then(dispatch(getCurrentUser()))
      .catch(error => {
      if (error.status === 401) {
        notification.error({
          message: 'Company App',
          description: 'Your Username or Password is incorrect. Please try again!'
        });
      } else {
        notification.error({
          message: 'Company App',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      }
    })
  }
}

export function getCurrentUser() {
  console.log("w getCurrentUser");
  return dispatch => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(loadingUser(false));
      return Promise.reject("No access token set.");
    }
    return request({
      url: `${API_BASE_URL}/user`,
      method: 'GET',
    }).then(response => {
      dispatch(setCurrentUser(response));
    }).catch(error => {
      notification.error({
        message: 'Company App',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  };
}

