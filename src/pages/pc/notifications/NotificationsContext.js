import React from 'react'

const NotificationsContext = React.createContext()

const NotificationsProvider = NotificationsContext.Provider
const NotificationsConsumer = NotificationsContext.Consumer

export { NotificationsProvider, NotificationsConsumer }