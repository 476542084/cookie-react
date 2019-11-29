import React from 'react'
import styles from './NotificationsLikes.module.css'

function NotificationsLikes(props) {
    return (
        props.content.map((like) => {
            return <li className={styles.list_group_item} key={like} >
                <img className={styles.like_icon} src="{% static 'default_files/notifications/like-icon.png' %}" />
                <div className={styles.media_body}>
                    <a href="">
                        <p className={styles.likers}></p>
                    </a>
                    <p className={styles.like_message}>赞了你的</p>
                    <div className={styles.like_content_holder}>
                        <a href=""><span className={styles.like_content_title}></span></a>
                    </div>
                </div>
            </li>
        })    
    )
}

export default NotificationsLikes
