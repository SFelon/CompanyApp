import {Component} from "react";
import {signInAction, getCurrentUser} from "../../actions/auth_action";
import {Button, Form, Icon, Input} from "antd";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import React from 'react';

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    this.props.getCurrentUser();
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Zatwierdzenie formularza")
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        console.log(loginRequest);
        signInAction(loginRequest);
        this.getUser();
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

export default connect(null, {getCurrentUser} )(LoginForm);
