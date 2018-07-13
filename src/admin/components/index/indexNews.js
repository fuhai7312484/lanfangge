import React,{Component} from 'react';
import {Card, Col, Row,Icon,Tag,Input,Mention} from 'antd';
import b1 from '../../images/profile_small.jpg';
const Search = Input.Search;
class Indexnews extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
         

       <Col className="gutter-row" md={11} style={{paddingBottom:16,paddingLeft: 8,paddingRight: 8, }}>
                              <div className="gutter-box">
                                  <Card bordered={false}>
                                      <div className="pb-m">
                                          <h3>消息栏</h3>
                                      </div>
                                      <a className="card-tool"><Icon type="sync" /></a>
                                      <ul className="list-group no-border">
                                          <li className="list-group-item">
                                          <Tag className="list-reply-btn" style={{ background: '#fff' }}>回复</Tag>
                                              <a href="" className="pull-left w-40 mr-m">
                                                  <img src={b1} className="img-responsive img-circle" alt="test" />
                                              </a>
                                              <div className="clear">
                                                  <a href="" className="block">王哈哈<time>2018-02-10</time></a>
                                                  <span className="text-muted">这是啥怎么回事...</span>
                                              </div>
                                          </li>
                                          <li className="list-group-item">
                                          <Tag className="list-reply-btn replied " >已回复</Tag>
                                              <a href="" className="pull-left w-40 mr-m">
                                                  <img src={b1} className="img-responsive img-circle" alt="test" />
                                              </a>
                                              <div className="clear">
                                                  <a href="" className="block">鸣人<time>2018-02-10</time></a>
                                                  <span className="text-muted">终于当上火影了！</span>
                                              </div>
                                          </li>
                                          <li className="list-group-item">
                                          <Tag className="list-reply-btn" style={{ background: '#fff' }}>回复</Tag>
                                              <a href="" className="pull-left w-40 mr-m">
                                                  <img src={b1} className="img-responsive img-circle" alt="test" />
                                              </a>
                                              <div className="clear">
                                                  <a href="" className="block">王哈哈<time>2018-02-10</time></a>
                                                  <span className="text-muted">这是啥怎么回事...</span>
                                              </div>
                                          </li>
                                          <li className="list-group-item">
                                          <Tag className="list-reply-btn" style={{ background: '#fff' }}>回复</Tag>
                                              <a href="" className="pull-left w-40 mr-m">
                                                  <img src={b1} className="img-responsive img-circle" alt="test" />
                                              </a>
                                              <div className="clear">
                                                  <a href="" className="block">王哈哈<time>2018-02-10</time></a>
                                                  <span className="text-muted">这是啥怎么回事...</span>
                                              </div>
                                          </li>
                                          
                                          
                                      </ul>
                                      <div className="index-reply-form">

                                        <Search
                                            placeholder="@王哈哈："
                                            onSearch={value => console.log(value)}
                                            enterButton={'回复'}
                                            />

                                      </div>
                                  </Card>
                              </div>
                          </Col>

         
            
        );
    }
}

export default Indexnews;