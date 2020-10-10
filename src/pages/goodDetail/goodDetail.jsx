import React, {Component} from 'react';
import {Modal, Toast, Carousel, Badge, Icon, Stepper} from 'antd-mobile';
import './goodDetail.scss';
import axios from 'axios';
import {inject, observer} from 'mobx-react';
import {CountDown} from "../../components/CountDown/CountDown";

@inject("carStore")
@observer
class shop extends Component {
    state = {
        //接收入参
        id: '',
        proid: '',
        //banner图
        banners: [],
        bannerFlag: false,
        //服务弹窗标识
        modalFlag: false,
        //购物车、购买弹窗
        modalFlagCart:false,
        //选中的哪个颜色
        chooseColor:'',
        //选中的哪个图片
        chooseImg:'',
        //步进器
        val:1,
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
        let timestamp = new Date().getTime()
        axios.get(`http://www.mei.com/appapi/product/detail/v3?categoryId=${this.state.id}&productId=${this.state.proid}&platform_code=H5&timestamp=${timestamp}&summary=2dd5d65d596a88cb0bf8e522d69e76aa`).then(
            res => {
                console.log('res.data', res.data)
                this.setState({
                    infos: res.data.infos,
                    banners: res.data.infos.images,
                    bannerFlag: true
                },()=>{
                    this._initColor()
                })
            }
        )
    }

