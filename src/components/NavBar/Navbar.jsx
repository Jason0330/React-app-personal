import React from "react";
import "./NavBar.scss";
import { Tabs } from 'antd-mobile';
import axios from 'axios'

const tabs = [
    { title:'推荐'},
    { title:'海外'},
    { title:'男士'},
    { title:'女士'},
    { title:'美妆'},
  ];
  
class NavBar extends React.Component {
    state = {
        scrolls:false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.bindHandleScroll)
      }
           //在componentWillUnmount，进行scroll事件的注销
       componentWillUnmount() {
           window.removeEventListener('scroll', this.bindHandleScroll);
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
      types=(tab,index)=>{
        if(index === 1){
            axios.all([
                　　　　axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000011&platform_code=PLATEFORM_H5").then(res => res.data),
                　　　　axios.get("http://www.mei.com/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=1&timestamp=1602227931775&summary=1c50992686bc83e0fde4ffaab6a9ef7f&platform_code=H5").then(res => res.data)
                　　]).then(
                　　　　axios.spread((res1,res2) => {
                    console.log(res1,res2)
                      let banData = res1.banners;
                      let toListData = res2.eventList
                      this.props.getData({banData,toListData})
                　　})
                ).catch(err => {
                　　console.log(err) ;
                })
        }else if(index === 2){
            axios.all([
                　　　　axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000002&platform_code=PLATEFORM_H5").then(res => res.data),
                　　　　axios.get("http://www.mei.com/appapi/silo/eventForH5?categoryId=men&pageIndex=1&timestamp=1602228318713&summary=01232ce204579785373ee84a769c1739&platform_code=H5").then(res => res.data)
                　　]).then(
                　　　　axios.spread((res1,res2) => {
                    console.log(res1,res2)
                      let banData = res1.banners;
                      let toListData = res2.eventList
                      this.props.getData({banData,toListData})
                　　})
                ).catch(err => {
                　　console.log(err) ;
                })
        }else if(index === 3){
            axios.all([
                　　　　axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000001&platform_code=PLATEFORM_H5").then(res => res.data),
                　　　　axios.get("http://www.mei.com/appapi/silo/eventForH5?categoryId=women&pageIndex=1&timestamp=1602228442083&summary=d610dfc66b61b4e7414551c1ba5a803d&platform_code=H5").then(res => res.data)
                　　]).then(
                　　　　axios.spread((res1,res2) => {
                    console.log(res1,res2)
                      let banData = res1.banners;
                      let toListData = res2.eventList
                      this.props.getData({banData,toListData})
                　　})
                ).catch(err => {
                　　console.log(err) ;
                })
        }
        else if(index === 4){
            axios.all([
                　　　　axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000003&platform_code=PLATEFORM_H5").then(res => res.data),
                　　　　axios.get("http://www.mei.com/appapi/silo/eventForH5?categoryId=cosmetics&pageIndex=1&timestamp=1602228498715&summary=14d4ce40e0392f5fb5edf3c260a36faf&platform_code=H5").then(res => res.data)
                　　]).then(
                　　　　axios.spread((res1,res2) => {
                    console.log(res1,res2)
                      let banData = res1.banners;
                      let toListData = res2.eventList
                      this.props.getData({banData,toListData})
                　　})
                ).catch(err => {
                　　console.log(err) ;
                })
        }else{
            this.props.getData({tip:true})
        }
      }
    
    

    render() {
        return (
            <div className="navbox">
                <Tabs tabs={tabs}
                    initialPage={0}
                    // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { this.types(tab,index) }}
                    tabBarBackgroundColor={this.state.scrolls?'#efeff4':'transparent'}
                    tabBarInactiveTextColor={this.state.scrolls?'#000':'#fff'}
                    tabBarActiveTextColor={this.state.scrolls?'#000':'#fff'}
                    tabBarTextStyle={{fontSize:14}}
                >
                </Tabs>
            </div>
        )
    }
}

export default NavBar;