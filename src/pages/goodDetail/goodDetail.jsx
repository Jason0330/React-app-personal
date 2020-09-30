
import React, { Component } from 'react';
import { Button, Toast, Carousel,Badge } from 'antd-mobile';
import './goodDetail.scss';
import axios from 'axios';
import { inject ,observer } from 'mobx-react';

@inject("carStore")
@observer
class shop extends Component {

    state = {
        id: '',
        proid: '',
        banners: [],
        outdata: [],
        count:0,
        shopCar:[]
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let proid = this.props.match.params.proid;
        this.setState({ id: id, proid: proid }, () => this.getshops())
    }

    getshops = () => {
        axios.get(`http://www.mei.com/appapi/product/detail/v3?categoryId=${this.state.id}&productId=${this.state.proid}&platform_code=H5&timestamp=1601174880152&summary=2dd5d65d596a88cb0bf8e522d69e76aa`).then(
            res => {
                this.setState({
                    outdata: res.data.infos,
                    banners: res.data.infos.images
                })
            }
        )
    }

    goback = () => {
        window.history.back(-1)
    }
    tip = () => {
        Toast.offline('这里还没进行开发呢！', 1.5);
    }

    joincart=()=>{
        let carData = this.state.shopCar
        carData.push(this.state.outdata)
        this.setState({shopCar:carData},()=>{this.setData()})
    }

    setData=()=>{
        if(this.props.carStore.count === 21){
            Toast.info('最多添加21件商品哦~快去结算吧！',2)
        }else{
            this.props.carStore.setData(this.state.shopCar)
        }
    }


    render() {
        return (
            <div className="goodbox">
                <div className="oneBox">
                    <Button onClick={this.goback} size="small" icon="left" style={{ marginLeft: 10 }}></Button>
                    <p style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.outdata.brand}</p>
                    <Button onClick={this.tip} size="small" style={{ marginRight: 10 }}>...</Button>
                </div>
                <Carousel
                    autoplay
                    infinite
                >
                    {this.state.banners.map(val => (
                        <a
                            key={val}
                            href="/"
                            style={{ display: 'block', width: '100%' }}
                        >
                            <img
                                src={val.smallImgUrl}
                                alt=""
                                style={{ width: '90%', verticalAlign: 'top', marginLeft: '5%' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <p className="name">{this.state.outdata.name}</p>
                <div className="pribox">
                    <p className="price">¥{this.state.outdata.price}</p>
                    <p className="dis">&nbsp;&nbsp;{this.state.outdata.discount}</p>
                    <p style={{ textDecoration: 'line-through', color: '#ccc',marginLeft:30 }}> {this.state.outdata.marketPrice}</p>
                    {/* <i className="icon-cart joincar"></i> */}
                </div>
                <div className="carbox">
                <div className="bag">
                    <i className="icon-cart cart"></i>
                    <Badge text={this.props.carStore.count} overflowCount={20} />
                </div>
                <div className="join" onClick={this.joincart}>
                    <p className="joinp">加入购物车</p>
                </div>
                <div className="buy">
                    <p  className="buyp">立即购买</p>
                </div>
            </div>
            </div>
        )
    }
}

export default shop;