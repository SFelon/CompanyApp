import React from 'react';
import { Input, Table, Icon, Divider, Button } from 'antd';
import './DepTable.css'

const data = [{
  key: '1',
  name: 'Department 1',
  city: 'New York',
  head: 'Arnold S',
}, {
  key: '2',
  name: 'Department 2',
  city: 'London',
  head: 'Lucjan K',
}, {
  key: '3',
  name: 'Department 3',
  city: 'Budapest',
  head: 'Vitali V',
}, {
  key: '4',
  name: 'Department 4',
  city: 'Warsaw',
  head: 'Staszek S',
}];

class DepTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sortedInfo: null,
      searchText:'',
    };
  };


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

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    function sortScenario(a,b){
      return b.localeCompare(a, 'pl', {sensitivity: 'base'});
    };
    const columns = [{
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
      sorter: (a,b) => sortScenario(a.name, b.name),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
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
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
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
        dataIndex: 'head',
        key: 'head',
        sorter: (a, b) => sortScenario(a.head, b.head),
        sortOrder: sortedInfo.columnKey === 'head' && sortedInfo.order,
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
            <a href="javascript:;">
            {`Delete `} 
            <Icon type="delete"/>
            </a>
          </span>
        ),
      }
    ];

  if(this.props.departments) {
    return (
      <div>
        <Table columns={columns} dataSource={data} rowKey={record => record.key} onChange={this.handleChange} size="small"/>
      </div>
    );
  } else {
    return null;
  }
}
}

export default DepTable;
