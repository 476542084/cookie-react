import React from 'react'
import styles from './TopicPosts.module.css'
import Post from '../post/Post'

function Posts(props) {
    const posts = []
    const cols = 4
    for (let i = 0; i < cols; i++) {
        for (let j = i; j < props.posts.length; j += cols) {
            posts.push(props.posts[j])
        }
    }


    return (
        <div className={styles.posts_container}>
            {posts.map((post) => {
                return <Post post={post} key={post.id} />
            })}
        </div>
    )
}

export default Posts


