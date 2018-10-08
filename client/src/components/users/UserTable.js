import React from 'react';
import { Input, Table, Icon } from 'antd';
import _ from 'lodash';

const Search = Input.Search;

const data = [
  {fieldtext:{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  x:'extra1'
}}
, {fieldtext:{
  key: '2',
  name: 'Jim Green', 
  age: 42,
  address: 'London No. 1 Lake Park',
  x:'extra2'
}}, {fieldtext:{
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  x:'extra2'
}}, {fieldtext:{
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
  x:'extra3'
}}];

class UserTable extends React.Component {
  state = {
    sortedInfo: null,
    data,
    searchText:'',
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  }

  emitEmpty = () => {
      this.setState({ 
      data: data,
          searchText: '',
    });
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSearch = (e) => {
    
    this.setState({ searchText: e.target.value });
    const { searchText } = this.state;
    const reg = new RegExp(e.target.value, 'gi');
    this.setState({
      data: _.flatMap(this.state.data, record => {
        const nameMatch = record.name.match(reg);
        const addressMatch = record.address.match(reg);
        if (!nameMatch && !addressMatch) {
          return null;
        }
        return {          
          ...record,
          };
      }).filter(record => !!record),
    });
      if (e.target.value === ''){
      this.setState({
        data: data,
      });     
    
    }
  }

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [{
      title: 'Name',
      dataIndex: 'fieldtext.name',
      key: 'name',
      sorter: (a, b) => a.name > b.name ? 1 : -1,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Age',
      dataIndex: 'fieldtext.age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    },
    {
      title: 'Address',
      dataIndex: 'fieldtext.address',
      key: 'address',
      sorter: (a, b) => a.address > b.address ? 1 : -1,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    }];

    const { searchText } = this.state;
    const suffix = searchText ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div>
        <div className="table-operations">
         <Search size="large" ref={ele => this.searchText = ele} suffix={suffix} onChange={this.onSearch} placeholder="Search Records" value={this.state.searchText}
                onChange={this.onSearch} onPressEnter={this.onSearch} 
         />
        </div>
        <Table columns={columns} dataSource={this.state.data} rowKey={record => record.fieldtext.key} onChange={this.handleChange} size="small"/>
      </div>
    );
  }
}

export default UserTable;
