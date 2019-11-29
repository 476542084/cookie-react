import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import Searchbar from './searchbar/Searchbar'
import LoginDropdown from './loginDropdown/LoginDropdown'
import { getOwnInfo } from '@/api/getData'
import { saveUserInfo } from '@/store/forum/action'
import { deleteToken } from '@/store/forum/action'
import styles from './Navbar.module.css'

class Navbar extends Component {
    static propTypes = {
        deleteToken: PropTypes.func.isRequired,
    }


    constructor(props) {
        super(props)
    
        this.state = {
            searchbarOpen: false,
        }
    }


    componentDidMount = () => {
        this.storeUserInfo()
    }


    componentDidUpdate = () => {
        this.storeUserInfo()
    }


    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }


    toggleSearchbar = () => {
        this.setState((prevState) => ({searchbarOpen: !prevState.searchbarOpen}))
    }


    storeUserInfo = async() => {
        try {
            if (!!this.props.token) {
                let userId = this.props.userInfo.userId
                let data = await getOwnInfo(userId)
                if (data.status === 200) {
                    this.props.saveUserInfo({
                        userId: data.id,
                        email: data.email,
                        IsKOL: data.is_kol,
                        phone: data.phone,
                        badges: data.user_badges,
                        userInfo: data.userinfo,
                        username: data.username
                    })
                    console.log(data.userinfo)
                } else if (data.status === 403) {
                    this.props.deleteToken('')
                } else {
                    console.log('error message', data.msg)
                }
            }
        } 
        catch (error) {
            console.log('api data error')
        }
    }


    logout = (e) => {
        e.preventDefault()
        this.props.deleteToken('')
    }
    

    render() {
        if (this.props.value === 'forum') {
            return (
                <React.Fragment>
                    <div className={styles.navbar_fixed}>
                        <div className={styles.navbar}>
                            <div className={styles.navbar_left}>
                                <a className={styles.navbar_brand} href="/">
                                    <img className={styles.cookie_logo} src={require("@/assets/navbar/brand.png")} alt="" onerror="this.src=''" />
                                </a>
                                <div className={styles.navbar_sites}>
                                    <div className={`${styles.navbar_sites_item} ${styles.selected}`}><a href="/" id={styles.forum}>论坛</a></div>
                                    <div className={styles.navbar_sites_item}><a href="/products/" id={styles.shop}>商城</a></div>
                                </div>
                            </div>
                            <div className={styles.navbar_middle}>
                                <Searchbar open={this.state.searchbarOpen} toggleSearchbar={this.toggleSearchbar} />
                            </div>
                            <div className={styles.navbar_right}>
                                <div className={styles.navbar_icons}>
                                    <img src={require("@/assets/navbar/search.png")} alt="" id={styles.search} title="搜索" onClick={this.toggleSearchbar} />
                                    <div className={`${styles.nav_link} ${styles.nav_user}`}>
                                        <img src={require("@/assets/navbar/notification-empty.png")} alt="" className={styles.notification_img}/>
                                    </div>
                                    <div className={`${styles.nav_link} ${styles.nav_user}`}>
                                        <button className={styles.navbar_post_button} onClick={()=>{this.props.history.push({pathname: '/postform'})}}>发帖</button>
                                    </div>
                                </div>
                                <LoginDropdown value={this.props.userInfo} logout={this.logout} loggedIn={!!this.props.token} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.navbar_placeholder}></div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className={styles.navbar_fixed}>
                        <div className={styles.navbar}>
                            <div className={styles.navbar_left}>
                                <div className={styles.navbar_sites}>
                                    <div className={`${styles.navbar_sites_item} ${styles.selected}`}>
                                        <a href="/" id={styles.forum}>论坛</a>
                                    </div>
                                    <div className={styles.navbar_sites_item}>
                                        <a href="/products/" id={styles.shop}>商城</a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.navbar_middle}>
                                <Searchbar />
                            </div>
                        </div>
                    </div>
                    <div className={styles.navbar_placeholder}></div>
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        token: state.forumData.token,
        userInfo: state.forumData.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo)),
        deleteToken: token => dispatch(deleteToken(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

