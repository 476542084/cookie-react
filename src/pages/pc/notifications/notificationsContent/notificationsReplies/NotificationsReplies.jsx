import React from 'react'
import styles from './NotificationsReplies.module.css'

function NotificationsReplies(props) {
    return (
        <div className={styles.history_comment_received}>
            <ol className={styles.list_group}>
                {props.content.map((comment) => {
                    return <li className={styles.list_group_item} key={comment} >
                        <div className={styles.media}>
                            <ul className={styles.avatars}>
                                <li>
                                    <div className={styles.user_img_holder}>
                                        <a href="">
                                        <img src="{{ comment.author.userinfo.profile_pic.url }}" className={styles.user_img}  onerror="this.src='{% static 'default_files/none_user.png' %}'" />
                                        </a>
                                        <img className={styles.user_verif_img} src="{{ comment.author.user_badges.badge.last.icon.url }}" />
                                    </div>
                                </li>
                            </ul>
                            <div className={styles.media_body}>
                                <div className={styles.comment_body_holder}>
                                    <a href="" className={styles.h6}></a>
                                    <span className={styles.text_small}> 回复了我的帖子</span>
                                    <a href="">
                                        <p className={styles.comment_text}></p>
                                    </a>
                                </div>
                                <div className={styles.comment_title_holder}>
                                    <a href="">
                                        <span className={styles.comment_title}></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                })}
            </ol>
        </div>
    )
}

export default NotificationsReplies
