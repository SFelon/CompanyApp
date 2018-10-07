import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/auth_action';
import { getUserProfile } from '../../actions/user_action';
import { Menu, Icon, Layout } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = Layout.Header;

class AppHeader extends Component {

  handleClick = (e) => {
    console.log('click ', e);
    switch (e.key) {
        case 'profile':
            //TODO id jako argument
            this.props.getUserProfile();
            break;
        case 'logout': 
            this.props.logoutAction();
            this.props.history.push("/"); 
            break;
        default:     
    }
  }

  render() {
    return (
    <Header className='app-header'>
        <div className='container'>
              <div className='app-title' style={{ lineHeight: '64px', float: 'left' }}>
                <Link to='/'> <Icon type='reconciliation' theme='outlined' /> Company App </Link>
              </div>      
        <Menu
            className='app-menu'
            mode='horizontal'
            style={{ lineHeight: '64px', float: 'right' }}
            onClick={this.handleClick}
        >
            <SubMenu title={<span><Icon type='setting' /> User </span>}>
            <MenuItemGroup title='Item 1'>
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
  }
}

export default withRouter(connect(null, { logoutAction , getUserProfile })(AppHeader));
