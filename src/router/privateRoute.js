// 路由守卫
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'


const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest}
        render = {props =>
            window.location.href.indexOf('products') == -1 ? 
            <>
                <Navbar value='forum' history={props.history} />
                    <Component {...props} />
                <Footer />
            </>
            :
            <>
                <Navbar value='store' history={props.history} />
                    <Component {...props} />
                <Footer />
            </>
        }
    />
}

export {PrivateRoute}
