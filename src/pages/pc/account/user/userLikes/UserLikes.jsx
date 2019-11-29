import React from 'react'
import { timeSince } from '@/components/common/timeSince'
import styles from './UserLikes.module.css'

function UserLikes(content) {
    return (
        <div class={styles.likes_container}>
            {content.content && content.content.map((like) => {
                const createdDate = timeSince(like.liked_time)
                return <a href="" key={like.id}>
                    <div class={styles.like_container}>
                        <div class={styles.liked_content_holder}>
                            <span class={styles.liked_content}>{like.title}</span>
                        </div>
                        <div class={styles.info_holder}>
                            <p class={styles.liked_time}><span>{createdDate} 点过赞</span></p>
                            <div class={styles.comment_likes_row}>
                                <div class={styles.comment_likes_row}>
                                    <div class={styles.likes}>
                                        <img class={styles.likes_icon} src={require('@/assets/forum/like.png')} />
                                        <span class={styles.likes_amount}>{like.like_count}</span>
                                    </div>
                                    <div class={styles.comments}>
                                        <img class={styles.comments_icon} src={require('@/assets/forum/comment.png')} />
                                        <span class={styles.comments_amount}>{like.comment_count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            })}
        </div>
    )
}

export default UserLikes
