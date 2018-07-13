import React, { Component } from "react";
import { Form} from "antd";
import AddForm from './addForm'
import EditForm from './editForm'
const FormItem = Form.Item;

class AddUsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  ModeShow(){
    let {visible, onCancel,editIndex,onCreate,ModalIndex,form} = this.props;
    const { getFieldDecorator } = form;

    switch (ModalIndex) {
      case 'adduser':
    return <AddForm visible={visible}  
          onCancel={onCancel}
          onCreate={onCreate} 
          getFieldDecorator={getFieldDecorator} 
         
    />
        break;
        case 'edit':
        return <EditForm visible={visible}
         editIndex={editIndex}
          onCancel={onCancel}
          onCreate={onCreate} 
          getFieldDecorator={getFieldDecorator} 
           />
           break;

      default:
        break;
    }

  }
  render() {
    const { form } = this.props;
    // const { getFieldDecorator } = this.props.form;

    const { getFieldDecorator } = form;
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

        {this.ModeShow()}

{/* <AddForm formItemLayout={formItemLayout}
 visible={visible} 
 onCancel={onCancel}
 onCreate={onCreate} 
 getFieldDecorator={getFieldDecorator}
 
 />



 <EditForm /> */}




        {/* <Modal
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
                  <FormItem label="用户名" hasFeedback {...formItemLayout}>
                    {getFieldDecorator("username", {
                      rules: [
                        {
                          required: true,
                          message: "用户名不能为空！"
                        }
                      ]
                    })(<Input />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="密码" hasFeedback>
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

                  { <FormItem {...formItemLayout} label="确认密码" hasFeedback>
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

                  <FormItem {...formItemLayout} label="邮箱" hasFeedback>
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

                  <FormItem {...formItemLayout} label="电话号码">
                    {getFieldDecorator("phone", {
                      rules: [
                        { required: true, message: "请输入你的电话号码!" }
                      ]
                    })(<Input />)}
                  </FormItem>

                   
                </Form>
              </div>
            </Col>
          </Row>
       
        </Modal>
       */}
      </div>

      // <Modal
      // title="新增会员"
      // visible={visible}
      // onOk={handleOk}
      // onCancel={handleCancel}
      // footer={[
      //   <Button key="back" onClick={handleCancel}>取消</Button>,
      //   <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
      //     确认添加
      //   </Button>,
      // ]}
      // >

      //  <Form layout="vertical">
      // 这里是内容

      // <FormItem label="Title">
      //               {getFieldDecorator('title', {
      //                 rules: [{ required: true, message: 'Please input the title of collection!' }],
      //               })(
      //                 <Input />
      //               )}
      //             </FormItem>
      // </Form>
      // </Modal>

      //   <Form onSubmit={this.handleSubmit}>
      //     <FormItem {...formItemLayout} label="邮箱" hasFeedback>
      //       {getFieldDecorator("email", {
      //         rules: [
      //           {
      //             type: "email",
      //             message: "请输入合理的邮箱地址!"
      //           },
      //           {
      //             required: true,
      //             message: "请输入邮箱地址!"
      //           }
      //         ]
      //       })(<Input />)}
      //     </FormItem>
      //   </Form>
    );
  }
}
export default Form.create()(AddUsForm);
