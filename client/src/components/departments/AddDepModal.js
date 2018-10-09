import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getHeadsNames } from '../../actions/user_action';
import { Modal, Form, Input, Cascader, InputNumber } from 'antd';
const FormItem = Form.Item;

const AddDepModal = Form.create()(class extends Component {
  constructor(props) {
    super(props);
    this.state = { options: [] };
  }

  static getDerivedStateFromProps(props) {
    if (props.heads) {
      let names = props.heads.map((element) => ({ fullName: element.firstName + " " + element.lastName}));
      console.log(names);
        return {
          options: names,
        };
      }
    return null;
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal
        visible={visible}
        title="Add New Department"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="horizontal">
          <FormItem
            {...formItemLayout}
            label="Department Name">
            {getFieldDecorator('departmentName', {
              rules: [{
                required: true, message: 'Please input the department name!'
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="City">
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Please input the city!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Head of Department"
          >
            {getFieldDecorator('headOfDepartment', {
              rules: [{ type: 'string', required: true, message: 'Please select the head of department!' }],
            })(
              <Cascader options={this.state.options} fieldNames={{ label: 'fullName', value: 'fullName', children: 'children' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Minimum Salary">
            {getFieldDecorator('minSalary')(
              <InputNumber min={0} max={1000000} step={100} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Maximum Salary">
            {getFieldDecorator('maxSalary')(
              <InputNumber min={0} max={1000000} step={1000} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
  }
);

const mapStateToProps = (state) => ({
  heads: state.user.headsName,
});

export default connect(mapStateToProps, { getHeadsNames })(AddDepModal);