import React from 'react';
import { Input, Table, Icon, Divider, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { deleteDepartment } from '../../actions/department_action';
import './DepTable.css'

class DepTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sortedInfo: null,
      searchText:'',
      prevDepartments: [],
    };
  };

  static getDerivedStateFromProps(props, state) {
    if (props.departments && props.departments.length !== state.prevDepartments.length) {
      return {
        prevDepartments: props.departments,
      };
    }
    return null;
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  handleDelete(id) {
    this.props.deleteDepartment({id});
  }

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    function sortScenario(a,b){
      a = a || '';
      b = b || '';
      return b.localeCompare(a, 'pl', {sensitivity: 'base'});
    };

    const columns = [{
      title: 'Department Name',
      dataIndex: 'departmentName',
      key: 'departmentName',
      sorter: (a,b) => sortScenario(a.departmentName, b.departmentName),
      sortOrder: sortedInfo.columnKey === 'departmentName' && sortedInfo.order,
      width: '30%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#13c2c2' : '#aaa' }} />,
      onFilter: (value, record) => record.departmentName.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment 
            ))}
          </span>
        ) : text;
      },
    },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        sorter: (a, b) => sortScenario(a.city, b.city),
        sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
        width: '25%',
      },
      {
        title: 'Head of Department',
        dataIndex: 'headOfDepartment',
        key: 'headOfDepartment',
        sorter: (a, b) => sortScenario(a.headOfDepartment, b.headOfDepartment),
        sortOrder: sortedInfo.columnKey === 'headOfDepartment' && sortedInfo.order,
        width: '30%',
      },
      {
        title: 'Action',
        key: 'action',
        width: '15%',
        render: (text, record) => (
          <span>
            <a href="javascript:;">
            {`Edit `} 
            <Icon type="edit"/>
            </a>
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
            <a href="javascript:;">
            {`Delete `} 
            <Icon type="delete"/>
            </a>
            </Popconfirm>
          </span>
        ),
      }
    ];

  if(this.props.departments && this.props.departments.length > 0) {
    return (
      <div>
        <Table columns={columns} dataSource={this.state.prevDepartments} rowKey={record => record.departmentName} onChange={this.handleChange} size="small"/>
      </div>
    );
  } else {
    return null;
  }
}
}

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
});

export default connect(mapStateToProps, { deleteDepartment })(DepTable);
