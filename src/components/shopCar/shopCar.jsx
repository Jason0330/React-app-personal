
import React, { Component } from 'react';
import { Button, Toast, Carousel } from 'antd-mobile';
import './shopCar.scss';



class ShopCar extends Component {

    state = {
      
    }

    componentDidMount() {
        
    }

   

    render() {
        return (
            <div className="carbox">
                <div className="bag"></div>
                <div className="join"></div>
                <div className="buy"></div>
            </div>
        )
    }
}

export default ShopCar;