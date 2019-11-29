import React from 'react'
import styles from './NotificationsMessages.module.css'

function NotificationsMessages(props) {
    return (
        props.content.map((message) => {
            return <li className={styles.list_group_item} key={message} >
                <div className={styles.media}>
                    <ul className={styles.avatars}>
                        <li>
                        <div className={styles.user_img_holder}>
                            <a href="">
                                <img src="{{ at.sender_profile_pic_img }}" className={styles.user_img} onerror="this.src='{% static 'default_files/none_user.png' %}'" />
                            </a>
                            <img className={styles.user_verif_img} src="{{ at.sender_badge_url }}" />
                        </div>
                        </li>
                    </ul>
                    <div className={styles.media_body}>
                        <div className={styles.comment_body_holder}>
                            <a href="" className={styles.h6}></a>
                            <span className={styles.text_small}>前在 中@了您</span>
                            <span className={styles.at_content}></span>
                        </div>
                        <div className={styles.comment_title_holder}>
                            <a href=""><span className={`${styles.comment_title} {{ at.type }}`}></span></a>
                        </div>
                    </div>
                </div>
            </li>
        })
    )
}

export default NotificationsMessages
