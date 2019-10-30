import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveToken } from '@/store/forum/action'
import PropTypes from 'prop-types'
import {accountLogin, getUserInfo} from '@/api/getData'
class Index extends Component{
    static propTypes = {
        saveToken: PropTypes.func.isRequired,
    }
    state = {
        date:[],
        account:'',
        password:''
    }
    Login = async() => {
        try {
            let data = await accountLogin(this.state.account,this.state.password)
            console.log('data',data)
            if(data.error_code === 0){
                console.log('daterra')
            }else{
                console.log('daterra')
            }
        } catch (error) {
            alert('错误')
        }
    }
    getUserInfo = async() => {
        try {
            let data = await getUserInfo(this.state.account)
            
            if(data.error_code === 0){
                console.log('daterra')
            }else{
                alert(data.msg)
            }
        } catch (error) {
            alert('错误')
        }

    }

    componentWillMount(){
        this.getUserInfo()
    }
    render() {
        return(
            <main>
                <h1>pc主页
                </h1>
                <input type="text" />
                <input type="password"/>
                <button onClick={this.Login.bind(this)}>登录</button>
            </main>
        )
    }
}

export default connect(state => ({
    proData: state.date,
}), {saveToken})(Index);