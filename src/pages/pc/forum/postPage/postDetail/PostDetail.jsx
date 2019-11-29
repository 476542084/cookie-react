import React from 'react'
import styles from './PostDetail.module.css'
import PostInfo from './postInfo/PostInfo'
import PostText from './postText/PostText'


function postDetail(props) {
    return (
        <div className={styles.post_container}>
            <PostInfo />
            <PostText />
        </div>
    )
}

export default postDetail
