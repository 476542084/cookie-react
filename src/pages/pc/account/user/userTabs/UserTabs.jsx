import React from 'react'
import {UserConsumer} from '../UserContext'
import styles from './UserTabs.module.css'

function UserTabs() {
    return (
        <UserConsumer>
            {(tabs) => {
                return <div className={styles.user_info_tabs}>
                    <a href="#/userinfo/followedPosts" id="followedPosts" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item}>
                            <span className={styles.sidebar_title}>我的关注</span>
                        </div>
                    </a>
                    <a href="#/userinfo/comments" id="comments" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item} >
                            <span className={styles.sidebar_title}>我的评论</span>
                        </div>
                    </a>
                    <a href="#/userinfo/likes" id="likes" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item}>
                            <span className={styles.sidebar_title}>我的点赞</span>
                        </div>
                    </a>
                    <a href="#/userinfo/posts" id="posts" onClick={tabs.showTab}>
                        <div className={styles.sidebar_item}>
                            <span className={styles.sidebar_title}>我的帖子</span>
                        </div>
                    </a>
                </div>
            }}
        </UserConsumer>
    )
}

export default UserTabs
