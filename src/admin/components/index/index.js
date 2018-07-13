import React, { Component } from 'react';
import {Breadcrumb,Icon,Row} from 'antd';
import Topcard from './topCard';
import Indexnews from './indexNews'
import EchartsViews from './echats'
import Index from '../../Index';
class Homeindex extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
 <Breadcrumb style={{ marginBottom:10,}}>
    <Breadcrumb.Item> <Icon type="home" /><a href="./">首页</a></Breadcrumb.Item>
  </Breadcrumb>
  <div style={{ background: '#ECECEC', padding: '15px' }}>
  <Topcard />
  <Row gutter={16}>
  <Indexnews />
  <EchartsViews />
  </Row>
  </div>

            </div>
            
        );
    }
}

export default Homeindex;
