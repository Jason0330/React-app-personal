
import React, { Component } from 'react'
import {Button,InputItem,Toast} from 'antd-mobile'
import './login.scss'
import { observer, inject, } from "mobx-react";

//注入store
@inject("loginStore")
@observer
class login extends Component {

  state = {
    phone:'',
    password:'',
  
  }


  render() {
    return (
      <div className="logbox">
        <div className="cancelbtn">
            <Button icon="cross" size='large' onClick={this.close}></Button>
        </div>
        <p style={{fontSize:16,fontWeight:'bold',marginTop:50}}>登录/注册</p>
        <div>
        <InputItem
            type="phone"
            placeholder="请输入手机号"
            className="input"
            onChange={(e)=>this.uesrinfo(e,'phone')}
          >手机号码</InputItem>
          <InputItem
            type="password"
            placeholder="请输入密码"
            className="input"
            onChange={(e)=>this.uesrinfo(e,'password')}
          >密码</InputItem>
          <Button className="logBtn" type='primary' onClick={this.login}>登录</Button>
          <i className="icon-tao tao"></i> 
          <p style={{fontSize:16,textAlign:'center'}}> 绑定淘宝</p>
        </div>
      </div>
    )
  }

  uesrinfo=(x,y)=>{
    if(y === 'phone') {
      this.setState({phone:x})
    }
    if(y==='password') {
      this.setState({password:x})
    }
  }

  login=()=>{
    // eslint-disable-next-line eqeqeq
    if(this.state.password&&this.state.phone != ''){
        Toast.success('登陆成功', 1 ,()=>{
          this.props.loginStore.setUser()
          this.props.loginStore.saveInfo(this.state.phone)
          this.props.history.push('/')
        });
    }else{
        Toast.fail('请输入正确的登录信息', 1);
    }
  }

  close=()=>{
      this.props.history.push('/')
  }
}

export default login;