    //初始化颜色尺码
    _initColor = () =>{
        let timestamp = new Date().getTime()
        let reqs = 'http://www.mei.com/appapi/product/colorgroupsize/v3?' +
            'categoryId=' + this.state.id +
            '&productId=' + this.state.proid +
            '&userId= 2022202299900108015' +
            '&platform_code=H5' +
            '&timestamp=' + timestamp +
            '&summary=2c9ea546e0fc0bbd3b9bf18b186ce25b'
        let infos = this.state.infos
        axios.get(reqs).then(
            res => {
                if(res.data.infos.size !== undefined && res.data.infos.size.length !== 0){
                    let sizeList = []
                    res.data.infos.size.map((item,index) =>{
                        if(item.parentId === this.state.proid){
                            sizeList.push(item)
                        }
                        return item
                    })
                    infos.size = sizeList

                    //改变颜色
                    let chooseColor = ''
                    //所选图片小图
                    let chooseImg = ''
                    let colorGroup = res.data.infos.colorGroup.map((item1, index1) => {
                        if (item1.productId === this.state.proid) {
                            item1.choose = true
                            chooseColor = item1.color
                            chooseImg = item1.productImgUrl
                        } else {
                            item1.choose = false
                        }
                        return item1
                    })
                    infos.colorGroup = colorGroup
                    this.setState({infos: infos,chooseColor:chooseColor,chooseImg:chooseImg})
                }
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
    //打开购物车/购买弹窗
    _openDialog = () =>{
        this.setState({modalFlagCart:true})
    }

    //步进器变化
    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
    }

    //加入购物车
    joincart = () => {
        let carData = this.state.shopCar
        for(let i=0; i<=this.state.val; i++){
            carData.push(this.state.infos)
        }
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

    //立即购买
    goBuy = () =>{
        Toast.offline('这里还没进行开发呢！', 1.5);
    }

    //改变颜色
    _changeColor = (item,index) => {
        let infos = this.state.infos
        let timestamp = new Date().getTime()
        let reqs = "http://www.mei.com/appapi/product/colorgroupsize/v3?categoryId=" +
            this.state.id +
            "&productId=" +
            item.productId +
            "&userId=" +
            "2022202299900108015" +
            "&platform_code=H5" +
            "&timestamp=" +
            timestamp +
            "&summary=c241c072915e2111bca841dd7d40acce"

        axios.get(reqs).then(
            res => {
                console.log('resss',res.data.infos)
                if(res.data.infos.size !== undefined && res.data.infos.size.length !== 0){
                    let sizeList = []
                    res.data.infos.size.map((item2,index2) =>{
                        if(item2.color === item.color){
                            sizeList.push(item2)
                        }
                        return item2
                    })
                    infos.size = sizeList
                    //改变颜色
                    let chooseColor = ''
                    //所选图片小图
                    let chooseImg = ''
                    let colorGroup = res.data.infos.colorGroup.map((item1, index1) => {
                        if (index1 === index) {
                            item1.choose = true
                            chooseColor = item1.color
                            chooseImg = item1.productImgUrl
                        } else {
                            item1.choose = false
                        }
                        return item1
                    })
                    infos.colorGroup = colorGroup
                    this.setState({infos: infos,chooseColor:chooseColor,chooseImg:chooseImg})
                }
            }
        )
    }

    //改变尺码
    _changeSize = (index) => {
        let infos = this.state.infos
        let size = infos.size.map((item, ind) => {
            if (ind === index) {
                item.choose = true
            } else {
                item.choose = false
            }
            return item
        })
        infos.size = size
        this.setState({infos: infos})
    }

    //跳转到品牌首页
    _goBrandHome = () => {
        Toast.info('跳转到品牌首页', 2)
    }

    //跳转到全部评论
    _goAllComments = () =>{
        Toast.info('跳转到全部评论', 2)
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
                        {this.state.infos.product_labels !== undefined && this.state.infos.product_labels.length !== 0 ?
                            this.state.infos.product_labels.map((item,index) =>{
                               if(item.labelType === '1'){
                                   return <div className="priceBox2-right" key={index}>{item.label_text}</div>
                               }else {
                                   return <div className="priceBox2-right2" key={index}>{item.label_text}</div>
                               }
                            })
                        :null}

                        <div></div>
                    </div>
                    <div className="deliveryTime">
                        <div className="deliveryTime-text2">{this.state.infos.warehouse_name}</div>
                        <img alt="" className="deliveryTime-img" src={require("../../assets/img/time.png")}/>
                        <div className="deliveryTime-text">{this.state.infos.deliver_date}</div>
                    </div>
                    <div className="listItem">
                        <div className="listItem-left">闪购</div>
                        <div className="listItem-right">
                            {this.state.infos.eventEndDate !== undefined ?
                                <CountDown
                                    endTime={parseFloat(this.state.infos.eventEndDate) * 1000}
                                    type='day'
                                    timeOver={()=>this.timeOver()}
                                />
                            :null}
                        </div>
                    </div>
                    <div className="listItem">
                        <div className="listItem-left">服务</div>
                        <div className="listItem-right" style={{justifyContent: 'space-between'}} onClick={() => {
                            this.setState({modalFlag: true})
                        }}>
                            {this.state.infos.service_labels !== undefined && this.state.infos.service_labels.length !== 0 ?
                                this.state.infos.service_labels.map((item, index) => {
                                    if (index !== this.state.infos.service_labels.length - 1) {
                                        return <div
                                            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                                            key={index}>
                                            <div className="item-right-text1">{item.label_title}</div>
                                            <div className="item-right-split"></div>
                                        </div>
                                    } else {
                                        return <div
                                            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                                            key={index}>
                                            <div className="item-right-text1">{item.label_title}</div>
                                            <Icon type="right" size="xs"/>
                                        </div>
                                    }
                                })
                                : null}
                        </div>
                    </div>
                    {this.state.infos.colorGroup !== undefined && this.state.infos.colorGroup.length !== 0 ?
                        <div className="listItem">
                            <div className="listItem-left">颜色</div>
                            <div className="listItem-right">
                                {this.state.infos.colorGroup.map((item, index) => {
                                    if ((item.choose === undefined && item.productId === this.state.proid) || item.choose) {
                                        return <div key={index} className="right-btn-choose"
                                                    onClick={() => this._changeColor(item,index)}>
                                            {item.color}
                                        </div>
                                    } else {
                                        return <div key={index} className="right-btn"
                                                    onClick={() => this._changeColor(item,index)}>
                                            {item.color}
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                        : null}
                    {this.state.infos.size !== undefined && this.state.infos.size.length !== 0 ?
                        <div className="listItem">
                            <div className="listItem-left">尺码</div>
                            <div className="listItem-right">
                                {this.state.infos.size.map((item, index) => {
                                    if (item.qty === '0'){
                                        return <div key={index} className="right-btn-unableChoose">
                                            {item.sizeLabel}
                                        </div>
                                    } else if (item.choose) {
                                        return <div key={index} className="right-btn-choose"
                                                    onClick={() => this._changeSize(index)}>
                                            {item.sizeLabel}
                                        </div>
                                    }
                                    else {
                                        return <div key={index} className="right-btn"
                                                    onClick={() => this._changeSize(index)}>
                                            {item.sizeLabel}
                                        </div>
                                    }
                                })}
                            </div>
                        </div> : null}
                    <div className="detailsTitle">
                        <div className="detailsTitle-text">商品参数</div>
                    </div>
                    <div className="detailsTitle">
                        <div className="detailsTitle-text">商品详情</div>
                    </div>
                    {this.state.infos.description !== undefined ?
                        <div className="detailsContent">
                            {this.state.infos.description.product_img1 !== undefined && this.state.infos.description.product_img1.length !== 0 ?
                                this.state.infos.description.product_img1.map((item, index) => {
                                    return <img alt="" className="description-img" src={item.bigImgUrl} key={index}/>
                                })
                                : null}
                            <div className="content-message">{this.state.infos.description.message}</div>
                        </div>
                        : null}
                    <div className="detailsTitle">
                        <div className="detailsTitle-text">包装清单</div>
                    </div>
                    {this.state.infos.packageURL !== undefined && this.state.infos.packageText !== undefined ?
                        <div className="detailsContent">
                            <img alt="" className="description-img" src={this.state.infos.packageURL}/>
                            <div className="content-message">{this.state.infos.packageText}</div>
                        </div>
                        : null}
                    {this.state.infos.brandName !== undefined ?
                        <div className="detailsTitle">
                            <div className="detailsTitle-text">{this.state.infos.brandName}</div>
                            <div className="detailsTitle-right" onClick={()=>{this._goBrandHome()}}>
                                <div className="title-right-text">品牌主页</div>
                                <Icon type="right" size="xs" color="#696969"/>
                            </div>
                        </div>
                        : null}
                    {this.state.infos.brandImg !== undefined && this.state.infos.brandImg !== "" ?
                        <div className="detailsContent">
                            <img alt="" className="description-img" src={this.state.infos.brandImg} />
                        </div>
                    : this.state.infos.brand_story !== undefined ?
                        <div className="detailsContent">
                            <div className="content-message2">{this.state.infos.brand_story}</div>
                        </div>
                    : null}

                    {this.state.infos.postSellUrls !== undefined && this.state.infos.postSellUrls.length !== 0 ?
                        <div className="detailsContent" style={{width: '100%', marginLeft: 0, borderBottomWidth:0}}>
                            {this.state.infos.postSellUrls.map((item, index) => {
                                return <img alt="" className="description-img" src={item} key={index}/>
                            })}
                        </div> : this.state.infos.postSellUrl !== undefined ?
                            <div className="detailsContent" style={{width: '100%', marginLeft: 0, borderBottomWidth:0}}>
                                <img alt="" className="description-img" src={this.state.infos.postSellUrl} />
                            </div>
                    :null}
                    <div className="detailsTitle" style={{borderTop:'1px solid #d8d8d8',borderBottom:'1px solid #d8d8d8'}}>
                        <div className="detailsTitle-text">用户评论({this.state.infos.is_recommended})</div>
                        <div className="detailsTitle-right" onClick={()=>{this._goAllComments()}}>
                            <div className="title-right-text">查看全部</div>
                            <Icon type="right" size="xs" color="#696969"/>
                        </div>
                    </div>
                    <div style={{height: 30}}></div>
                </div>
                <div className="carbox">
                    <div className="bag">
                        <i className="icon-cart cart"></i>
                        <Badge text={this.props.carStore.count} overflowCount={20}/>
                    </div>
                    <div className="join" onClick={this._openDialog}>
                        <p className="joinp">加入购物车</p>
                    </div>
                    <div className="buy" onClick={this._openDialog}>
                        <p className="buyp">立即购买</p>
                    </div>
                </div>
                <Modal
                    className="modalBox"
                    popup
                    visible={this.state.modalFlag}
                    onClose={() => {
                        this.setState({modalFlag: false})
                    }}
                    animationType="slide-up"
                    afterClose={() => {
                        this.setState({modalFlag: false})
                    }}
                >
                    <div className="modalItemTitle">
                        <div className="title-text">魅力惠服务</div>
                    </div>
                    <div className="modalCenterBox">
                        {this.state.infos.service_labels !== undefined && this.state.infos.service_labels.length !== 0 ?
                            this.state.infos.service_labels.map((item, index) => {
                                return <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
                                    <div className="modalSubTitle">
                                        <div className="subTitle-text">{item.label_title}</div>
                                    </div>
                                    <div className="modalContent">
                                        <div className="content-text">{item.label_text}</div>
                                    </div>
                                    {item.is_genuine ?
                                        <div className="modalImgBox">
                                            <img alt="" className="modalImg" src={"https://cdn12.mei.com/h5_vue/static/img/pic_promise2.a01070c.jpg"}/>
                                        </div>
                                    :null}
                                </div>
                            })
                        : null}

                    </div>
                    <div className="modalBtnBox" onClick={() => {this.setState({modalFlag: false})}}>确定</div>
                </Modal>
                <Modal
                    className="modalBoxCart"
                    popup
                    visible={this.state.modalFlagCart}
                    onClose={() => {
                        this.setState({modalFlagCart: false})
                    }}
                    animationType="slide-up"
                    afterClose={() => {
                        this.setState({modalFlagCart: false})
                    }}>
                    <div className="cartBoxTitle">
                        <div className="floatBox">
                            <img alt="" className="floatBox-img" src={this.state.chooseImg} />
                        </div>
                        <div className="absoluteBox">
                            <div className="absoluteBox-top">
                                <Icon type="cross"  onClick={()=>{this.setState({modalFlagCart:false})}}/>
                            </div>
                            <div className="absoluteBox-bottom">
                                <div className="bottom-text1">￥{this.state.infos.price}</div>
                                <div className="bottom-text2">已选择 “{this.state.chooseColor}”</div>
                            </div>
                        </div>
                    </div>
                    {this.state.infos.colorGroup !== undefined && this.state.infos.colorGroup.length !== 0 ?
                        <div className="portaitList">
                            <div className="listItem-top">颜色</div>
                            <div className="listItem-bottom">
                                {this.state.infos.colorGroup.map((item, index) => {
                                    if ((item.choose === undefined && item.productId === this.state.proid) || item.choose) {
                                        return <div key={index} className="right-btn-choose"
                                                    onClick={() => this._changeColor(item,index)}>
                                            {item.color}
                                        </div>
                                    } else {
                                        return <div key={index} className="right-btn"
                                                    onClick={() => this._changeColor(item,index)}>
                                            {item.color}
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                    : null}
                    {this.state.infos.size !== undefined && this.state.infos.size.length !== 0 ?
                        <div className="portaitList">
                            <div className="listItem-top">尺码</div>
                            <div className="listItem-bottom">
                                {this.state.infos.size.map((item, index) => {
                                    if (item.qty === '0'){
                                        return <div key={index} className="right-btn-unableChoose">
                                            {item.sizeLabel}
                                        </div>
                                    } else if (item.choose) {
                                        return <div key={index} className="right-btn-choose"
                                                    onClick={() => this._changeSize(index)}>
                                            {item.sizeLabel}
                                        </div>
                                    }
                                    else {
                                        return <div key={index} className="right-btn"
                                                    onClick={() => this._changeSize(index)}>
                                            {item.sizeLabel}
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                    : null}
                    <div className="horizeList">
                        <div className="horizeList-left">数量</div>
                        <div className="horizeList-right">
                            <Stepper
                                showNumber
                                max={10}
                                min={1}
                                value={this.state.val}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="bottom-btnBox">
                        <div className="btn1" onClick={this.joincart}>加入购物车</div>
                        <div className="btn2" onClick={this.goBuy}>立即购买</div>
                    </div>
                </Modal>
            </div>
    )}
}

export default shop;
