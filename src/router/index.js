import React, {Component} from 'react'
import {HashRouter, Switch, Redirect, Route} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
import {isMobile} from '@/utils/commons'
// import PrivateRoute from './privateRoute'

// pc
const Index = asyncComponent(() => import("@/pages/pc/index"))
const Login = asyncComponent(() => import("@/pages/pc/account/login/login"))

//mobile
const Index_Mobile = asyncComponent(() => import("@/pages/mobile/index"))
const Login_Mobile = asyncComponent(() => import("@/pages/mobile/account/login/login"))

class pcConfig extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component= {Index}/>
          <Route path="/login" component= {Login}/>
          <Redirect from="/*" to="/" />
        </Switch>
      </HashRouter>
    )
  }
}
class mobileConfig extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component= {Index_Mobile}/>
          <Route path="/login" component= {Login_Mobile}/>
          <Redirect from="/*" to="/" />
        </Switch>
      </HashRouter>
    )
  }
}
export default isMobile ? mobileConfig : pcConfig;