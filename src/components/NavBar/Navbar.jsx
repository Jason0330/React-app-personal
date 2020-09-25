import React from "react";
import { NavLink } from "react-router-dom";
// import axios from 'axios'
import "./NavBar.scss";

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

    render() {
        return (
            <ul className={this.state.scrolls?'headerBar1':'headerBar'}>
                <li><NavLink to="/recommend" activeClassName="myactive" className="menudh" replace>推荐</NavLink></li>
                <li><NavLink to="/overseas" activeClassName="myactive" className="menudh" replace>海外</NavLink></li>
                <li><NavLink to="/ms" activeClassName="myactive" className="menudh" replace>女士</NavLink></li>
                <li><NavLink to="/men" activeClassName="myactive" className="menudh" replace>男士</NavLink></li>
                <li><NavLink to="/makeups" activeClassName="myactive" className="menudh" replace>美妆</NavLink></li>
            </ul>
        )
    }
}

export default NavBar;