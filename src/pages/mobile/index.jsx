import React, { Component } from 'react'

import { connect } from 'react-redux';
import { saveToken } from '@/store/forum/action';
import './index.css'
class Index extends Component{
    state = {
        data: []
    }

    render() {
        return(
            <main>
                <p className='h'>热门分类
                </p>
                <input type="text" />
                <input type="password"/>
            </main>
        )
    }
}

export default connect(state => ({
    proData: state.data,
}), {
saveToken
})(Index);