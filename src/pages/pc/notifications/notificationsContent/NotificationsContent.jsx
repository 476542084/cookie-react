import React from 'react'
import { NotificationsConsumer } from '../NotificationsContext'
import NotificationsReplies from './notificationsReplies/NotificationsReplies'
import NotificationsFollows from './notificationsFollows/NotificationsFollows'
import NotificationsLikes from './notificationsLikes/NotificationsLikes'
import NotificationsMessages from './notificationsMessages/NotificationsMessages'
import styles from './NotificationsContent.module.css'

function NotificationsContent() {
    return (
        <NotificationsConsumer>
            {(props) => {
                return <div className={`${styles.notifications_content} hide-scrollbar`}>
                    {props.state.tabs.replies && <NotificationsReplies content={[1, 2]} />}
                    {props.state.tabs.follows && <NotificationsFollows content={[1, 2]} />}
                    {props.state.tabs.likes && <NotificationsLikes content={[1, 2]} />}
                    {props.state.tabs.messages && <NotificationsMessages content={[1, 2]} />}
                </div>
            }}
        </NotificationsConsumer>
    )
}

export default NotificationsContent
