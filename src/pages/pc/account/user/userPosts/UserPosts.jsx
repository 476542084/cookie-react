import React, {useState, useEffect} from 'react'
import Post from '@/pages/pc/forum/post/Post'
import styles from './UserPosts.module.css'


function UserPosts(content) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', handleWindowWidth)

        return () => {
            window.removeEventListener('resize', handleWindowWidth)
        }
    })

    const handleWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    return (
        <section className={styles.posts_container}>
            {content.content && content.content.map((post) => {
                return <Post post={post} />
            })}
        </section>
    )
}

export default UserPosts
