import React, { Component } from 'react';
import './App.css';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import Login from '../components/login/Login';
import { Layout } from 'antd';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="app-container">
        <Content className="app-content">
          <div className="container">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default withRouter(App);
