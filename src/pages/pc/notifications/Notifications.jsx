import React, { Component } from 'react'
import NotificationsContent from './notificationsContent/NotificationsContent'
import NotificationsTabs from './notificationsTabs/NotificationsTabs'
import { NotificationsProvider } from './NotificationsContext'
import styles from './Notifications.module.css'

class Notifications extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tabs: {
                replies: true,
            }
        }
    }


    showTab = (e) => {
        this.setState({tabs:{[e.currentTarget.id]: true}})
    }


    storeUserInfo = async () => {

    }
    

    render() {
        return (
            <NotificationsProvider value={{state:this.state, showTab:this.showTab}} >
                <div className="page_container" >
                    <div className={styles.notifications_container}>
                        <NotificationsContent />
                        <NotificationsTabs />
                    </div>
                </div>
            </NotificationsProvider>
        )
    }
}

export default Notifications