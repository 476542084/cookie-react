import React from 'react'
import styles from './NotificationsFollows.module.css'

function NotificationsFollows(props) {
    return (
        props.content.map((user) => {
            return <div className={styles.user_holder} key={user} >
                <div className={styles.user_img_holder}>
                    <a href="">
                    <img className={styles.user_img} src="{{ user.userinfo.profile_pic.url }}" onerror="this.src='{% static 'default_files/none_user.png' %}'" />
                    </a>
                    <img className={styles.fans_profile_verif_pic} src="{{ user.user_badges.badge.last.icon.url }}" />
                </div>
                <div className={styles.user_details}>
                    <div className={styles.user_info}>
                    <a href="">
                        <p className={styles.username}></p>
                    </a>
                    <p className={styles.follow_text}>关注了你</p>
                    <span className={styles.user_time}></span>
                    </div>
                    <button className={styles.user_follow_button} follower_id="{{ user.id }}"></button>
                </div>
            </div>
        })
    )
}

export default NotificationsFollows
