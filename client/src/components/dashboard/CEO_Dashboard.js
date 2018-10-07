import React, { Component } from 'react';
import { Col, Row, Card } from 'antd';

class CEO_Dashboard extends Component {
  render() {
    return (
    <div className="ceo-dashboard">
        <Row gutter={16}>
         <Col span={18}>col-18</Col>
         <Col span={6}>
         <Card title="Departments"
         cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
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