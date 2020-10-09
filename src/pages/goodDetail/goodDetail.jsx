import React, {Component} from 'react';
import { Toast, Carousel, Badge, Icon} from 'antd-mobile';
import './goodDetail.scss';
import axios from 'axios';
import {inject, observer} from 'mobx-react';

@inject("carStore")
@observer
class shop extends Component {
    state = {
        //接收入参
        id: '',
        proid: '',
        //banner图
        banners: [],
        bannerFlag:false,
        //商品信息数据
        infos: {},
        count: 0,
        shopCar: []
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let proid = this.props.match.params.proid;
        this.setState({id: id, proid: proid}, () => this.getshops())
    }

    //根据入参 获取商品详情
    getshops = () => {
        axios.get(`http://www.mei.com/appapi/product/detail/v3?categoryId=${this.state.id}&productId=${this.state.proid}&platform_code=H5&timestamp=1601174880152&summary=2dd5d65d596a88cb0bf8e522d69e76aa`).then(
            res => {
                console.log('res.data', res.data)
                this.setState({
                    infos: res.data.infos,
                    banners: res.data.infos.images,
                    bannerFlag:true
                })
            }
        )
    }

    //回到上一页
    goBack = () => {
        window.history.back(-1);
    }

    //右侧按钮
    tip = () => {
        Toast.offline('这里还没进行开发呢！', 1.5);
    }

    joincart = () => {
        let carData = this.state.shopCar
        carData.push(this.state.infos)
        this.setState({shopCar: carData}, () => {
            this.setData()
        })
    }

    setData = () => {
        if (this.props.carStore.count === 21) {
            Toast.info('最多添加21件商品哦~快去结算吧！', 2)
        } else {
            this.props.carStore.setData(this.state.shopCar)
        }
    }


    render() {
        return (
            <div className="goodbox">
                <div className="headerBox">
                    <div onClick={() => {
                        this.goBack()
                    }} className="btnBoxL">
                        <Icon type="left"/>
                    </div>
                    <div className="centerTextBox">
                        <div className="centerText1">{this.state.infos.brand}</div>
                        <div className="centerText2">￥{this.state.infos.price}</div>
                    </div>
                    <div onClick={() => {
                        this.tip()
                    }} className="btnBoxR">
                        <Icon type="ellipsis"/>
                    </div>
                </div>
                <div className="contentBox">
                    <div className="bannerImgBox">
                        {this.state.bannerFlag ?<Carousel autoplay={true} infinite={true}>
                            {this.state.banners.map((val, index) => (
                                <img src={val.smallImgUrl}
                                     alt=""
                                     key={index}
                                     className="bannerImg"
                                     onLoad={() => {
                                         window.dispatchEvent(new Event('resize'));
                                         this.setState({imgHeight: 'auto'});
                                     }}
                                />
                            ))}
                        </Carousel> : null}
                    </div>
                    <div className="product-name">
                        <div className="nameText">{this.state.infos.name}</div>
                    </div>
                    <div className="priceBox1">
                        <div className="priceBox1-text">￥{this.state.infos.marketPrice}</div>
                    </div>
                    <div className="priceBox2">
                        <div className="priceBox2-text">¥{this.state.infos.price}</div>
                        <div className="priceBox2-right">{this.state.infos.discount}</div>
                    </div>
                    <div className="deliveryTime">
                        <img alt="" className="deliveryTime-img" src={require("../../assets/img/time.png")}/>
                        <div className="deliveryTime-text">{this.state.infos.deliver_date}</div>
                    </div>
                    <div className="listItem">
                        <div className="listItem-left">闪购</div>
                        <div className="listItem-right"></div>
                    </div>
                    <div className="listItem">
                        <div className="listItem-left">服务</div>
                        <div className="listItem-right"></div>
                    </div>
                    <div className="listItem">
                        <div className="listItem-left">尺码</div>
                        <div className="listItem-right"></div>
                    </div>
                    <div className="detailsTitle">
                        <div className="detailsTitle-text">商品参数</div>
                    </div>
                    <div className="detailsTitle">
                        <div className="detailsTitle-text">商品详情</div>
                    </div>
                </div>


                {/*<div className="pribox">*/}
                {/*    <p className="price">¥{this.state.infos.price}</p>*/}
                {/*    <p className="dis">&nbsp;&nbsp;{this.state.infos.discount}</p>*/}
                {/*    <p style={{*/}
                {/*        textDecoration: 'line-through',*/}
                {/*        color: '#ccc',*/}
                {/*        marginLeft: 30*/}
                {/*    }}> {this.state.infos.marketPrice}</p>*/}
                {/*     <i className="icon-cart joincar"></i> */}
                {/*</div>*/}
                <div className="carbox">
                    <div className="bag">
                        <i className="icon-cart cart"></i>
                        <Badge text={this.props.carStore.count} overflowCount={20}/>
                    </div>
                    <div className="join" onClick={this.joincart}>
                        <p className="joinp">加入购物车</p>
                    </div>
                    <div className="buy">
                        <p className="buyp">立即购买</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default shop;
