
import React, { Component } from 'react';
import { Button, Toast, Carousel } from 'antd-mobile';
import './goodDetail.scss';
import axios from 'axios';
import ShopCar from '../../components/shopCar/shopCar'


class shop extends Component {

    state = {
        id: '',
        proid: '',
        banners: [],
        outdata: []
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let proid = this.props.match.params.proid;
        this.setState({ id: id, proid: proid }, () => this.getshops())
    }

    getshops = () => {
        axios.get(`http://www.mei.com/appapi/product/detail/v3?categoryId=${this.state.id}&productId=${this.state.proid}&platform_code=H5&timestamp=1601174880152&summary=2dd5d65d596a88cb0bf8e522d69e76aa`).then(
            res => {
                console.log(res)
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


    render() {
        return (
            <div className="box">
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
                </div>
                <ShopCar/>
            </div>
        )
    }
}

export default shop;