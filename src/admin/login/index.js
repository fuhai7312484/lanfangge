import React, { Component } from 'react';
import '../login/css/login.css';
import { setCookie } from '../lib/myStorage.js';
import { message, Checkbox, Button } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userval: '',
            passwval: '',
            info: '',
            freedom: false,
            loading: false,


        };
    }
    // setLocalStorage(key,val){
    //     localStorage.setItem(key,JSON.stringify(val))

    // }
    // componentWillMount() {
    //     console.log(get('user'))
    // }

    userChange = (ev) => {
        this.setState({ userval: ev.target.value })
    }
    passwChange = (ev) => {

        this.setState({ passwval: ev.target.value })

    }
    error = (Tip) => {
        message.error(Tip);
    };
    freedomChange = (ev) => {

        this.setState({ freedom: ev.target.checked })


    }

    // enterLoading = () => {
    //     this.setState({ loading: true });
    //   }

    login = () => {
       
        let { userval, passwval, freedom } = this.state;
        let { history } = this.props;
     
        if (userval && passwval) {
            fetch('http://localhost:88/api/user/login', {
                method: 'post',
                body: `username=${userval}&password=${passwval}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then((e) => e.json())
                .then(data => {
                    if (data.code === 0) {
                      
                        // var curTime =freedom?new Date().getTime():null;
                        if (freedom) {
                            setCookie('user', userval, 7);
                        } else {
                            setCookie('user', userval);
                        }
                        this.setState({ info: data.msg, loading: true }, () => {
                            // // TipInfo(data.msg)
                            setTimeout(() => {
                                // history.go(-1)
                                history.push('/admin/index');
                            }, 2000);
                        })
                    } else if (data.code === -3) {
                        this.error(data.msg)
                    }


                })
        } else {

            this.error('账号或者密码不能为空')

        }


    }
    render() {
        let { userval, passw, freedom, loading } = this.state;

        return (
            <div className="loginBox">

                <h1>
                    <img src={require('../images/admin-logo.png')} />
                </h1>
                <form className="admin-form">
                    <input type="text"
                        className="adminUserName"
                        id="userName"
                        placeholder="用户名/邮箱/手机号"
                        onChange={this.userChange}
                        autoComplete="off"
                        value={userval}
                    />
                    <input type="password"
                        className="adminUserName"
                        id="passWord"
                        value={passw}
                        onChange={this.passwChange}
                        placeholder="密码" />
                    <div className="checkBox">

                        <p style={{ marginBottom: '20px' }}>
                            <Checkbox
                                checked={freedom}
                                // disabled={this.state.disabled}
                                onChange={this.freedomChange}
                            >
                                7天内自动登录
                        </Checkbox>
                        </p>
                        {/* <input type="checkbox"
                        checked = {freedom}
                        onChange={this.freedomChange}
                        /> */}


                    </div>
                    <div className="adminLoginBtnBox">
                        <Button type="primary"
                            id="submit"
                            className="adminLoginBtn"
                            loading={loading}
                            onClick={this.login}>
                            登录
                      </Button>

                    </div>
                    {/* <div className="loginTip">
                        <span>还没有账号吗？2分钟快速注册</span>
                        <button className="register">注册</button>
                    </div> */}
                </form>

            </div>

        );
    }
}

export default Login;