
import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile';
import './shop.scss'


class shop extends Component {

  state = {
    datalist: []
  }
  componentDidMount() {
    let data = JSON.parse(sessionStorage.getItem('shops'))
    let a = []
    for (let i in data) {
      a.push(data[i])
    }
    console.log(a)
    this.setState({ datalist: a })
  }


  render() {
    return (
      <div className="shopbox">
        <div className="shopheadBox">
          <Button onClick={this.goback} size="small" icon="left" style={{ marginLeft: 10 }}></Button>
          <p style={{ fontSize: 16, fontWeight: 'bold' }}>购物车</p>
          <Button onClick={this.tip} size="small" style={{ marginRight: 10 }}>...</Button>
        </div>

        {this.state.datalist.map((item, index) => (
          <div className="detBox" key={index}>
            <img src={item.images[0].smallImgUrl} alt="" width="120" />
            <div>
              <p style={{ fontSize: 16, fontWeight: "bold" }}>{item.brand}</p>
              <p style={{ width: 180 }}>{item.name}</p>
              <p style={{ color: "red" }}>¥ {item.price}</p>
            </div>
          </div>
        ))
        }
      </div>
    )
  }

  goback = () => {
    window.history.back(-1)
  }
  tip = () => {
    Toast.offline('这里还没进行开发呢！', 1.5);
  }
}

export default shop;