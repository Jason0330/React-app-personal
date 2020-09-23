import React, {Component} from 'react';
import {HashRouter,Switch,Route} from "react-router-dom";//引入routerdom

import home from "../pages/home/home";
import goods from "../pages/goods/goods";

class Router extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path="/" component={home}/>
                        <Route path="/goods" component={goods}/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default Router;
