import {ACCESS_TOKEN, API_BASE_URL, SET_CURRENT_USER} from "../constants";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

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

export function signInAction(loginRequest) {
  console.log("inside action 1");
  request({
    url: `${API_BASE_URL}/auth/signin`,
    method: 'POST',
    body: JSON.stringify(loginRequest),
  }).then(response => {
    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
  });
  return (dispatch) => {
    console.log("inside action 2");
    dispatch(setCurrentUser(localStorage.getItem(ACCESS_TOKEN)));
  };
};

/*export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}*/