import React, {Component} from 'react'
import {HashRouter, Switch, Redirect, Route} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
import {isMobile} from '@/utils/commons'
import {PrivateRoute} from './privateRoute'

// pc
const Index = asyncComponent(() => import("@/pages/pc/index"))
const Login = asyncComponent(() => import("@/pages/pc/account/login/login"))
const Register = asyncComponent(() => import("@/pages/pc/account/register/register"))
const Forget = asyncComponent(() => import("@/pages/pc/account/forget/forget"))
const Topic = asyncComponent(() => import("@/pages/pc/forum/topic/Topic"))
const Post = asyncComponent(() => import("@/pages/pc/forum/postPage/PostPage"))
const PostForm = asyncComponent(() => import("@/pages/pc/forum/postForm/postForm"))
const User = asyncComponent(() => import("@/pages/pc/account/user/visitingUserInfo/VisitingUserInfo"))
const UserInfo = asyncComponent(() => import("@/pages/pc/account/user/userInfo/UserInfo"))
const UserSettings = asyncComponent(() => import("@/pages/pc/account/user/userSettings/UserSettings"))
const Notifications = asyncComponent(() => import("@/pages/pc/notifications/Notifications"))
const Comment = asyncComponent(() => import("@/pages/pc/forum/commentPage/CommentPage"))

//mobile
const Index_Mobile = asyncComponent(() => import("@/pages/mobile/index"))
const Login_Mobile = asyncComponent(() => import("@/pages/mobile/account/login/login"))
const Register_Mobile = asyncComponent(() => import("@/pages/mobile/account/register/register"))
const Forget_Mobile = asyncComponent(() => import("@/pages/mobile/account/forget/forget"))
const PostForm_Mobile = asyncComponent(() => import("@/pages/mobile/forum/postForm/postForm"))
class pcConfig extends Component {
    render () {
        return (
            <HashRouter>
                <Switch>
                    <PrivateRoute path="/" exact component= {Index}></PrivateRoute>
                    <PrivateRoute path="/account/login" component= {Login}></PrivateRoute>
                    <PrivateRoute path="/account/register" component= {Register}></PrivateRoute>
                    <PrivateRoute path="/account/forget" component= {Forget}></PrivateRoute>
                    <PrivateRoute path="/topics" component= {Topic}></PrivateRoute>
                    <PrivateRoute path="/post" component= {Post}></PrivateRoute>
                    <PrivateRoute path="/postform" component= {PostForm}></PrivateRoute>
                    <PrivateRoute path="/user" component= {User}></PrivateRoute>
                    <PrivateRoute path="/userinfo" component= {UserInfo}></PrivateRoute>
                    <PrivateRoute path="/settings" component= {UserSettings}></PrivateRoute>
                    <PrivateRoute path="/notifications" component= {Notifications}></PrivateRoute>
                    <PrivateRoute path="/comment" component= {Comment}></PrivateRoute>
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
                    <PrivateRoute path="/" exact component= {Index_Mobile}></PrivateRoute>
                    <PrivateRoute path="/account/login" component= {Login_Mobile}></PrivateRoute>
                    <PrivateRoute path="/account/register" component= {Register_Mobile}></PrivateRoute>
                    <PrivateRoute path="/account/forget" component= {Forget_Mobile}></PrivateRoute>
                    <PrivateRoute path="/postform" component= {PostForm_Mobile}></PrivateRoute>
                    <Redirect from="/*" to="/" />
                </Switch>
            </HashRouter>
        )
    }
}
export default isMobile() ? mobileConfig : pcConfig;