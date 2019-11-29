import React from 'react'
import { timeSince } from '@/components/common/timeSince'
import styles from './UserComments.module.css'

function UserComments(content) {
    return (
        <div className={styles.comments_container}>
            {content.content && content.content.map((comment, index) => {
                const createdDate = timeSince(comment.created_date)
                return <a href="" key={index}>
                    <div className={styles.comment_container}>
                        <div className={styles.comment_content_holder}>
                            <p className={styles.comment_time}>{createdDate}</p>
                            <p className={styles.comment_content}>{comment.text}</p>
                        </div>
                        <div className={styles.commented_content_holder}>
                            <span className={styles.commented_content}>{comment.title}</span>
                        </div>
                        <div className={styles.comment_likes_row}>
                            <div className={styles.comment_likes_row}>
                                <div className={styles.likes}>
                                    <img className={styles.likes_icon} src={require('@/assets/forum/like.png')} />
                                    <span className={styles.likes_amount}>{comment.like_count}</span>
                                </div>
                                <div className={styles.comments}>
                                    <img className={styles.comments_icon} src={require('@/assets/forum/comment.png')} />
                                    <span className={styles.comments_amount}>{comment.subcomment_count ? comment.subcomment_count: 0}</span>
                                </div>
                            </div>
                        </div>
                        {/* <!__ ProjectNote 2019.10.10 暂时先不要 __> */}
                        {/* <img className="delete_icon" src="{% static 'default_files/forum/delete.png' %}" data_url="{{ comment.delete_url }}"> */}
                    </div>
                </a>
            })}
        </div>
    )
}

export default UserComments
