import React from 'react'
import NotificationsTab from './notificationsTab/NotificationsTab'
import styles from './NotificationsTabs.module.css'

function NotificationsTabs() {
    return (
        <div className={styles.sidebar_container}>
            <div className={styles.sidebar_header_container}>
                <span className={styles.sidebar_header}>我的消息箱</span>
            </div>
            <ul className={styles.sidebar}>
                <NotificationsTab id="replies" title="回复我的" />
                <NotificationsTab id="follows" title="关注我的" />
                <NotificationsTab id="likes" title="点赞" />
                <NotificationsTab id="messages" title="@我的" />
            </ul>
        </div>
    )
}

export default NotificationsTabs

