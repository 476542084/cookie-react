import React from 'react'
import styles from './UserContents.module.css'
import UserPosts from '../userPosts/UserPosts.jsx'
import UserComments from '../userComments/UserComments.jsx'
import UserLikes from '../userLikes/UserLikes'
import UserFans from '../userFans/UserFans'
import UserRecommendations from '../userRecommendations/UserRecommendations'
import {UserConsumer} from '../UserContext'

function UserContents(props) {
    return (
        <UserConsumer>
            {(content) => {
                return <div className={`${styles.user_info_contents} ${styles.hide_scrollbar}`}>
                    {content.state.tabs === 'posts' && <UserPosts content={props.state.posts} />}
                    {content.state.tabs === 'comments' && <UserComments content={props.state.comments} />}
                    {content.state.tabs === 'likes' && <UserLikes content={props.state.likes} />}
                    {content.state.tabs === 'followedPosts' && <UserPosts content={props.state.followedPosts} />}
                    {content.state.tabs === 'following' && <UserFans content={props.state.following} />}
                    {content.state.tabs === 'fans' && <UserFans content={props.state.fans} />}
                    {content.state.tabs === 'recommendations' && <UserRecommendations content={props.state.recommendations} />}
                </div>
            }}
        </UserConsumer>
    )
}

export default UserContents
