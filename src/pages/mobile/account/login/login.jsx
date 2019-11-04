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
               
            </main>
        )
    }
}

export default connect(state => ({
    proData: state.data,
}), {
saveToken
})(Login);