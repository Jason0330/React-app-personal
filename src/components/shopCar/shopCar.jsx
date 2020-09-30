
import React, { Component } from 'react';
import { Badge,Toast, } from 'antd-mobile';
import './shopCar.scss';



class ShopCar extends Component {

    state = {
        count:0,
        shopdata:{}
    }

    componentDidMount() {
        
        let data = this.props.getData;
        console.log('111',data)
        // this.setState({shopdata:data})
    }

    joincart=()=>{
        
    }



    render() {
        return (
            <div>

            </div>
        )
    }
}

export default ShopCar;