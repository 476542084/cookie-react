import React, { Component } from 'react'
import { NotificationsConsumer } from '../../NotificationsContext'
import styles from './NotificationsTab.module.css'

export class NotificationsTab extends Component {
    render() {
        return (
            <NotificationsConsumer>
                {(props) => {
                    return <div className={styles.sidebar_item} id={this.props.id} onClick={props.showTab} >
                        {<img className={styles.new_notification} src="{% static 'default_files/notifications/new.png' %}" />}
                        <span className={styles.sidebar_title}>{this.props.title}</span>
                        <span className={styles.time_since}>几天前</span>
                    </div>
                }}
            </NotificationsConsumer>
        )
    }
}

export default NotificationsTab

