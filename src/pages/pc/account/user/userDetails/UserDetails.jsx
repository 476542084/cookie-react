import React from 'react'
import UserTabs from '../userTabs/UserTabs'
import {UserConsumer} from '../UserContext'
import styles from './UserDetails.module.css'

function UserDetails() {
    return (
        <UserConsumer>
            {(content) => {
                const userInfo = content.state.userInfo
                if (userInfo) console.log(userInfo)
                return <div className={styles.user_info_sidebar}>
                    <div className={styles.user_info}>
                        {userInfo && <img className={styles.user_img} src={userInfo.userInfo.profile_pic} onerror="this.src='{% static 'default_files/none_user.png' %}'" />}
                        {!userInfo && <img className={styles.user_img} src="" />}
                        <div className={styles.user_info_holder}>
                            <div className={styles.username_holder}>
                                {userInfo && <span className={styles.username}>{userInfo.username}</span>}
                                {userInfo && userInfo.badges.badge.length > 0 && <div className={styles.user_badges}>
                                    {userInfo.badges.badge.map((badge) => {
                                        return <img className={styles.user_badge} src={badge.icon} />
                                    })}
                                </div>}
                            </div>
                            <div className={styles.user_follow_info}>
                                <a href="#/userinfo/following">
                                    <div className={`${styles.user_info_item} ${styles.follows}`} id="following" onClick={content.showTab}>
                                        {userInfo && <p className={styles.user_info_item_count}>{userInfo.userInfo.following_count}</p>}
                                        {!userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        <p className={styles.user_info_item_text}>关注</p>
                                    </div>
                                </a>
                                <a href="#/userinfo/fans">
                                    <div className={`${styles.user_info_item} ${styles.fans}`} id="fans" onClick={content.showTab}>
                                        {userInfo && <p className={styles.user_info_item_count}>{userInfo.userInfo.fan_count}</p>}
                                        {!userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        <p className={styles.user_info_item_text}>粉丝</p>
                                    </div>
                                </a>
                                <a href="#/userinfo/recommendations">
                                    <div className={`${styles.user_info_item} ${styles.recommends}`} id="recommendations" onClick={content.showTab}>
                                        {userInfo && userInfo.userInfo && <p className={styles.user_info_item_count}>{userInfo.userInfo.recommendations_count}</p>}
                                        {userInfo && !userInfo.userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        {!userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        <p className={styles.user_info_item_text}>推荐</p>
                                    </div>
                                </a>
                            </div>
                            <a href="#/settings">
                                <button className={styles.user_info_settings}>个人信息</button>
                            </a>
                        </div>
                    </div>
        
                    <UserTabs />
                </div>
            }}
        </UserConsumer>
    )
}

export default UserDetails
