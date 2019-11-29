import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserContents from '../userContents/UserContents'
import UserDetails from '../userDetails/UserDetails'
import { UserProvider } from '../UserContext'
import store from '@/store/store'
import { getUserPosts, getUserComments, getUserFans, getUserFollowing, getUserFollowedPosts, getUserLikes, getUserRecommendations } from '@/api/getData'
import styles from './UserInfo.module.css'

class UserInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tabs: window.location.href.split('/')[window.location.href.split('/').indexOf('userinfo') + 1], 
            page: 1,
        }
    }


    storeUserInfo = async () => {
        try {
            this.setState({userInfo: this.props.userInfo})
        } 
        catch {
            console.log('api data error')
        }
    }


    storeUserPosts = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getUserPosts(userId, this.state.page)
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
                    console.log(data)
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


    componentDidMount = () => {
        this.storeUserInfo()
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
        console.log(this.state)
        return (
            <UserProvider value={{state: this.state, showTab: this.showTab}} >
                <div className='page_container'>
                    <div className={styles.user_info_container}>
                        <UserContents state={this.state} />
                        <UserDetails />
                    </div>
                </div>
            </UserProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.forumData.userInfo
    }
}

export default connect(mapStateToProps)(UserInfo)

