import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { signInAction } from '../../actions/auth_action';
import LoginForm from './LoginForm';
import './Login.css';

import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className="login-container">
        <h1 className="page-title">Login</h1>
        <div className="login-content">
          <AntWrappedLoginForm onLogin={this.props.onLogin} />
        </div>
      </div>
    );
  }
}

export default Login;
/*
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Zatwierdzenie formularza")
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        console.log(loginRequest);
        this.props.dispatch(signInAction(loginRequest));
        }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('usernameOrEmail', {
            rules: [{ required: true, message: 'Please input your username or email!' }],
          })(
            <Input
              prefix={<Icon type="user" />}
              size="large"
              name="usernameOrEmail"
              placeholder="Username or Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              name="password"
              type="password"
              placeholder="Password"  />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
          Or <Link to="/signup">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default connect(null, null)(Login);
*/

