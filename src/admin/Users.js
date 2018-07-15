import React, { Component } from "react";

import ToHeader from "./Header";
import ToFooter from "./Footer";

import ToLeftmenu from "./Leftmenu";
import AddUsForm from "./components/Users/addUserForm";
import { getDataArr, strPhone, getCookie,getDealKey,getToTime} from "./lib/myStorage.js";
import {
  Layout,
  Icon,
  message,
  Table,
  Input,
  Divider,
  Button,
  Popconfirm,
  Switch,
  Breadcrumb 
} from "antd";
const { Header, Footer, Content } = Layout;
const Search = Input.Search;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "ID",
          key: "key",
          dataIndex: "key",
        },
        {
          title: "用户名",
          key: "username",
          dataIndex: "username",
          render: text => <a href="javascript:;">{text}</a>
        },
        {
          title: "用户邮箱",
          key: "adminEmail",
          dataIndex: "adminEmail"
        },
        {
          title: "联系电话",
          key: "adminPhone",
          dataIndex: "adminPhone",
          render: (text, res) => <div>{strPhone(res.adminPhone)}</div>
        },
        {
          title: "录入管理员",
          key: "adder",
          dataIndex: "adder"
        },
        {
          title: "激活状态",
          key: "userstate",
          dataIndex: "userstate",
          render:(text, res) => ( 
            <Switch defaultChecked={res.userstate} onChange={()=>this.offOnclick(res.id,res.userstate)} />
        
        )
        },
        {
          title: "创建时间",
          key: "time",
          dataIndex: "time",
          render:(text,res)=>(
         
            <span>
             
             { getToTime(res.time,'/')}
              </span>
           
           )
         
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => (
            <span>
              {
                <a
                  href="javascript:;"
                  title="编辑"
                  onClick={()=>this.showModal('edit',record.username)}
                >
                  <Icon type="edit" />
                </a>
              }
              <Divider type="vertical" />
              {
                <Popconfirm
                  title="确定要删除这个用户?"
                  onConfirm={() => this.onDelete(record.id)}
                  onCancel={this.cancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <a
                    href="javascript:;"
                    title="删除"
              
                  >
                    <Icon type="delete" />
                  </a>
                </Popconfirm>
              }
            </span>
          )
        }
      ],
      arr: [],
      // seaVal:'你好',
      //设置左侧导航展开或收起的开关
      collapsed: false,
      //点击弹出对话框开关
      visible: false,
      ModalIndex: '',
      loading: false,
      editIndex:'',
      sval: ""
    };
  }

  async componentDidMount() {
   await getDataArr("user?act=getAllUser").then(data => {
     console.log(getToTime(data.arr[1].time,'/'))
    
      this.setState({ arr:getDealKey(data.arr) });
    });
  
  }

  //激活会员状态事件
   offOnclick= async (key,checked)=>{
     console.log(key)
    await getDataArr('user?act=updataState&key='+ key +'&userstate='+ (!checked)).then(data => {
      message.success(data.msg);
      getDataArr("user?act=getAllUser").then(data => {
        this.setState({ arr: getDealKey(data.arr) });
      });
    });


  }


  //错误提示信息
  error = Tip => {
    message.error(Tip);
  };
  //点击左侧菜单控制展开或者收起的事件
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  //点击打开对话框
  // showModal = () => {
  
  //   this.setState({
  //     visible: true
  //   });
  // };
 showModal = (index,resIndex) => {

    this.setState({
      visible: true,
      ModalIndex:index,
      editIndex:resIndex?resIndex:null,
    });
  };


  //点击确定调用函数并且关闭对话框
  handleOk = ev => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };
  //点击取消按钮关闭对话框
  handleCancel = ev => {
    
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values)
      form.resetFields();
    })
    this.setState({
      visible: false
    });
  };

  //搜索
  searchChange = val => {
    let { arr } = this.state;
    if (!val) {
      this.error("请输入用户名！！");
      getDataArr("user?act=getAllUser").then(data => {
        this.setState({ arr: getDealKey(data.arr) });
      });
    } else {
      getDataArr("user?act=getOneUser&username=" + val).then(data => {
        if (data.code === 0) {
          this.setState({ arr: getDealKey(data.arr) });
        } else if (data.code === -2) {
          this.error(data.msg);
        }
      });
    }
  };

  strChange = val => {
    if (!val.target.value) {
      getDataArr("user?act=getAllUser").then(data => {
        this.setState({ arr:getDealKey( data.arr) });
      });
    }
  };


  onDelete(id) {
    getDataArr("user?act=del&id=" + id).then(data => {
      message.success(data.msg);
      getDataArr("user?act=getAllUser").then(data => {
        this.setState({ arr: getDealKey(data.arr) });
      });
     
    });
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  //以下是添加新用户的弹框表单事件
  handleCreate = () => {
   
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values)
      // console.log("Received values of form: ", values);
      switch(values.Formkey){
        case 'addUser':
        let adder = getCookie('user')
        getDataArr('user?act=add&username='+values.username+'&password='+values.password+'&adder='+adder+'&email='+values.email+'&phone='+values.phone+'&sex='+values.sex).then(data => {
         
          if(data.code ===0){
            message.success(data.msg);
              getDataArr("user?act=getAllUser").then(data => {
                 
                  this.setState({ arr:getDealKey( data.arr) });
                });
                form.resetFields();
                this.setState({ visible: false });
          }else if(data.code === -3 ){
            message.success(data.msg);
          }
         
        });

        break;
        case 'edit':
       let passund;
       if(values.editpass==undefined){
        passund = ''
       }else{
        passund = '&password='+ values.editpass

       }
       console.log(values.sex)
      
        getDataArr('user?act=userUpdate&key='+values.userKey+passund+'&email='+values.editemail+'&phone='+values.editphone+'&sex='+values.sex)
        .then(data=>{
          if(data.code ===0){
            message.success(data.msg);
            getDataArr("user?act=getAllUser").then(data => {
              console.log(data.arr)
              this.setState({ arr: getDealKey(data.arr) });
            });
            form.resetFields();
            this.setState({ visible: false });
            console.log(data)
          }else if(data.code ===-1){
            message.success(data.msg);

          }
         
        })
        break;

      }

    });
  };

  render() {
    let { arr, columns, collapsed,ModalIndex,editIndex, visible, loading } = this.state;
    let { history } = this.props;
    let newArr = arr.map((e,i) => {
      return e.username;
    });


    return (
      <Layout>
        <ToLeftmenu trigger={null} collapsible collapsed={collapsed} />

        <Layout>
          
          <Header style={{ background: "#fff", padding: 0 }}>
            <ToHeader
              history={history}
              toggle={this.toggle}
              collapsed={collapsed}
            />
          </Header>

          <Content
            style={{
              margin: "10px 8px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <Breadcrumb style={{ marginBottom:10,}}>
    <Breadcrumb.Item> <Icon type="home" /><a href="./">首页</a></Breadcrumb.Item>
    <Breadcrumb.Item> <Icon type="user" /><a href="./Users">会员管理</a></Breadcrumb.Item>
   
  </Breadcrumb>

            <div>

              

              <div style={{ overflow: "hidden", marginBottom: 10 }}>
                <Button
                  type="primary"
                  style={{ float: "right" }}
                  onClick={()=>{this.showModal('adduser')}}
                >
                  <Icon type="user-add" />添加会员
                </Button>


                <Search
                  style={{ width: "270px", float: "left", marginLeft: 30 }}
                  placeholder="输入需要查找的用户名"
                  onChange={value => this.strChange(value)}
                  onSearch={value => {
                    this.searchChange(value);
                  }}
                  enterButton
                />
              </div>
              
              <AddUsForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                ModalIndex={ModalIndex}
                editIndex={editIndex}
              />

          
            </div>

            <Table
              dataSource={arr}
              columns={columns}
              rowSelection={rowSelection}
              defaultExpandAllRows={true}
              hideDefaultSelections={true}
              
            />
           
          </Content>
          <Footer><ToFooter/></Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Users;
