import React, { Component } from 'react';
import './App.css';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Layout } from 'antd';
import Login from '../components/login/Login';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="app-container">
        <Content className="app-content">
          <div className="container">
            <Switch>
              <Route path="/" component={Login} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
