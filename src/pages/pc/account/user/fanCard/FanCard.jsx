import React, { Component } from 'react'
import { checkUserFollowed, userFollow, userUnfollow } from '@/api/getData'
import store from '@/store/store'
import styles from './FanCard.module.css'


class FanCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }


    componentDidMount = () => {
        this.checkUserFollowed()
    }


    checkUserFollowed = async () => {
        const userId = this.props.value.id
        try {
            const data = await checkUserFollowed(userId)
            if (data.status === 200) {
                this.setState({
                    userFollowed: data.connection,
                })
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('check user followed error')
        }
    }


    userFollow = async () => {
        const userId = this.props.value.id
        try {
            const data = await userFollow(userId)
            if (data.status === 201) {
                if (data.followee === userId) {
                    this.setState((prevState) => ({
                        userFollowed: prevState.userFollowed === '关注' ? '已关注' : '互相关注',
                    }))
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('author follow error')
        }
    }


    userUnfollow = async () => {
        const userId = this.props.value.id
        try {
            const data = await userUnfollow(userId)
            if (data.status === 200) {
                this.setState((prevState) => ({
                    userFollowed: prevState.userFollowed === '已关注' ? '关注' : '回粉',
                }))
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('author follow error')
        }
    }


    render() {
        const loginInfo = store.getState('forum').forumData.userInfo.username
        return (
            <div class={styles.fan_user_info}>
                <div class={styles.fan_user_img_holder}>
                    <a href="">
                        <img class={styles.fan_user_img} src={this.props.value.userinfo.profile_pic} onerror="this.src='{% static 'default_files/none_user.png' %}'" />
                    </a>
                </div>
                <div class={styles.fan_user_info_holder}>
                    <div class={styles.fan_username_holder}>
                        <a href="">
                            <span class={styles.fan_username}>{this.props.value.username}</span>
                        </a>
                        <div class={styles.fan_user_badges}>
                            {this.props.value.user_badges.badge[0] && <img class={styles.fan_user_badge} src={this.props.value.user_badges.badge[0].icon} />}
                        </div>
                    </div>
                    <div class={styles.fan_user_detail_holder}>
                        {this.props.value.userinfo.sex === 'male' && <span class={styles.fan_user_sex}>男</span>}
                        {this.props.value.userinfo.sex === 'female' && <span class={styles.fan_user_sex}>女</span>}
                        {!this.props.value.userinfo.sex && <span class={styles.fan_user_sex}>性别保密</span>}
                        <span>|</span>
                        {this.props.value.userinfo.locations.location && <span class={styles.fan_user_location}>{this.props.value.userinfo.locations.location}</span>}
                        {!this.props.value.userinfo.locations.location && this.props.value.userinfo.locations.parent_location && <span class={styles.fan_user_location}>{this.props.value.userinfo.locations.parent_location}</span>}
                        {!this.props.value.userinfo.locations.location && !this.props.value.userinfo.locations.parent_location && <span class={styles.fan_user_location}>地区未知</span>}
                    </div>
                    <div class={styles.fan_user_follow_info}>
                        <a href="">
                            <div class={`${styles.fan_user_info_item} ${styles.follows}`}>
                                <p class={styles.fan_user_info_item_count}>{this.props.value.userinfo.following_count}</p>
                                <p class={styles.fan_user_info_item_text}>关注</p>
                            </div>
                        </a>
                        <a href="">
                            <div class={`${styles.fan_user_info_item} ${styles.fans}`}>
                                <p class={styles.fan_user_info_item_count}>{this.props.value.userinfo.fan_count}</p>
                                <p class={styles.fan_user_info_item_text}>粉丝</p>
                            </div>
                        </a>
                        <a href="">
                            <div class={`${styles.fan_user_info_item} ${styles.recommends}`}>
                                {!this.props.value.userinfo.recommend_count && <p class={styles.fan_user_info_item_count}>0</p>}
                                {this.props.value.userinfo.recommend_count && <p class={styles.fan_user_info_item_count}></p>}
                                <p class={styles.fan_user_info_item_text}>推荐</p>
                            </div>
                        </a>
                    </div>
                    { loginInfo && this.props.value.username && loginInfo.user !== this.props.value.username && this.state.userFollowed === '已关注' && <button className={`${styles.fan_user_info_follow} ${styles.followed}`} onClick={this.userUnfollow}>{this.state.userFollowed}</button> }
                    { loginInfo && this.props.value.username && loginInfo.user !== this.props.value.username && this.state.userFollowed === '关注' && <button className={`${styles.fan_user_info_follow} ${styles.non_followed}`} onClick={this.userFollow}>{this.state.userFollowed}</button> }
                    { loginInfo && this.props.value.username && loginInfo.user !== this.props.value.username && this.state.userFollowed === '回粉' && <button className={`${styles.fan_user_info_follow} ${styles.followback}`} onClick={this.userFollow}>{this.state.userFollowed}</button> }
                    { loginInfo && this.props.value.username && loginInfo.user !== this.props.value.username && this.state.userFollowed === '互相关注' && <button className={`${styles.fan_user_info_follow} ${styles.mutual}`} onClick={this.userUnfollow}>{this.state.userFollowed}</button> }
                    { !loginInfo && this.props.value.username && <button className={`${styles.fan_user_info_follow} ${styles.non_followed}`} onClick={this.userUnfollow}>关注</button> }
                </div>
            </div>
        )
    }
}

export default FanCard

