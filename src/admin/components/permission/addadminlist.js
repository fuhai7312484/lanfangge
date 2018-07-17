
import React, {Component} from 'react';
import {getDataArr,getDealKey} from '../../lib/myStorage'
import {Modal,Row,Col,Form,Input,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class Addadmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          groupArr:[],
          pid:'',

         };
    }
   async componentDidMount(){
     let {groupArr,pid} = this.state;
    await getDataArr('/group?act=get')
    .then(data=>{
      console.log(data.groupArr[1].id)
        this.setState({ groupArr: getDealKey(data.groupArr),pid:data.groupArr[1].id});
    })

    }

    handleChange=(value)=>{
      let {pid} = this.state;
      console.log(`selected ${value}`);
      this.setState({pid:value})
      
    }

    render() {
        let {visible,Cancel,onCreate,form} = this.props;
        const { getFieldDecorator } = form;
        let {groupArr,pid} = this.state;
       console.log(pid)
        let newArr = groupArr.map((e,i)=>{
          return <Option key={e.id} value={e.id}>{e.pname}</Option>;

        })
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
          title="添加管理员"
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
                      initialValue:'addadmin',
                    })(<Input disabled hidden />)}

                     {getFieldDecorator("groupsId", {
                      rules: [
                        {
                          required: false,
                          
                        }
                      ],
                      initialValue:pid,
                    })(<Input disabled hidden />)}

      <FormItem label="管理员名称" hasFeedback {...formItemLayout} className="ant-form-margin">
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "用户组名称不能为空！",
                         
                        }
                      ]
                    })(<Input />)}
                  </FormItem>

                  <FormItem {...formItemLayout} label="密码" hasFeedback className="ant-form-margin">
                    {getFieldDecorator("pass", {
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
                   <FormItem {...formItemLayout} label="权限组" className="collection-create-form_last-form-item">
              {getFieldDecorator('groupsName', {
                initialValue: '普通用户组',
              })(
                <Select onChange={this.handleChange}>
                {newArr}
                  {/* <Option value="超级管理员组">超级管理员组</Option>
                  <Option value="普通用户组">普通用户组</Option>
                  */}
                </Select>
              )}
            </FormItem>
              </Form>
              </div>
              </Col>
              </Row>
              {/* <Select style={{ width: 120 }}>
{newArr}
</Select> */}
          
          </Modal>

            </div>
            
        );
    }
}

export default Form.create()(Addadmin);