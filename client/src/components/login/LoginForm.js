import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Component} from 'react';
import {signInAction, getCurrentUser} from '../../actions/auth_action';
import LoadingIndicator from '../common/LoadingIndicator';
import {Button, Form, Icon, Input} from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn(data){
    this.props.signInAction(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Zatwierdzenie formularza")
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        console.log(loginRequest);
        this.signIn(loginRequest);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if(this.props.isLoading) {
      return <LoadingIndicator />
    }
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

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps, {signInAction, getCurrentUser} )(LoginForm);
