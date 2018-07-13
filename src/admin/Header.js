import React, { Component } from 'react';
import {rmCookie,getCookie} from './lib/myStorage.js';
import avater from './images/profile_small.jpg';
import {Icon,Menu,Badge,message,Avatar} from 'antd';
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

class ToHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localval:''

        };
    }
    componentWillMount() {
        if (getCookie("user")) {
          this.setState({ localval: getCookie("user") });
        } else {
          this.error("您还没登录，请先登录");
          let { history } = this.props;
          history.push("/admin/login");
        }
      }
    // componentWillMount() {
    //       this.setState({ localval: getCookie("user") });
    //   }
    error = Tip => {
        message.error(Tip);
      };
    signOut=()=>{
        rmCookie('user')
        let { history } = this.props;
        console.log(history)
        history.push('/admin/login');

    }

    render() {
        let {toggle,collapsed} = this.props;
        let {localval} =this.state
        return (
            <header className="header" >
   {/* 控制左侧菜单展开或者收起的按钮 */}
   <Icon className="trigger custom-trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />


               <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                  
                    <SubMenu title={<span className="avatar">
                    <Avatar src={avater} alt="头像" />
                    {/* <img src={avater}  /> */}
                    <a className="ant-dropdown-link" href="#">
                    {localval} <Icon type="down" />
                 </a>
                    <i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            {<Menu.Item key="setting:1">你好 - {localval}</Menu.Item>}
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.signOut}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                     
                    <Menu.Item key="1">
                        <Badge count={99} overflowCount={99} style={{marginLeft: 2,width:28,height:20,fontSize:8,lineHeight:'18px',textAlign:'left'}}>
                        <Icon type="bell" style={{fontSize:20,}}/>
                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Badge count={99} overflowCount={99} style={{marginLeft: 2,width:28,height:20,fontSize:8,lineHeight:'18px',textAlign:'left'}}>
                        <Icon type="mail" style={{fontSize:20,}}/>
                        </Badge>
                    </Menu.Item>
                </Menu>
                           
              </header>
                        );
                    }
                }
                
                
                export default ToHeader;
                
