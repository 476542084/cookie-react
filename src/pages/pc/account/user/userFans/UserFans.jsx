import React from 'react'
import FanCard from '../fanCard/FanCard'
import styles from './UserFans.module.css'

function UserFans(content) {
    return (
        <div class={styles.user_fan_container}>
            {content.content && content.content.map((user) => {
                return <FanCard value={user} key={user.id} />
            })}
        </div>
    )
}

export default UserFans
