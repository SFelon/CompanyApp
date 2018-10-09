import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDepartmentList, addDepartment } from '../../actions/department_action';
import { getHeadsNames } from "../../actions/user_action";
import DepTable from '../departments/DepTable';
import AddDepModal from '../departments/AddDepModal';
import { Col, Row, Card, Icon, Skeleton} from 'antd';




class CEO_Dashboard extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
    this.props.getHeadsNames();
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      const addDepRequest = Object.assign({}, values);
      this.props.addDepartment(addDepRequest);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  getDepartments = () => {
    this.props.getDepartmentList();
  }

  render() {
    return (
      <div className="ceo-dashboard" style={{padding: '0 50px'}}>
        <Row gutter={16}>
          <Col span={18}>
            <Skeleton loading={this.props.isLoading}>
              <DepTable />
            </Skeleton>
          </Col>
          <Col span={6}>
            <Card title={<span><Icon type='cluster' style={{padding: '0 8px', fontSize: '32px'}}/> Departments</span>}
                  actions={[
                  <Icon type="ordered-list"
                  onClick={this.getDepartments} />, 
                  <Icon type="plus"
                  onClick={this.showModal}
                  />
                ]}
            >
              Card content
            </Card>
            <br></br>
            <Card title={<span><Icon type='team' style={{ padding: '0 8px', fontSize: '32px'}}/> Users</span>}
                  actions={[<Icon type="ordered-list" />, <Icon type="edit" /> ]}
            >
              Card content
            </Card>
          </Col>
        </Row>
        <div>
          <AddDepModal
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
  isLoading: state.departments.isLoadingDepartments,
});

export default withRouter(connect(mapStateToProps, { getDepartmentList , getHeadsNames, addDepartment })(CEO_Dashboard));
