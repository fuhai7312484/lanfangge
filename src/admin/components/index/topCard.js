import React, { Component } from "react";
import { Card, Col, Row, Icon } from "antd";

class Topcard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row gutter={16}>
        <Col className="gutter-row" md={8} style={{ paddingBottom:16  }}>
          <div className="gutter-box">
            <Card bordered={false}>
              <div className="clear y-center">
                <div className="pull-left mr-m">
                  <Icon type="heart" className="text-2x text-danger" />
                </div>
                <div className="clear">
                  <div className="text-muted">收藏</div>
                  <h2>301</h2>
                </div>
              </div>
            </Card>
          </div>
        </Col>

        <Col className="gutter-row" md={8} style={{paddingBottom:16  }}>
          <div className="gutter-box">
            <Card bordered={false}>
              <div className="clear y-center">
                <div className="pull-left mr-m">
                  <Icon type="heart" className="text-2x text-danger" />
                </div>
                <div className="clear">
                  <div className="text-muted">会员数</div>
                  <h2>301</h2>
                </div>
              </div>
            </Card>
          </div>
        </Col>

        <Col className="gutter-row" md={8} style={{ paddingBottom:16 }}>
          <div className="gutter-box">
            <Card bordered={false}>
              <div className="clear y-center">
                <div className="pull-left mr-m">
                  <Icon type="heart" className="text-2x text-danger" />
                </div>
                <div className="clear">
                  <div className="text-muted">订单量</div>
                  <h2>301</h2>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Topcard;
