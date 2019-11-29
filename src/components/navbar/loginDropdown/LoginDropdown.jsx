import React, { Component } from 'react'
import { getStore } from '@/utils/commons'
import styles from './LoginDropdown.module.css'

class LoginDropdown extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            dropdownOpen: false,
        }
    }

    
    dropdownToggle = () => {
        this.setState((prevState) => ({dropdownOpen: !prevState.dropdownOpen}))
    }
    

    render() {
        return (
            <React.Fragment>
                { !this.props.loggedIn && <div className={styles.navbar_login}>
                    <a href="#/account/login" className={styles.login}>登陆</a>
                </div> }
                { this.props.loggedIn && 
                <div className={styles.navbar_login} onClick={this.dropdownToggle} >
                    { this.props.value && <>
                        {this.props.value.userInfo && <img src={this.props.value.userInfo.profile_pic} className={styles.user_profile_img} />}
                        <span className={styles.login}>{this.props.value.username}</span>
                    </> }
                    { this.state.dropdownOpen && <div className={styles.profile_dropdown}>
                        <a href="#/userinfo/posts">
                            <div className={styles.profile_dropdown_item}>
                                <span>个人中心</span>
                                <img src={require("@/assets/navbar/profile-dropdown-arrow.png")} className={styles.profile_dropdown_arrow} />
                            </div>
                        </a>
                        <a href="/orders/myorders">
                            <div className={styles.profile_dropdown_item}>
                                <span>我的订单</span>
                                <img src={require("@/assets/navbar/profile-dropdown-arrow.png")} className={styles.profile_dropdown_arrow} />
                            </div>
                        </a>
                        <a href="/orders/address">
                            <div className={styles.profile_dropdown_item}>
                                <span>收货地址</span>
                                <img src={require("@/assets/navbar/profile-dropdown-arrow.png")} className={styles.profile_dropdown_arrow} />
                            </div>
                        </a>
                        <a href="">
                            <div className={styles.profile_dropdown_item}>
                                <span>我的收益</span>
                                <img src={require("@/assets/navbar/profile-dropdown-arrow.png")} className={styles.profile_dropdown_arrow} />
                            </div>
                        </a>
                        <a href="">
                            <div className={`${styles.profile_dropdown_item} ${styles.selected}`}>
                                <span>我的推荐</span>
                                <img src={require("@/assets/navbar/profile-dropdown-arrow-selected.png")} className={styles.profile_dropdown_arrow} />
                            </div>
                        </a>
                        <a href="/" onClick={this.props.logout} >
                            <div className={styles.profile_dropdown_item}>
                                <span>退出登录</span>
                                <img src={require("@/assets/navbar/profile-dropdown-arrow.png")} className={styles.profile_dropdown_arrow} />
                            </div>
                        </a>
                    </div> }
                </div>
                }
            </React.Fragment>
        )
    }
}

export default LoginDropdown
