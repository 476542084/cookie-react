import React from 'react'
import VisitingUserTabs from '../visitingUserTabs/VisitingUserTabs'
import {UserConsumer} from '../UserContext'
import store from '@/store/store'
import styles from './VisitingUserDetails.module.css'

function UserDetails(props) {
    return (
        <UserConsumer>
            {(content) => {
                const userInfo = content.state.userInfo
                const loginInfo = store.getState('forum').forumData.userInfo.username
                return <div className={styles.user_info_sidebar}>
                    <div className={styles.user_info}>
                        {userInfo && <img className={styles.user_img} src={userInfo.userinfo.profile_pic} onerror="this.src='{% static 'default_files/none_user.png' %}'" />}
                        {!userInfo && <img className={styles.user_img} src="" />}
                        <div className={styles.user_info_holder}>
                            <div className={styles.username_holder}>
                                {userInfo && <span className={styles.username}>{userInfo.username}</span>}
                                {userInfo && userInfo.user_badges.badge.length > 0 && <div className={styles.user_badges}>
                                    {userInfo.user_badges.badge.map((badge) => {
                                        return <img className={styles.user_badge} src={badge.icon} key={badge.id} />
                                    })}
                                </div>}
                            </div>
                            <div className={styles.user_detail_holder}>
                                {userInfo && userInfo.userinfo.sex === "male" && <span className={styles.user_sex}>男</span>}
                                {userInfo && userInfo.userinfo.sex === "female" && <span className={styles.user_sex}>女</span>}
                                {(userInfo && !userInfo.userinfo.sex) || !userInfo && <span className={styles.user_sex}>性别保密</span>}
                                <span>|</span>
                                {userInfo && userInfo.userinfo.locations.location && <span className={styles.user_location}>{userInfo.userinfo.locations.location}</span>}
                                {(userInfo && !userInfo.userinfo.locations.location) || !userInfo && <span className={styles.user_location}>地址保密</span>}
                            </div>
                            <div class={styles.user_bio_holder}>
                                {userInfo && <span className={styles.user_bio}>{userInfo.userinfo.bio}</span>}
                            </div>
                            <div className={styles.user_follow_info}>
                                <a href={`#/user/${content.state.userId}/following`} id="following" onClick={content.showTab}>
                                    <div className={`${styles.user_info_item} ${styles.follows}`}>
                                        {userInfo && <p className={styles.user_info_item_count}>{userInfo.userinfo.following_count}</p>}
                                        {!userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        <p className={styles.user_info_item_text}>关注</p>
                                    </div>
                                </a>
                                <a href={`#/user/${content.state.userId}/fans`} id="fans" onClick={content.showTab}>
                                    <div className={`${styles.user_info_item} ${styles.fans}`}>
                                        {userInfo && <p className={styles.user_info_item_count}>{userInfo.userinfo.fan_count}</p>}
                                        {!userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        <p className={styles.user_info_item_text}>粉丝</p>
                                    </div>
                                </a>
                                <a href={`#/user/${content.state.userId}/recommendations`} id="recommendations" onClick={content.showTab}>
                                    <div className={`${styles.user_info_item} ${styles.recommends}`}>
                                        {userInfo && userInfo.userInfo && <p className={styles.user_info_item_count}>{userInfo.userInfo.recommendations_count}</p>}
                                        {userInfo && !userInfo.userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        {!userInfo && <p className={styles.user_info_item_count}>0</p>}
                                        <p className={styles.user_info_item_text}>推荐</p>
                                    </div>
                                </a>
                            </div>
                            { loginInfo && userInfo && userInfo.username && loginInfo.user !== userInfo.username && content.state.userFollowed === '已关注' && <button className={`${styles.user_info_follow} ${styles.followed}`} onClick={props.methods.userUnfollow}>{content.state.userFollowed}</button> }
                            { loginInfo && userInfo && userInfo.username && loginInfo.user !== userInfo.username && content.state.userFollowed === '关注' && <button className={`${styles.user_info_follow} ${styles.non_followed}`} onClick={props.methods.userFollow}>{content.state.userFollowed}</button> }
                            { loginInfo && userInfo && userInfo.username && loginInfo.user !== userInfo.username && content.state.userFollowed === '回粉' && <button className={`${styles.user_info_follow} ${styles.followback}`} onClick={props.methods.userFollow}>{content.state.userFollowed}</button> }
                            { loginInfo && userInfo && userInfo.username && loginInfo.user !== userInfo.username && content.state.userFollowed === '互相关注' && <button className={`${styles.user_info_follow} ${styles.mutual}`} onClick={props.methods.userUnfollow}>{content.state.userFollowed}</button> }
                            { !loginInfo && userInfo && userInfo.username && <button className={`${styles.user_info_follow} ${styles.non_followed}`} onClick={this.userUnfollow}>关注</button> }
                        </div>
                    </div>
        
                    <VisitingUserTabs />
                </div>
            }}
        </UserConsumer>
    )
}

export default UserDetails
