import React from 'react'
import { PostConsumer } from '@/pages/pc/forum/postPage/PostContext'
import store from '@/store/store'
import { parseContent } from '@/components/common/parseContent'
import styles from './PostText.module.css'

function PostText() {
    const loginInfo = store.getState('forum').forumData.token

    return (
        <PostConsumer>
            {(props) => {
                const content = props.post ? parseContent(props.post.content):null
                return <div className={styles.post_text}>
                    <div className={styles.detail_post_text_container}>
                        {props.post && <span className={styles.detail_post_text} dangerouslySetInnerHTML={content} ></span>}
                        <div className={styles.post_likes_bottom}>
                            {loginInfo && props.post && props.post.isLiked && <button id={styles.like} className={styles.post_like_icon_large} type="button"></button>}   
                            {loginInfo && props.post && !props.post.isLiked && <button id={styles.like} className={styles.post_like_icon_large_empty} type="button" onClick={props.addPostLike}></button>}
                            {!loginInfo && <a href="#/account/login"><button id={styles.like} className={styles.post_like_icon_large_empty} type="button" data="{{ liked_post }}"></button></a>}
                            {props.post && <span className={styles.post_likes_amount}>{props.post.like_count}</span>}
                        </div>
                    </div>
                </div>
            }}
        </PostConsumer>
    )
}

export default PostText
