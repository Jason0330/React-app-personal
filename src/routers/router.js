import React, {Component} from 'react';
import {HashRouter,Switch,Route} from "react-router-dom";//引入routerdom
import ScrollTop from "../components/ScrollTop/ScrollTop";

import home from "../pages/home/home";
import goods from "../pages/goods/goods";
import login from "../pages/login/login";

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
                        </ScrollTop>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default Router;
