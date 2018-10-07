import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';
import Login from '../components/login/Login';
import AppHeader from '../components/common/AppHeader';
import UserTable from '../components/user_data/UserTable';
import LoadingIndicator from '../components/common/LoadingIndicator';
import CEO_Dashboard from '../components/dashboard/CEO_Dashboard';
import HEAD_Dashboard from '../components/dashboard/HEAD_Dashboard';
import EMPLOYEE_Dashboard from '../components/dashboard/EMPLOYEE_Dashboard';

const { Content } = Layout;

class App extends Component {

  /*
  componentDidUpdate() {
    if(!this.props.isAuthenticated) {
      return this.props.history.push('/')
    };
  };*/

  render() {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    } 
    return (
      <Layout className="app-container">
        <AppHeader isAuthenticated={this.props.isAuthenticated} 
        currentUser={this.props.currentUser} 
        />
        <Content className="app-content">
          <div className="container">
            <Switch>
            <Route 
              path="/" 
              render={() => !this.props.isAuthenticated && !!this.props.roles ?
                  <UserTable/> :
                  <Redirect to="/ceo" />
              }/>
              <Route path="/login" component={Login} />
              <Route exact path="/ceo" component={CEO_Dashboard} />
              <Route exact path="/head" component={HEAD_Dashboard} />
              <Route exact path="/employee" component={EMPLOYEE_Dashboard} />
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  roles: state.auth.roles,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default withRouter(connect(mapStateToProps,null)(App));
