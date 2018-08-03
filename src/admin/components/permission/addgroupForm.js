
import React, {Component} from 'react';
import {Modal,Row,Col,Form,Input,DatePicker} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const { TextArea } = Input;
class Addgroup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          timevalue:'',
         };
    }
  
    render() {
        let {visible,Cancel,onCreate,form} = this.props;
        const { getFieldDecorator } = form;
        // const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 14 }
            }
          };
        return (
            <div>

                 <Modal
          visible={visible}
          title="添加权限组"
          okText="添加"
          cancelText="取消"
          onCancel={Cancel}
          onOk={onCreate}
          >
        
          <Row gutter={16}>
            <Col className="gutter-row" md={32}>
              <div className="gutter-box">
              <Form layout="vertical">
              {getFieldDecorator("Formkey", {
                      rules: [
                        {
                          required: false,
                          
                        }
                      ],
                      initialValue:'addgroup',
                    })(<Input disabled hidden />)}

      <FormItem label="用户组名称" hasFeedback {...formItemLayout} className="ant-form-margin">
                    {getFieldDecorator("pname", {
                      rules: [
                        {
                          required: true,
                          message: "用户组名称不能为空！",
                         
                        }
                      ]
                    })(<Input />)}
                  </FormItem>

                    <FormItem label="用户组描述" hasFeedback {...formItemLayout} className="ant-form-margin">
                    {getFieldDecorator("pdesc", {
                      rules: [
                        {
                          required: false,
                         
                        }
                      ]
                    })( <TextArea rows={4} />)}
                  </FormItem>

                   {/* {getFieldDecorator("aa", {
                      rules: [
                        {
                          required: false,
                         
                        }
                      ]
                    })(<DatePicker/>)} */}


              </Form>


              </div>
              </Col>
              </Row>



          
          </Modal>

            </div>
            
        );
    }
}

export default Form.create()(Addgroup);