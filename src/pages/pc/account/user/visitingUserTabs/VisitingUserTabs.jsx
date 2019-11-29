import React from 'react'
import {UserConsumer} from '../UserContext'
import styles from './VisitingUserTabs.module.css'

function UserTabs() {
    return (
        <UserConsumer>
            {(tabs) => {
                return <div className={styles.user_info_tabs}>
                    <a href={`#/user/${tabs.state.userId}/posts`} id="posts" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item}>
                            <span className={styles.sidebar_title}>ta的帖子</span>
                        </div>
                    </a>
                    <a href={`#/user/${tabs.state.userId}/comments`} id="comments" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item}>
                            <span className={styles.sidebar_title}>ta的评论</span>
                        </div>
                    </a>
                    <a href={`#/user/${tabs.state.userId}/likes`} id="likes" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item}>
                            <span className={styles.sidebar_title}>ta的点赞</span>
                        </div>
                    </a>
                    <a href={`#/user/${tabs.state.userId}/followedPosts`} id="followedPosts" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item}>
                            <span className={styles.sidebar_title}>ta的关注</span>
                        </div>
                    </a>
                </div>
            }}
        </UserConsumer>
    )
}

export default UserTabs
