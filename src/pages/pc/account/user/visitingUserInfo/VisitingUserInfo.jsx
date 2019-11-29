import React, { Component } from 'react'
import UserContents from '../userContents/UserContents'
import VisitingUserDetails from '../visitingUserDetails/VisitingUserDetails'
import { UserProvider } from '../UserContext'
import store from '@/store/store'
import { getUserInfo, getUserPosts, getUserComments, getUserFans, getUserFollowing, getUserFollowedPosts, getUserLikes, getUserRecommendations, checkUserFollowed, userFollow, userUnfollow } from '@/api/getData'
import styles from './VisitingUserInfo.module.css'

class UserInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tabs: window.location.href.split('/')[window.location.href.split('/').indexOf('user') + 2], 
            page: 1,
            posts: [],
            userId: window.location.href.split('/')[window.location.href.split('/').indexOf('user') + 1]
        }
    }


    storeUserInfo = async () => {
        try {
            const data = await getUserInfo(this.state.userId)
            if (data.status === 200) {
                this.setState({userInfo: data})
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserPosts = async () => {
        try {
            const data = await getUserPosts(this.state.userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({posts: [
                        ...prevState.posts,
                        ...data.results
                    ]}))
                } else {
                    this.setState({posts: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserComments = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserComments(userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({comments: [
                        ...prevState.comments,
                        ...data.results
                    ]}))
                } else {
                    this.setState({comments: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserLikes = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserLikes(userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({likes: [
                        ...prevState.likes,
                        ...data.results
                    ]}))
                } else {
                    this.setState({likes: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserFollowing = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserLikes(userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({following: [
                        ...prevState.following,
                        ...data.results
                    ]}))
                } else {
                    this.setState({following: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserFollowing = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserFollowing(userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({following: [
                        ...prevState.following,
                        ...data.results
                    ]}))
                } else {
                    this.setState({following: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserFollowedPosts = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserFollowedPosts(userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({followedPosts: [
                        ...prevState.followedPosts,
                        ...data.results
                    ]}))
                } else {
                    this.setState({followedPosts: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserFans = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserFans(userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({fans: [
                        ...prevState.fans,
                        ...data.results
                    ]}))
                } else {
                    this.setState({fans: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    storeUserRecommendations = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserRecommendations(userId, this.state.page)
            if (data.status === 200) {
                if (this.state.page > 1) {
                    this.setState((prevState) => ({recommendations: [
                        ...prevState.recommendations,
                        ...data.results
                    ]}))
                } else {
                    this.setState({recommendations: [
                        ...data.results
                    ]})
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    checkUserFollowed = async () => {
        const userId = this.state.userInfo.id
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
        const userId = this.state.userInfo.id
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
        const userId = this.state.userInfo.id
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


    componentDidMount = async () => {
        await this.storeUserInfo()
        await this.checkUserFollowed()
        switch (this.state.tabs){
            case 'posts':
                this.storeUserPosts()
            case 'comments':
                this.storeUserComments()
            case 'likes':
                this.storeUserLikes()
            case 'followedPosts':
                this.storeUserFollowedPosts()
            case 'following':
                this.storeUserFollowing()
            case 'fans':
                this.storeUserFans()
            case 'recommendations':
                this.storeUserRecommendations()
        }
    }


    showTab = (e) => {
        if (this.state.tabs !== e.currentTarget.id) {
            this.setState({tabs: e.currentTarget.id, page: 1}, () => {
                switch (this.state.tabs){
                    case 'posts':
                        this.storeUserPosts()
                    case 'comments':
                        this.storeUserComments()
                    case 'likes':
                        this.storeUserLikes()
                    case 'followedPosts':
                        this.storeUserFollowedPosts()
                    case 'following':
                        this.storeUserFollowing()
                    case 'fans':
                        this.storeUserFans()
                    case 'recommendations':
                        this.storeUserRecommendations()
                }
            })
        }
    }
    

    render() {
        return (
            <UserProvider value={{state: this.state, showTab: this.showTab}} >
                <div className='page_container'>
                    <div className={styles.user_info_container}>
                        <UserContents state={this.state} />
                        <VisitingUserDetails methods={{userFollow: this.userFollow, userUnfollow: this.userUnfollow}} />
                    </div>
                </div>
            </UserProvider>
        )
    }
}

export default UserInfo

