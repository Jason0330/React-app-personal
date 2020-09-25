import React, { Component } from 'react'
import { SearchBar, Button, Carousel } from 'antd-mobile';
import './home.scss';
import axios from 'axios';

class home extends Component {
 
    state = {
      bandata: [],
      toListData:[],
      scrolls:false
    }

  componentDidMount() {
    this.init()
    window.addEventListener('scroll', this.bindHandleScroll)
  }
       //在componentWillUnmount，进行scroll事件的注销
   componentWillUnmount() {
       window.removeEventListener('scroll', this.bindHandleScroll);
       axios.Cancel()
   }

   bindHandleScroll=(event)=>{
    //滚动条高度
    let ctx=this;
    let scrollTop  = document.documentElement.scrollTop;  //滚动条滚动高度
    if(scrollTop>1){
        ctx.setState({ scrolls:true})
    }else
    {
        ctx.setState({ scrolls:false })
    }
  }


  init = () => {
    axios.all([
      　　　　axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5").then(res => res.data),
      　　　　axios.get("http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1600912026070&summary=cd3cb6b1069528603bca6e869011ed1e&platform_code=H5").then(res => res.data)
      　　]).then(
      　　　　axios.spread((res1,res2) => {
            let banData = res1.banners;
            let toListData = res2.lists[0].events
            this.setState({ bandata: banData,toListData:toListData})
      　　})
      ).catch(err => {
      　　console.log(err) ;
      })
  }

  todetail=(e)=>{
    this.props.history.push(`/goods/${e}`)
  }

  toLogin=()=>{
    this.props.history.push('/login')
  }


  render() {
    return (
      <div className="home">
        <div className={this.state.scrolls ? 'scrolledBox' : 'headBox'}>
          <Button size="small" onClick={this.toLogin} className={this.state.scrolls ? 'scrollbtn' : 'lB'}>登录</Button>
          <SearchBar placeholder="搜索商品" maxLength={8} className="searchBar" />
          <Button size="small" className={this.state.scrolls ? 'scrollbtn' : 'rB'}>商场</Button>
        </div>
        {/* <NavBar/> */}
        <Carousel
          autoplay={false}
          infinite
        >
          {this.state.bandata.map(val => (
            <a
              key={val}
              href="http://www.baidu.com"
              style={{ display: 'inline-block', width: '100%' }}
            >
              <img
                src={val.main_image}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <div className="todayList"> 
        {this.state.bandata.length === 0 ?null:
            <img src={require('../../assets/img/today.png')} className="toimg" alt=""/>}                 
                {
                  this.state.toListData.map(item => (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a onClick={()=>this.todetail(item.categoryId)} className="toBox" key={item.eventId} style={{ background: `url('${item.imageUrl}') center center /cover` }}>
                        <p style={{fontSize:16,color:'#fff',marginLeft:20}}>{item.englishName}</p>
                        <p style={{fontSize:14,color:'#fff',marginLeft:20}}>{item.chineseName}</p>
                        <p style={{fontSize:12,color:'#fff',marginLeft:20}}>{item.discountText}</p>
                      </a>
                  ))
                }
        </div>
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