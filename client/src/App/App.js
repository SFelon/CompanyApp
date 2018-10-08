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
import LoadingIndicator from '../components/common/LoadingIndicator';
import CEO_Dashboard from '../components/dashboard/CEO_Dashboard';
import HEAD_Dashboard from '../components/dashboard/HEAD_Dashboard';
import EMPLOYEE_Dashboard from '../components/dashboard/EMPLOYEE_Dashboard';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { role: '' };
  }

  static getDerivedStateFromProps(props) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.isAuthenticated === true) {
      if ( props.currentUser ) {
        const [{authority}] = props.currentUser['authorities'];
        console.log(authority);
        const role = authority.substr(5).toLowerCase();
        console.log(role);
        return {
          role: role,
        };
      }
    }
    return null;
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }
    console.log(this.props);
    console.log(this.state);
    return (
      <Layout className="app-container">
        <AppHeader isAuthenticated={this.props.isAuthenticated} 
        currentUser={this.props.currentUser} 
        />
        <Content className="app-content">
          <div className="container">
            <Switch>
              <Route exact path="/ceo" component={CEO_Dashboard} />
              <Route exact path="/head" component={HEAD_Dashboard} />
              <Route exact path="/employee" component={EMPLOYEE_Dashboard} />
              <Route
                path="/"
                render={() => !this.props.isAuthenticated ?
                  <Login/> :
                  <Redirect from='/' to={`/${this.state.role}`} />
                }/>
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default withRouter(connect(mapStateToProps,null)(App));
