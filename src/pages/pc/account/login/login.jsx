import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveToken } from '@/store/forum/action'
class Index extends Component{
    state = {
        data: []
    }

    render() {
        return(
            <main>
                <h1>pc注册
                    <span>pc注册</span>
                </h1>
            </main>
        )
    }
}

export default connect(state => ({
    proData: state.data,
}), {
saveToken
})(index);