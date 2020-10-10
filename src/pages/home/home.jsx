import React, { Component } from 'react'
import { SearchBar, Button, Carousel, Popover, } from 'antd-mobile';
import './home.scss';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import Navbar from '../../components/NavBar/Navbar'

@inject("loginStore")
@observer
class home extends Component {

  state = {
    isbanner: false,
    bandata: [],
    toListData: [],
    scrolls: false,
    visible: false
  }

  componentDidMount() {
    this.init()
    window.addEventListener('scroll', this.bindHandleScroll.bind(this))
  }
  //在componentWillUnmount，进行scroll事件的注销
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll.bind(this));
  }

  bindHandleScroll = (event) => {
    //滚动条高度
    let ctx = this;
    let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
    if (scrollTop > 1) {
      ctx.setState({ scrolls: true })
    } else {
      ctx.setState({ scrolls: false })
    }
  }


  init = () => {
    axios.all([
      axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5").then(res => res.data),
      axios.get("http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1600912026070&summary=cd3cb6b1069528603bca6e869011ed1e&platform_code=H5").then(res => res.data)
    ]).then(
      axios.spread((res1, res2) => {
        let banData = res1.banners;
        let toListData = res2.lists[0].events
        this.setState({ bandata: banData, toListData: toListData, isbanner: true })
      })
    ).catch(err => {
      console.log(err);
    })
  }

  todetail = (e) => {
    this.props.history.push(`/goods/${e}`)
  }

  toLogin = () => {
    this.props.history.push('/login')
  }

  toShop = () => {
    if (this.props.loginStore.isLogin) {
      this.props.history.push("/shop")
    } else {
      this.props.history.push("/login")
    }
  }

  logStatus = () => {
    this.setState({
      visible: true,
    });
  }

  onSelect = (opt) => {
    if (opt.props.value === 'out') {
      this.props.loginStore.outLog()
    } else {
      this.props.history.push('/personal')
    }
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  getsData = (val) => {
    if (val.hasOwnProperty("tip")) {
      this.init()
    } else {
      this.setState({ bandata: val.banData, toListData: val.toListData })
    }
  }

  render() {
    return (
      <div className="home">
        <div className={this.state.scrolls ? 'scrolledBox' : 'headBox'}>
          {this.props.loginStore.isLogin ?
            <Button size="small" onClick={this.logStatus} className={this.state.scrolls ? 'scrollbtn' : 'lB'}> <i className="icon-peoplelist"></i> </Button> :
            <Button size="small" onClick={this.toLogin} className={this.state.scrolls ? 'scrollbtn' : 'lB'}>登录</Button>
          }
          <Popover
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Popover.Item key="1" value="userInfo" data-seed="logId">个人中心</Popover.Item>),
              (<Popover.Item key="2" value="out" style={{ whiteSpace: 'nowrap' }}>退出登录</Popover.Item>),
            ]}
            placement="bottom"
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
            </div>
          </Popover>
          <SearchBar placeholder="搜索商品" maxLength={8} className="searchBar" />
          <Button size="small" onClick={this.toShop} className={this.state.scrolls ? 'scrollbtn' : 'rB'}>商场</Button>
        </div>
        <Navbar getData={this.getsData} />
        {this.state.isbanner &&
          <Carousel
            autoplay
            infinite
          >
            {this.state.bandata.length === 0 ? <img
              src={require('../../assets/img/fadeban.jpg')}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            /> : this.state.bandata.map(val => (
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
          </Carousel>}
        <div className="todayList">
          {this.state.bandata.length === 0 ? null :
            <img src={require('../../assets/img/today.png')} className="toimg" alt="" />}
          {
            this.state.toListData.map(item => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a onClick={() => this.todetail(item.categoryId)} className="toBox" key={item.eventId} style={{ background: `url('${item.imageUrl}') center center /cover` }}>
                <p style={{ fontSize: 16, color: '#fff', marginLeft: 20 }}>{item.englishName}</p>
                <p style={{ fontSize: 14, color: '#fff', marginLeft: 20 }}>{item.chineseName}</p>
                <p style={{ fontSize: 12, color: '#fff', marginLeft: 20 }}>{item.discountText}</p>
              </a>
            ))
          }
        </div>
      </div>
    )
  }
}

export default home;
