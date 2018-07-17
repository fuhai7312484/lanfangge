import React,{Component} from 'react'
import {Modal,Form,Row,Col,Input} from 'antd'
import {getDataArr} from '../../lib/myStorage'
const FormItem = Form.Item;
const { TextArea } = Input;

class Editgroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pidVal:0,
            pnameVal:'',
            pdescVal:'',
            pstate:true,
          };
    }


    
  async componentDidMount() {
    let {editIndex} = this.props;
    editIndex = editIndex==null?0:editIndex;
    await getDataArr("group?act=get&id="+ editIndex)
    .then(data => {
   
      
      this.setState({
        pidVal:data.id,
        pnameVal:data.pname,
        pdescVal:data.pdesc,
        pstate:data.pstate,
       
       })
      // this.setState({ dataArr:data.arr });
    });
  }

  async componentWillReceiveProps(props) {
    let {editIndex,visible} = props;
    await getDataArr("group?act=get&id="+ editIndex)
    .then(data => {
      
      
      this.setState({
        pidVal:data.id,
        pnameVal:data.pname,
        pdescVal:data.pdesc,
        pstate:data.pstate,
       
       })
      // this.setState({ dataArr:data.arr });
    });
  }





    render() {
        let{ visible,Cancel,onCreate,form} =this.props
        const { getFieldDecorator } = form;
        let {pidVal,pnameVal,pdescVal,pstate} = this.state;
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
            <Modal
            visible={visible}
            title="编辑权限组"
            okText="提交"
            onCancel={Cancel}
            onOk={onCreate}
            cancelText="取消">
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
                      initialValue:'editgroup',
                    })(<Input disabled hidden />)}


                     {getFieldDecorator("id", {
                      rules: [
                        {
                          required: false,
                          
                        }
                      ],
                      initialValue:pidVal,
                    })(<Input disabled hidden />)}

      <FormItem label="用户组名称" hasFeedback {...formItemLayout} className="ant-form-margin">
                    {getFieldDecorator("pname", {
                      rules: [
                        {
                          required: true,
                          message: "用户组名称不能为空！",
                         
                        }
                      ],
                      initialValue:pnameVal
                    })(<Input />)}
                  </FormItem>

                    <FormItem label="用户组描述" hasFeedback {...formItemLayout} className="ant-form-margin">
                    {getFieldDecorator("pdesc", {
                      rules: [
                        {
                          required: false,
                         
                        }
                      ],
                      initialValue:pdescVal
                    })( <TextArea rows={4} />)}
                  </FormItem>

                 


              </Form>


              </div>
              </Col>
              </Row>

            </Modal>
            
        );
    }
}

export default Form.create()(Editgroup);