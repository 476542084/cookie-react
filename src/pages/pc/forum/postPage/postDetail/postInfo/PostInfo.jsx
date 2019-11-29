import React from 'react'
import {PostConsumer} from '@/pages/pc/forum/postPage/PostContext'
import store from '@/store/store'
import { timeSince } from '@/components/common/timeSince'
import styles from './PostInfo.module.css'

function PostInfo() {
    const loginInfo = store.getState('forum').forumData.userInfo.username
    return (
        <PostConsumer>
            {(props) => {
                const createdDate = props.post ? timeSince(props.post.published_date):null
                return <div className={styles.post_header}>
                    <div className={styles.post_info}>
                        <div className={styles.post_title}>
                            {props.post && <span>{props.post.title}</span>}
                            <u className={styles.share_post_detail}>分享</u>
                        </div>
                        <div className={styles.post_topic_row}>
                            {props.post && <span>来自 <a href="" className={styles.post_topic}>{props.post.topic_title}</a></span>}
                            {props.post && <span className={styles.post_created_time}>发布{createdDate}</span>}
                        </div>
                        <div className={styles.post_likes_row}>
                            <div className={styles.post_likes}>
                                <img src={require("@/assets/forum/like.png")} className={styles.post_like_icon} data="" />
                                {props.post && <span className={styles.num_likes}>{props.post.like_count}</span>}
                            </div>
                            <div className={styles.post_comments}>
                                <img src={require("@/assets/forum/comment.png")} className={styles.post_like_icon} data="" />
                                {props.post && <span className={styles.num_comments}>{props.post.comment_count}</span>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.post_author}>
                        <a href="">
                            {props.post && <img className={styles.author_img} src={props.post.author_pic} onerror="" />}
                        </a>
                        <div className={styles.author_info}>
                            <a href="">
                                {props.post && <span className={styles.author_username}>{props.post.author_name}</span>}
                            </a>
                            {props.post && props.post.author_badge && <img className={styles.author_badge} src={props.post.author_badge} />}
                        </div>
                        { loginInfo && props.post && loginInfo.user === props.post.author_name && <img className={styles.post_delete_icon} src={require("@/assets/forum/delete.png")} data_url="" /> }
                        { loginInfo && props.post && loginInfo.user !== props.post.author_name && props.post.authorFollowed === '已关注' && <button className={`${styles.author_follow} ${styles.followed}`} onClick={props.authorUnfollow}>{props.post.authorFollowed}</button> }
                        { loginInfo && props.post && loginInfo.user !== props.post.author_name && props.post.authorFollowed === '关注' && <button className={`${styles.author_follow} ${styles.non_followed}`} onClick={props.authorFollow}>{props.post.authorFollowed}</button> }
                        { loginInfo && props.post && loginInfo.user !== props.post.author_name && props.post.authorFollowed === '回粉' && <button className={`${styles.author_follow} ${styles.followback}`} onClick={props.authorFollow}>{props.post.authorFollowed}</button> }
                        { loginInfo && props.post && loginInfo.user !== props.post.author_name && props.post.authorFollowed === '互相关注' && <button className={`${styles.author_follow} ${styles.mutual}`} onClick={props.authorUnfollow}>{props.post.authorFollowed}</button> }
                        { !loginInfo && <a href="{ url 'account:user_login' }"><button className={styles.author_follow}>关注</button></a> }
                    </div>
                </div>
            }}
        </PostConsumer>
    )
}

export default PostInfo
