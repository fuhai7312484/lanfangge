import React,{Component} from 'react';
import { Layout, Icon, message,Table,Divider,Popconfirm,Button} from "antd";
import ToHeader from "../../Header";
import ToFooter from "../../Footer";
import ToLeftmenu from "../../Leftmenu";
import Addadmin from './addadminlist';
import { getDataArr,getDealKey ,getToTime} from "../../lib/myStorage.js";

const { Header, Footer, Content } = Layout;
class Grouplist extends Component {
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
              title:'管理员名称',
              key:'adminName',
              dataIndex:'adminName'

            },
            {
              title:'管理员邮箱',
              key:'adminemail',
              dataIndex:'adminemail'

            },
            {
              title:'所在管理组',
              key:'pname',
              dataIndex:'pname'

            },
            {
              title:'创建时间',
              key:'time',
              dataIndex:'time',
              render:(text,res)=>(
                <span>
                  {getToTime(res.time,'-')}

                </span>


              )

            },
            {
              title:'操作',
             key: "action",
             render:(text, res) => (
               <span>
                 <a href="javascript:;"
               title="编辑"
              //  onClick={() => {
              //   this.showModal('editgroup',res.id)
                
              // }}
               >
              <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <a href="javascript:;"
               title="移动"
              //  onClick={() => {
              //   this.showModal('editgroup',res.id)
                
              // }}
               >
             
             <Icon type="retweet" />
              </a>

   <Divider type="vertical" />


  <Popconfirm
    title="确定要删除该组？?"
    okText="确定"
    cancelText="取消"
    onConfirm={()=>this.deladmin(res.id)}
  >
    <a href="javascript:;" title="删除">
      <Icon type="delete" />
    </a>
  </Popconfirm>

                 </span>

             )
            }
          ],
          adminList:[],
            //设置7天免登陆的开关
            localval: "",
            //设置左侧导航展开或收起的开关
            collapsed: false,
            visible: false,
            ModalIndex: "",
            editIndex: "",

          };
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
  async componentDidMount() {
    await getDataArr("/group?act=get").then(data => {

      let allMerArr = data.groupArr.map((e,i) => {
        e.members.forEach(el=>{
          el.pid=e.id;
          el.pname = e.pname;
        })
        return e.members;
        
      });
   
    
      let newArr=[]
      allMerArr.forEach(e => {
        e.forEach(el=>{
          newArr.push(el)
        })
      });
      console.log(newArr)
    
     
      this.setState({ adminList: getDealKey(newArr) });
    });
  }
//删除管理员
deladmin=(index)=>{
  getDataArr('adminlist?act=del&id='+index)
  .then(data=>{
    if(data.code === 0){
      message.success(data.msg);
      getDataArr('adminlist?act=get').then(data=>{
        this.setState({ adminList: getDealKey(data.arr) });
      })
    }

  })


}
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
    let {visible,ModalIndex,editIndex} =this.state;
    switch (ModalIndex) {
      case 'addadmin':
    return <Addadmin
      visible={visible}
      Cancel={this.Cancel}
      onCreate={this.handleCreate}
      wrappedComponentRef={this.saveFormRef}
      ModalIndex={ModalIndex}
      editIndex={editIndex}
    />
        break;
      //   case 'editadmin':
      //   return <Editgroup
      //   visible={visible}
      //   Cancel={this.Cancel}
      //   onCreate={this.handleCreate}
      //   wrappedComponentRef={this.saveFormRef}
      //   ModalIndex={ModalIndex}
      //   editIndex={editIndex}
      // />
      //      break;

      default:
        break;
    }

  }

   //点击打开对话框
   showModal = (index, resIndex) => {
    this.setState({
      visible: true,
      ModalIndex: index,
      editIndex: resIndex ? resIndex : null
    });
  };


  //点击弹框的确定按钮的回调函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      // console.log('Received values of form: ', values);

      switch (values.Formkey) {
     
        case "addadmin":
        console.log('添加管理员',values)

        getDataArr('adminlist?act=add&name='+values.name+'&pass='+values.pass+'&pid='+values.groupsId+'&pname='+values.groupsname)
        .then(data=>{
          if (data.code === 0) {
            message.success(data.msg);
            getDataArr("adminlist?act=get").then(data => {
                        this.setState({ adminList:getDealKey(data.arr) });
                      });
                      form.resetFields();
              this.setState({ visible: false });

          }else{


          }

        })
      //  let pdesc = values.pdesc==undefined?'':values.pdesc;
      //     getDataArr(
      //       "group?act=add&grname=" + values.pname + "&grdesc=" + pdesc
      //     ).then(data => {
      //       if (data.code === 0) {
      //         message.success(data.msg);
      //         getDataArr("group?act=get").then(data => {
      //           this.setState({ groupArr:getDealKey(data.groupArr) });
      //         });
      //         form.resetFields();
      //         this.setState({ visible: false });
      //       } else if (data.code === -3) {
      //         message.success(data.msg);
      //       } else if (data.code === -1) {
      //         message.success(data.msg);
      //       }
      //     });

          break;
          case 'editadmin':

          // console.log(values)
          // let pdesc2 = values.pdesc==undefined?'':values.pdesc;
          // getDataArr('group?act=add&id='+values.id+'&grname=' + values.pname + '&grdesc=' + pdesc2)
          // .then(data=>{
          //   if (data.code === 0) {
          //     message.success(data.msg);
          //     getDataArr("group?act=get").then(data => {
          //       this.setState({ groupArr:getDealKey(data.groupArr) });
          //     });
          //     form.resetFields();
          //     this.setState({ visible: false });
          //   }else if (data.code === -1) {
          //     message.success(data.msg);
          //   }

          // })
          break;
      }
    });
  };

    render() {
        let { collapsed,columns,adminList} = this.state;
        let { history } = this.props;
    
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
                  this.showModal("addadmin");
                }}
              >
                <Icon type="user-add" />添加管理员
              </Button>
            </div>
            {this.ModeShow()}

 <Table
              dataSource={adminList}
              columns={columns}
              // rowSelection={rowSelection}
              // defaultExpandAllRows={true}
              // hideDefaultSelections={true}
            />


          </Content>
          <Footer> <ToFooter /></Footer>
        </Layout>
      </Layout>
            
        );
    }
}

export default Grouplist;