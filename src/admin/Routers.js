
import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import Index from './Index';
import Login from './login/index';
import Users from './Users';
import Usergroup from './components/permission/usergroup';
import Grouplist from './components/permission/grouplist';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="fixed-sidebar full-height-layout gray-bg  pace-done" id="wrapperBox">
            
            <Route exact path='../' component={Index}/>

            
            <Route path='/admin/login' component={Login}/>
            <Route exact path='/admin' component={Index}/>
            <Route path='/admin/index' component={Index}/>
            <Route path='/admin/Users' component={Users}/>
            <Route path='/admin/permission/usergroup' component={Usergroup}/>
            <Route path='/admin/permission/grouplist' component={Grouplist}/>

             
            
            {/* <Route path='/admin/login' render={(url)=>{
                if(getCookie('user')){
                    return <Index />
                }else{
                    return <Login url={url}/>

                }
            }
            }
            />
            <Route exact path='/admin' render={(url)=>{
                if(getCookie('user')){
                    return <Index />
                }else{
                    return <Login url={url}/>

                }
            }
            }/> */}


            </div>
        );
    }
}

export default Home;