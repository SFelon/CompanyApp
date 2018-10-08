import React, { Component } from 'react';
import { Col, Row, Card, Icon} from 'antd';
import DepTable from '../departments/DepTable';

class CEO_Dashboard extends Component {
  render() {
    return (
      <div className="ceo-dashboard" style={{padding: '0 50px'}}>
        <Row gutter={16}>
          <Col span={18}>
            <DepTable />
          </Col>
          <Col span={6}>
            <Card title={<span><Icon type='cluster' style={{padding: '0 8px', fontSize: '32px'}}/> Departments</span>}
                  actions={[<Icon type="ordered-list" />, <Icon type="plus" /> ]}
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
      </div>
    );
  }
}

export default CEO_Dashboard;