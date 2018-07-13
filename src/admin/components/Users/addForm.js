import React, { Component } from "react";
import { Form, Input, Modal , Row, Col } from "antd";

const FormItem = Form.Item;

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
    const { visible, onCancel, onCreate,getFieldDecorator } = this.props;
    // const { getFieldDecorator } = this.props.form;

    // const { getFieldDecorator } = form;
    // let {visible,loading,handleOk,handleCancel}=this.props
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
          title="添加新会员"
          okText="添加"
          cancelText="取消"
          onCancel={onCancel}
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
                      initialValue:'addUser',
                    })(<Input disabled hidden />)}

                  <FormItem label="用户名" hasFeedback {...formItemLayout} className="ant-form-margin">
                    {getFieldDecorator("username", {
                      rules: [
                        {
                          required: true,
                          message: "用户名不能为空！",
                         
                        }
                      ]
                    })(<Input />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="密码" hasFeedback className="ant-form-margin">
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "请输入密码!"
                        },
                        {
                          validator: this.checkConfirm
                        }
                      ]
                    })(<Input type="password" />)}
                  </FormItem>

                  { <FormItem {...formItemLayout} label="确认密码" hasFeedback className="ant-form-margin">
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "请确认你的密码!"
                        },
                        {
                          validator: this.checkPassword
                        }
                      ]
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem> }

                  <FormItem {...formItemLayout} label="邮箱" hasFeedback className="ant-form-margin">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          type: "email",
                          message: "请输入合理的邮箱地址!"
                        },
                        {
                          required: true,
                          message: "请输入邮箱地址!"
                        }
                      ]
                    })(<Input />)}
                  </FormItem>

                  <FormItem {...formItemLayout} label="电话号码" className="ant-form-margin">
                    {getFieldDecorator("phone", {
                      rules: [
                        { required: true,
                           message: "请输入你的电话号码!"
                         }
                      ]
                    })(<Input />)}
                  </FormItem>






                   {/* <FormItem {...formItemLayout} label="会员状态">
                   {getFieldDecorator('userstate', { 
                    rules: [{ required: false}],
                    valuePropName:'checked'
                
                   })(
                   <Switch checkedChildren="启用" unCheckedChildren="禁用" />
                         )}

                   </FormItem> */}
                   
                </Form>
              </div>
            </Col>
          </Row>
       
        </Modal>
      
      </div>

    );
  }
}
export default Form.create()(AddForm);
