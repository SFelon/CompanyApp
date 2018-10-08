import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/auth_action';
import { getUserProfile } from '../../actions/user_action';
import { Menu, Icon, Layout, Avatar } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = Layout.Header;

class AppHeader extends Component {

  handleClick = (e) => {
    switch (e.key) {
      case 'profile':
        //TODO
        this.props.getUserProfile(this.props.currentUser.username);
        break;
      case 'logout':
        this.props.logoutAction();
        this.props.history.push("/");
        break;
      default:
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Header className='app-header'>
          <div className='container'>
            <div className='app-title' style={{ fontSize: '24px', lineHeight: '64px', float: 'left'}}>
              <Link to='/'> <Icon type='reconciliation' theme='outlined'/> Company App </Link>
            </div>
            <Menu
              className='app-menu'
              mode='horizontal'
              style={{lineHeight: '64px', float: 'right'}}
              onClick={this.handleClick}
            >
              <SubMenu title={<span><Icon type='setting'/> User </span>}>
                <MenuItemGroup title={
                  <span><Avatar icon="smile" style={{ backgroundColor: '#13c2c2' }} />{` @${this.props.currentUser.username}`}</span>
                }>
                  <Menu.Item key='profile'>
                    <Icon type='user'/>Profile</Menu.Item>
                  <Menu.Item key='logout'>
                    <Icon type='logout'/>Logout</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
            </Menu>
          </div>
        </Header>
      );
    } else {
      return null;
    }
  };
}

export default withRouter(connect(null, { logoutAction , getUserProfile })(AppHeader));
