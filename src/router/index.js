import {HashRouter, Switch, Route} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
import {isMobile} from '@/utils/commons'

// pc
const Index = asyncComponent(() => import("@/pages/pc/account/index"))
const Login = asyncComponent(() => import("@/pages/pc/account/login"))

//mobile
const Index_Mobile = asyncComponent(() => import("@/pages/mobile/account/index"))
const Login_Mobile = asyncComponent(() => import("@/pages/mobile/account/login"))

const pcConfig = () => {
  <HashRouter>
    <Switch>
      <Route path="/" exact component= {Index}/>
      <Route path="/login" component= {login}/>
    </Switch>
  </HashRouter>
}

const mobileConfig = () => {
  <HashRouter>
    <Switch>
      <Route path="/" exact component= {Index_Mobile}/>
      <Route path="/login" component= {Login_Mobile}/>
    </Switch>
  </HashRouter>
}
export default isMobile ? mobileConfig : pcConfig;