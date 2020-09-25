
import React, { Component } from 'react'
import {Button,InputItem} from 'antd-mobile'
import './login.scss'

class login extends Component {

  state = {
    
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
          >手机号码</InputItem>
          <InputItem
            type="password"
            placeholder="请输入密码"
            className="input"
          >密码</InputItem>
          <Button className="logBtn" type='primary'>登录</Button>
          <i className="icon-tao tao"></i> 
          <p style={{fontSize:16,textAlign:'center'}}> 绑定淘宝</p>
        </div>
      </div>
    )
  }

  close=()=>{
      this.props.history.push('/')
  }
}

export default login;