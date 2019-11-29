import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/index'
import {isMobile} from '@/utils/commons'
import FastClick from 'fastclick'
import {AppContainer} from 'react-hot-loader'
import { Provider} from 'react-redux'
import {getStore} from '@/utils/commons'
import store from '@/store/store'
import * as serviceWorker from './serviceWorker'
import * as rem from './config/rem'
import '@/style/base.css'
import { saveToken, saveUserInfo } from './store/forum/action';

//mock数据
// import '@/mock/mock'
if (isMobile()) {
    rem.rem();
    
    // ios11.3有bug  暂舍弃
    // if ('addEventListener' in document) {
    //     document.addEventListener('DOMContentLoaded', function () {
    //         FastClick.attach(document.body);
    //     }, false);
    // }
}
console.log('token00000',getStore('token'))

if(!!getStore('token') || !!getStore('userInfo')){
    store.dispatch(saveToken(getStore('token')))
    store.dispatch(saveUserInfo(JSON.parse(getStore('userInfo'))))
}

const render = Component => {
    ReactDOM.render(
        //绑定redux、热加载
        <Provider store = {store}>
            <AppContainer >
                <Component />
            </AppContainer> 
        </Provider>,
        document.getElementById('root')
    )
}

render(Route);
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./router/', () => {
        render(Route);
    })
}

serviceWorker.unregister();