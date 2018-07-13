import React, { Component } from "react";
import "./css/App.css";
import "./css/global.css";
import ToHeader from "./Header";
import ToFooter from "./Footer";
import ToLeftmenu from "./Leftmenu";
import Homeindex from "./components/index/index"
// import { rmCookie, getCookie } from "./lib/myStorage.js";
import { Layout, Icon, message } from "antd";

const { Header, Footer, Content, Sider } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //设置7天免登陆的开关
      localval: "",
      //设置左侧导航展开或收起的开关
      collapsed: false
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
  render() {
    let { collapsed } = this.state;
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
           <Homeindex/>


          </Content>
          <Footer> <ToFooter /></Footer>
        </Layout>
      </Layout>

    );
  }
}

export default Index;
