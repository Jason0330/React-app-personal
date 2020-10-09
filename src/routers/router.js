import React, {Component} from 'react';
import {HashRouter,Switch,Route} from "react-router-dom";//引入routerdom
import ScrollTop from "../components/ScrollTop/ScrollTop";

import home from "../pages/home/home";
import goods from "../pages/goods/goods";
import login from "../pages/login/login";
import shop from '../pages/shop/shop';
import goodDetail from '../pages/goodDetail/goodDetail';
import personal from '../pages/personal/personal'

class Router extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <ScrollTop>
                            <Route path="/" component={home} exact/>
                            <Route path="/goods/:e" component={goods} /> 
                            <Route path="/login" component={login} /> 
                            <Route path="/shop" component={shop}/>
                            <Route path="/goodDetail/:id/:proid" component={goodDetail}/>
                            <Route path="/personal" component={personal}/>
                        </ScrollTop>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default Router;
