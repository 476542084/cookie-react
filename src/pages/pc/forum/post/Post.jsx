import React from 'react'
import { timeSince } from '@/components/common/timeSince'
import { parseContent } from '@/components/common/parseContent'
import styles from './Post.module.css'

function Post(props) {
    var content = props.post ? (props.post.content.length > 40 ? props.post.content.slice(0, 40) + '...':props.post.content):null
    content = parseContent(content)
    
    const createdDate = timeSince(props.post.published_date)

    return (
        <div className={styles.post_container}>
            <div className={styles.post_holder}>
                <a href={`#/post/${props.post.id}`}>
                    {props.post.stickTop && <span className={styles.stick_top}>置顶</span>}
                    <img src={props.post.cover_image} alt="" className={styles.post_img} />
                </a>
                <a href={`#/post/${props.post.id}`}>
                    <div className={styles.post_details}>
                        <p className={styles.post_title}>{props.post.title}</p>
                        <p className={styles.post_text} dangerouslySetInnerHTML={content}></p>
                        <div className={styles.post_info_row}>
                            <div className={styles.comment_likes_row}>
                                <div className={styles.post_likes}>
                                    <img src={require('@/assets/forum/like.png')} alt="" className={styles.post_likes_icon}/>
                                    <span className={styles.post_likes_amount}>{props.post.like_count}</span>
                                </div>
                                <div className={styles.post_comments}>
                                    <img src={require('@/assets/forum/comment.png')} alt="" className={styles.post_comments_icon}/>
                                    <span className={styles.post_comments_amount}>{props.post.comment_count}</span>
                                </div>
                            </div>
                            <span className={styles.post_topic}></span>
                        </div>
                        <div className={styles.post_author_row}>
                            <a href="">
                                <div className={styles.post_author_holder}>
                                    <img src={props.post.author_pic} alt="" className={styles.post_author_img} />
                                    <span className={styles.post_author_username}>{props.post.author_name}</span>
                                </div>
                            </a>
                            <span className={styles.post_created_time}>{createdDate}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Post
