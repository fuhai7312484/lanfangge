import React, { Component } from "react";

import { Form, Input, Modal , Row, Col,Alert,Radio } from "antd";
import { getDataArr} from "../../lib/myStorage";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     dataArr:[],
      nameVal: '',
      editpass:'',
      editemail:'',
      editphone:0,
      editusstate:true,
      updatakey:0,
      editSex:''

    };
    
  }


  async componentDidMount() {
    let {editIndex} = this.props;
    await getDataArr("user?act=getOneUser&username="+ editIndex)
    .then(data => {
      this.setState({ dataArr:data.arr,
        nameVal:data.arr[0].username,
        editpass:data.arr[0].password,
        editemail:data.arr[0].adminEmail,
        editphone:data.arr[0].adminPhone,
        editusstate:data.arr[0].userstate,
        updatakey:data.arr[0].id,
        editSex:data.arr[0].sex,
       })
      // this.setState({ dataArr:data.arr });
    });
  }

  async componentWillReceiveProps(props) {
    let {editIndex,visible} = props;
   
    await getDataArr("user?act=getOneUser&username="+ editIndex)
    .then(data => {
  
      this.setState({ dataArr:data.arr,
        nameVal:data.arr[0].username,
        editpass:data.arr[0].password,
        editemail:data.arr[0].adminEmail,
        editphone:data.arr[0].adminPhone,
        editusstate:data.arr[0].userstate,
        updatakey:data.arr[0].id,
        editSex:data.arr[0].sex,
       })
      // this.setState({ dataArr:data.arr });
    });
  }


  render() {
    
    const { visible, onCancel, onCreate,editIndex,form,getFieldDecorator } = this.props;
    let {dataArr,nameVal,editpass,editSex,editemail,editphone,editusstate,updatakey} = this.state
  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
  
    return (
      <div>

         {/* <input type="text" value={'1111111'} onChange={this.nameChange} /> */}
    
        <Modal
          visible={visible}
          title="编辑用户"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          destroyOnClose={true}
        >
    
          <Row gutter={16}>
            <Col className="gutter-row" md={32}>
              <div className="gutter-box">
                <Form layout="vertical" >
                <FormItem>
                <Alert
              message="密码框默认留空不修改密码！"
             type="warning"
              showIcon className="ant-form-margin" />
                  </FormItem>
               
                {getFieldDecorator("Formkey", {
                      rules: [
                        {
                          required: false,
                          
                        }
                      ],
                      initialValue:'edit',
                    })(<Input disabled hidden />)}


                    {getFieldDecorator("userKey", {
                      rules: [
                        {
                          required: false,
                          
                        }
                      ],
                      initialValue:updatakey,
                    })(<Input disabled hidden />)}

               
                <FormItem label="用户名" hasFeedback {...formItemLayout} className="ant-form-margin">
               
                {/* <Input onChange={this.nameChange} value={'1111111'} /> */}
                  
                    {getFieldDecorator("editName", {
                      
                      rules: [
                        {
                          required: false,
                          message: "用户名不能为空！",
                          
                        }
                      ],
                      initialValue:nameVal,
                    })(<Input disabled />)}
                  </FormItem>

        
                  <FormItem {...formItemLayout} label="密码" hasFeedback className="ant-form-margin">
                    {getFieldDecorator("editpass", {
                      rules: [
                        {
                          required: false,
                          message: "请输入密码!"
                        },
                        {
                          validator: this.checkConfirm
                        }
                      ],
                     
                    })(<Input type="password" />)}
          
                  </FormItem>
                  <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('sex', {
                initialValue: editSex,
              })(
            <RadioGroup>
              <Radio value='男'>男</Radio>
              <Radio value='女'>女</Radio>
             
            </RadioGroup>
          )}
        </FormItem>
                 
                  <FormItem {...formItemLayout} label="邮箱" hasFeedback className="ant-form-margin">
                    {getFieldDecorator("editemail", {
                      rules: [
                        {
                          type: "email",
                          message: "请输入合理的邮箱地址!"
                        },
                        {
                          required: true,
                          message: "请输入邮箱地址!"
                        }
                      ],
                      initialValue:editemail,
                    })(<Input />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="电话号码" className="ant-form-margin">
                    {getFieldDecorator("editphone", {
                      rules: [
                        { required: true,
                           message: "请输入你的电话号码!"
                         }
                      ],
                      initialValue:editphone,
                    })(<Input />)}
                  </FormItem>
                   
                </Form>
              </div>
            </Col>
          </Row>
       
        </Modal>
      
      </div>

    );
  }
}
export default Form.create()(EditForm);
