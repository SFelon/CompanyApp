import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDepartmentList, addDepartment } from '../../actions/department_action';
import { getHeadsNames } from "../../actions/user_action";
import DepTable from '../departments/DepTable';
import AddDepModal from '../departments/AddDepModal';
import { Col, Row, Card, Icon, Skeleton, Tooltip} from 'antd';

class CEO_Dashboard extends Component {
  state = {
    visible: false,
    numberOfDepartments: this.props.numberOfDepartments || 0,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.numberOfDepartments && props.numberOfDepartments !== state.numberOfDepartments) {
      return {
        numberOfDepartments: props.numberOfDepartments,
      };
    }
    return 0;
  };

  showModal = () => {
    this.setState({ visible: true });
    this.props.getHeadsNames();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if(values.minSalary === undefined) {
        values.minSalary = 0;
      }
      if (values.maxSalary === undefined) {
        values.maxSalary = 0;
      }
      if (err) {
        return;
      }
      const addDepRequest = Object.assign({}, values);
      this.props.addDepartment(addDepRequest);
      form.resetFields();
      this.props.getDepartmentList();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  getDepartments = () => {
    this.props.getDepartmentList();
  };

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
                  <Tooltip placement="bottomLeft" title="List departments">  
                    <Icon type="ordered-list"
                    onClick={this.getDepartments} />
                  </Tooltip>,
                  <Tooltip placement="bottomLeft" title="Add new department">   
                    <Icon type="plus"
                    onClick={this.showModal}
                    />
                  </Tooltip>,
                ]}
            >
              {`No of departments: ${this.state.numberOfDepartments}`}
            </Card>
            <br></br>
            <Card title={<span><Icon type='team' style={{ padding: '0 8px', fontSize: '32px'}}/> Users</span>}
                  actions={[
                  <Icon type="ordered-list" />, 
                  <Icon type="edit" /> ]}
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
  numberOfDepartments: state.departments.departments.length,
  isLoading: state.departments.isLoadingDepartments,
});

export default withRouter(connect(mapStateToProps, { getDepartmentList , getHeadsNames, addDepartment })(CEO_Dashboard));
