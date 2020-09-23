import React, { Component } from 'react'
import { SearchBar, Button, } from 'antd-mobile';
import './home.scss';
import http from '../../utils/serve'
class home extends Component {

  state = {

  }

  componentDidMount() {
    this.init()
  }

  init=()=>{
    http.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5').then((response) => {
      console.log(response)
      if (response.data === "SUCCESS") {

      } else {

      }
    })
  }

  render() {
    return (
      <div className="home">
        <Button size="small" className="lB">登录</Button>
        <SearchBar placeholder="搜索商品" maxLength={8} className="searchBar" />
        <Button size="small" className="rB">商场</Button>
      </div>
    )
  }
}

export default home;



// ReactDOM.render(
//   <div>
//     <NavBar
//       mode="light"
//       icon={<Icon type="left" />}
//       onLeftClick={() => console.log('onLeftClick')}
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>

//     <NavBar
//       mode="dark"
//       leftContent="Back"
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>
//   </div>
//   , mountNode);