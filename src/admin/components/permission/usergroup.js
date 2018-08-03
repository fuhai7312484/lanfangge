import React, { Component } from "react";
import {
  Layout,
  Icon,
  message,
  Divider,
  Table,
  Button,
  Popconfirm
} from "antd";
import ToHeader from "../../Header";
import ToFooter from "../../Footer";
import ToLeftmenu from "../../Leftmenu";
import Addgroup from "./addgroupForm";
import Editgroup from "./editgroupForm";
// import { spawn } from 'child_process';
import { getDataArr,getDealKey } from "../../lib/myStorage.js";

const { Header, Footer, Content } = Layout;
class Usergroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "ID",
          key: "key",
          dataIndex: "key",
          render: text => <a href="javascript:;">{text}</a>
        
        },
        {
          title: "组名称",
          key: "pname",
          dataIndex: "pname"
        },
        {
          title: "权限描述",
          key: "pdesc",
          dataIndex: "pdesc"
        },
        {
          title: "操作",
          key: "action",
          render: (text, res) => (
            <span>
              <a href="javascript:;"
               title="编辑"
               onClick={() => {
                this.showModal('editgroup',res.id)
                
              }}
               >
              <Icon type="edit" />
              </a>
              <Divider type="vertical" />

              {res.pstate ? (
                <Popconfirm
                  title="确定要删除该组？?"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={()=>this.delGroup(res.id)}
                >
                  <a href="javascript:;" title="删除">
                    <Icon type="delete" />
                  </a>
                </Popconfirm>
              ) : (
                <Popconfirm
                  title="此用户组为超级管理员组不可以删除?"
                  okText="知道了"
                  cancelText="取消"
                
                >
                  <a href="javascript:;" title="删除">
                    <Icon type="delete" style={{ color:'#ccc'}} />
                  </a>
                </Popconfirm>
              )}
            </span>
          )
        }
      ],
      groupArr: [],
      visible: false,

      //设置7天免登陆的开关
      localval: "",
      //设置左侧导航展开或收起的开关
      collapsed: false,
      ModalIndex: "",
      editIndex: ""
    };
  }

  async componentDidMount() {
   
    await getDataArr("group?act=get").then(data => {
      this.setState({ groupArr: getDealKey(data.groupArr) });
    });

   
  }

  //错误提示信息
  error = Tip => {
    message.error(Tip);
  };
  //退出登陆
  signOut = () => {
    let { history } = this.props;
  };
  //点击左侧菜单控制展开或者收起的事件
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  //点击打开对话框
  showModal = (index, resIndex) => {
    this.setState({
      visible: true,
      ModalIndex: index,
      editIndex: resIndex ? resIndex : null
    });
  };
//点击取消弹框
  Cancel = () => {
    this.setState({ visible: false });
  };
//定位当前弹出框里的form表单
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
//判断当前点击的是哪个弹框
  ModeShow(){
    // let {visible, onCancel,editIndex,onCreate,ModalIndex,form} = this.props;
    // const { getFieldDecorator } = form;
    let {visible,ModalIndex,editIndex} =this.state;
    switch (ModalIndex) {
      case 'addgroup':
    return <Addgroup
      visible={visible}
      Cancel={this.Cancel}
      onCreate={this.handleCreate}
      wrappedComponentRef={this.saveFormRef}
      ModalIndex={ModalIndex}
      editIndex={editIndex}
    />
        break;
        case 'editgroup':
        return <Editgroup
        visible={visible}
        Cancel={this.Cancel}
        onCreate={this.handleCreate}
        wrappedComponentRef={this.saveFormRef}
        ModalIndex={ModalIndex}
        editIndex={editIndex}
      />
           break;

      default:
        break;
    }

  }

  delGroup=(id)=>{
  getDataArr('group?act=delgroup&id='+id).then(data => {
    message.success(data.msg);
        getDataArr("group?act=get").then(data => {
          this.setState({ groupArr:getDealKey(data.groupArr) });
        });
  });
  }

//点击弹框的确定按钮的回调函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      // console.log('Received values of form: ', values);

      switch (values.Formkey) {
     
        case "addgroup":
       let pdesc = values.pdesc==undefined?'':values.pdesc;
       console.log(values)
          getDataArr(
            "group?act=add&grname=" + values.pname + "&grdesc=" + pdesc
          ).then(data => {
            if (data.code === 0) {
              message.success(data.msg);
              getDataArr("group?act=get").then(data => {
                this.setState({ groupArr:getDealKey(data.groupArr) });
              });
              form.resetFields();
              // this.setState({ visible: false });
            } else if (data.code === -3) {
              message.success(data.msg);
            } else if (data.code === -1) {
              message.success(data.msg);
            }
          });

          break;
          case 'editgroup':
          console.log(values)
          let pdesc2 = values.pdesc==undefined?'':values.pdesc;
          getDataArr('group?act=add&id='+values.id+'&grname=' + values.pname + '&grdesc=' + pdesc2)
          .then(data=>{
            if (data.code === 0) {
              message.success(data.msg);
              getDataArr("group?act=get").then(data => {
                this.setState({ groupArr:getDealKey(data.groupArr) });
              });
              form.resetFields();
              this.setState({ visible: false });
            }else if (data.code === -1) {
              message.success(data.msg);
            }

          })
          break;
      }
    });
  };

  render() {
    let { collapsed, groupArr, columns, visible } = this.state;

    let { history } = this.props;
 
    console.log(groupArr)
    return (
      <Layout>
        <ToLeftmenu
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        />
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            {/* 控制左侧菜单展开或者收起的按钮 */}
            <ToHeader
              history={history}
              toggle={this.toggle}
              collapsed={collapsed}
            />
            {collapsed}
          </Header>

          <Content
            style={{
              margin: "10px 8px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <div style={{ overflow: "hidden", marginBottom: 10 }}>
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => {
                  this.showModal("addgroup");
                }}
              >
                <Icon type="user-add" />添加权限组
              </Button>
            </div>

{this.ModeShow()}

            {/* <Addgroup
              visible={visible}
              Cancel={this.Cancel}
              onCreate={this.handleCreate}
              wrappedComponentRef={this.saveFormRef}
              ModalIndex={ModalIndex}
              editIndex={editIndex}
            /> */}

            <Table
              dataSource={groupArr}
              columns={columns}
              // rowSelection={rowSelection}
              // defaultExpandAllRows={true}
              // hideDefaultSelections={true}
            />
          </Content>
          <Footer>
            {" "}
            <ToFooter />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Usergroup;
