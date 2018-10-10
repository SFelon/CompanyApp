import React, { Component } from 'react';
import { Form } from 'antd';
import LoginForm from './LoginForm';
import './Login.css';

class Login extends Component {
  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className="login-container">
        <h1 className="page-title">Login</h1>
        <div className="login-content">
          <AntWrappedLoginForm />
        </div>
      </div>
    );
  };
};

export default Login;
