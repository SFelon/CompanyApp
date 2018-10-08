import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import departmentReducer from './department_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  departments: departmentReducer,
});

export default rootReducer;
