import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveToken } from '@/store/forum/action'
class Login extends Component{
    state = {
        data: []
    }

    render() {
        return(
            <main>
                <h1>mobile注册
                    <span>mobile注册</span>
                </h1>
            </main>
        )
    }
}

export default connect(state => ({
    proData: state.data,
}), {
saveToken
})(Login);