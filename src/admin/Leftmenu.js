import React, { Component } from 'react';
import { Link,NavLink} from 'react-router-dom';
import { getCookie } from './lib/myStorage.js';
import { Layout,Menu,Icon,Badge } from 'antd';
const { Sider} = Layout;
const SubMenu = Menu.SubMenu;
class ToLeftmenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }
    componentWillMount() {
        this.setState({ userName: getCookie('user') })

    }
    render() {
    
        let {trigger,collapsed} = this.props;
        let logoSrc = collapsed?require('./images/smalllogo.jpg'):require('./images/logo.jpg');
        // console.log(collapsed,collapsible)

        return (
            <Sider trigger={trigger}
            // collapsible={collapsible}
            collapsed={collapsed}>
  <div className="logo" >

   <img src={logoSrc} />

  </div>
          <Menu theme="dark"
           inlineCollapsed='true'
            mode="inline"
             defaultSelectedKeys={['1']}>
            
            <Menu.Item key="1">
            <NavLink to="/admin/index">
            <Icon type="home" />
              <span>
               首页 
              </span>
              </NavLink>
            </Menu.Item>
            

            <Menu.Item key="2">
           
            <NavLink to="/admin/Users">
            <Icon type="user"/>
              <span>
             会员管理 
              </span>
              </NavLink>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={<span><Icon type="safety" /><span>权限管理</span></span>}
            >
            <Menu.Item key="3">
              <span>
              <NavLink to="/admin/permission/grouplist">
            管理员列表
            
                  </NavLink>
                  </span>
            </Menu.Item>
            <Menu.Item key="4">
            <NavLink to="/admin/permission/usergroup">
              <span>用户组权限</span>
              </NavLink>
            </Menu.Item>
            </SubMenu>



          <SubMenu
              key="sub2"
              title={<span><Icon type="shop" /><span>商品管理</span></span>}
            >
            <Menu.Item key="6">
              <span>
              <Link to="/admin/index">
            商品列表
            
                  </Link>
                  </span>
            </Menu.Item>
            <Menu.Item key="7">
              
              <span>商品类别</span>
            </Menu.Item>
            </SubMenu>

            
          <SubMenu
              key="sub3"
              title={<span><Icon type="profile" /><span>订单管理</span></span>}
            >
            <Menu.Item key="8">
              <span>
              <Link to="/admin/index">
            订单列表
            
                  </Link>
                  </span>
            </Menu.Item>
            </SubMenu>

             <SubMenu
              key="sub4"
              title={<span><Icon type="area-chart" /><span>报表统计</span></span>}
            >
            <Menu.Item key="9">
              <span>
              <Link to="/admin/index">
            商品统计
            
                  </Link>
                  </span>
            </Menu.Item>

            <Menu.Item key="10">
              <span>
              <Link to="/admin/index">
            订单统计
            
                  </Link>
                  </span>
            </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
            <Icon type="delete" />
              <span>回收站</span>
              {collapsed?'':<Badge count={25} overflowCount={99} style={{marginLeft: 3,width:20,height:15,padding:0,lineHeight:'15px',fontSize:8,border:0}}>
              </Badge>}
             
            </Menu.Item>
          </Menu>
     

                      </Sider>



            // <nav>
               
            //     <div className="slimScrollDiv">
            //         <div className="sidebar-collapse">
            //             <ul className="nav" id="side-menu">
            //                 <li className="nav-header">
            //                     <div className="dropdown profile-element">
            //                         <span><img alt="image" className="img-circle" src={require('./images/profile_small.jpg')} /></span>
            //                         <a data-toggle="dropdown" className="dropdown-toggle" href="#">
            //                             <span className="clear">
            //                                 <span className="block m-t-xs"><strong className="font-bold">{userName}</strong></span>
            //                                 <span className="text-muted text-xs block">超级管理员<b className="caret"></b></span>

            //                             </span>
            //                         </a>
            //                         <ul className="dropdown-menu animated fadeInRight m-t-xs">
            //                             <li>
            //                                 <a className="J_menuItem" href="#/form_avatar.html" data-index="0">修改头像</a>
            //                             </li>
            //                             <li>
            //                                 <a className="J_menuItem" href="#/profile.html" data-index="1">个人资料</a>
            //                             </li>
            //                             <li>
            //                                 <a className="J_menuItem" href="#/contacts.html" data-index="2">联系我们</a>
            //                             </li>
            //                             <li>
            //                                 <a className="J_menuItem" href="#/mailbox.html" data-index="3">信箱</a>
            //                             </li>
            //                             <li className="divider"></li>
            //                             <li>
            //                                 <a href="#/login.html">安全退出</a>
            //                             </li>
            //                         </ul>
            //                     </div>
            //                     <div className="logo-element">F+
            //             </div>
            //                 </li>


            //                 <li className="active">
            //                     <Link to="/admin/Users" className="J_menuItem">

            //                         <i className="glyphicon glyphicon-user"></i>
            //                         <span className="nav-label">会员管理</span>
            //                     </Link>

            //                 </li>

            //                 <li>


            //                     <Link to="/admin/login/index">
            //                         登陆
            //    </Link>
            //                     <Link to="../">
            //                         首页
            //    </Link>
            //                     <Link to="/admin/index">
            //                         后台首页
            //    </Link>

            //                 </li>
            //             </ul>
            //         </div>
            //         {/* <div className="slimScrollBar" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; width: 4px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px; height: 600.703px;"></div>
            // <div className="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51) none repeat scroll 0% 0%; opacity: 0.9; z-index: 90; right: 1px;"></div> */}
            //     </div>
            // </nav>
        );





    }
}

export default ToLeftmenu;