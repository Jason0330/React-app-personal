
import React, { Component } from 'react'
import './personal.scss'
import { Button, List } from 'antd-mobile'
// import {inject, observer} from 'mobx-react';

const Item = List.Item
class personal extends Component {

    state = {

    }
    componentDidMount() {
        let info = sessionStorage.getItem('userinfo')
        this.setState({ info })
    }


    render() {
        return (
            <div className="perbox">
                <div className="perheadBox">
                    <Button onClick={this.goback} size="small" icon="left" style={{ marginLeft: 10 }}></Button>
                    <p style={{ fontSize: 16, fontWeight: 'bold' }}>个人中心</p>
                    <Button onClick={this.tip} size="small" style={{ marginRight: 10 }}>...</Button>
                </div>
                <div className="perimg">
                    <img src={require('../../assets/img/headicon.jpg')} alt="" width="70" style={{ borderRadius: 35 }} />
                    <p style={{ marginLeft: 20, fontWeight: "bold" }}>手机号：{this.state.info}</p>
                </div>
                <List renderHeader={() => '基本选项'} className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => { }}>
                        我的订单
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => { }}>
                        我的地址
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => { }}>
                        联系我们
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => { }}>
                        注销登录
                    </Item>
                </List>
            </div>
        )
    }

    goback = () => {
        window.history.back(-1)
    }


}

export default personal;