// 路由守卫
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default PrivateRoute = ({ component:Component, ...rest}) => {
    <Route
        {...rest}
        render = {props => {
            //根据登录信息store判断
            Boolean(true) ?
            ( <Component {...props} /> )
            :(
              <Redirect 
                to={{
                    pathname:"/",
                    state:{from:props.location}
                }}
              />      
            )   
        }}
    />
};