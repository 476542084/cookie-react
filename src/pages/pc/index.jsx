import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveToken } from '@/store/forum/action'
import PropTypes from 'prop-types'
import {getUserInfo} from '@/api/getData'
class Index extends Component{
    static propTypes = {
        saveToken: PropTypes.func.isRequired,
    }
    state = {
        data:[],
        account:'',
    }

    getUserInfo = async() => {
        try {
            let data = await getUserInfo(this.state.account)
            if(data.error_code === 0){
                console.log('data',data)
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
                
            </main>
        )
    }
}

export default connect(state => ({
    proData: state.date,
}), {saveToken})(Index);