/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Button,Modal,Toast} from 'antd-mobile';
import './Header.scss'
import Axios from 'axios'

class Header extends React.Component {
  state = {
    data: [],
    outdata: [],
    modal1:false
  }
  componentDidMount() {
    let id = this.props.id;
    Axios.get(`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${id}&key=&sort=&timestamp=1600934847233&summary=44bae25d97a3e64136c1f5b0493ac17b&platform_code=H5`)
      .then(res => {
        let prodatas = res.data.products
        let outdata = res.data
        this.props.moveDate({ prodatas, outdata });
      })
  }

  side=()=>{
  
 
  }

  render() {
    
    return (
      <div className="header">
        <div className="oneBox">
          <Button onClick={this.goback} size="small" icon="left" style={{ marginLeft: 10 }}></Button>
          <p style={{fontSize:16,fontWeight:'bold'}}>{this.props.title}</p>
          <Button onClick={this.tip} size="small" style={{ marginRight: 10 }}>...</Button>
        </div>
        <div className="aBox">
          <a onClick={() => this.transData('1')} className="atit">人气</a>
          <a onClick={() => this.transData('2')} className="atit">折扣</a>
          <a onClick={() => this.transData('3')} className="atit">价格</a>
          <a onClick={this.onDock} className="atit">筛选</a>
        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          title="提示"
          footer={[{ text: 'Ok', onPress: () => { this.onClose() } }]}
          // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => {}}
        >
          <div>
            <p>筛选功能后续完善~</p>
          </div>
        </Modal>
      </div>
    )
  }

  onDock = () => {
    this.setState({modal1:true})
  }
  onClose=()=>{
    this.setState({modal1:false})
  }
  tip=()=>{
      Toast.offline('这里还没进行开发呢！', 1.5);
  }

  transData = (e) => {
    let id = this.props.id;
    if (e === '1') {
      Axios.get(`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${id}&key=&sort=&timestamp=1600934847233&summary=44bae25d97a3e64136c1f5b0493ac17b&platform_code=H5`)
        .then(res => {
          console.log(res)
          let prodatas = res.data.products
          let outdata = res.data
          this.props.moveDate({ prodatas, outdata });

        })
    } else if (e === '2') {
      Axios.get(`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${id}&key=1&sort=ASC&timestamp=1601001612646&summary=020a8b7445d6d73e61f1274d362fbe8a&platform_code=H5`)
        .then(res => {
          let prodatas = res.data.products
          let outdata = res.data
          this.props.moveDate({ prodatas, outdata });
        })
    } else {
      Axios.get(`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${id}&key=&sort=DESC&timestamp=1601001661118&summary=5305b868843349b6c017458eb2af5222&platform_code=H5`)
        .then(res => {
          let prodatas = res.data.products
          let outdata = res.data
          this.props.moveDate({ prodatas, outdata });
        })
    }

  }
  goback = () => {
    window.history.back(-1)
  }
}

export default Header;