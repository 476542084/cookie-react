import React from 'react'
import styles from './ForumHeader.module.css'

function ForumHeader(props) {
    return (
        <div className={`${styles.topics} ${styles.header_holder}`}>
            <span className={styles.topics_header}>{props.value}</span>
        </div>
    )
}

export default ForumHeader
