import React from 'react'
import styles from './TopicsList.module.css'

function TopicsList(props) {
    return (
        <div className={styles.topic_row}>
            <a href="#/topics/all"><button id='all' className={styles.topic_title} onClick={props.changeTopic}>全部热帖</button></a>
            <a href="#/topics/5"><button id='5' className={styles.topic_title} onClick={props.changeTopic}>时装</button></a>
            <a href="#/topics/4"><button id='4' className={styles.topic_title} onClick={props.changeTopic}>高街</button></a>
            <a href="#/topics/6"><button id='6' className={styles.topic_title} onClick={props.changeTopic}>美式街头</button></a>
            <a href="#/topics/7"><button id='7' className={styles.topic_title} onClick={props.changeTopic}>暗黑先锋</button></a>
            <a href="#/topics/8"><button id='8' className={styles.topic_title} onClick={props.changeTopic}>日系</button></a>
            <a href="#/topics/3"><button id='3' className={styles.topic_title} onClick={props.changeTopic}>国潮</button></a>
            <a href="#/topics/2"><button id='2' className={styles.topic_title} onClick={props.changeTopic}>原创</button></a>
            <a href="#/topics/1"><button id='1' className={styles.topic_title} onClick={props.changeTopic}>饼干渣</button></a>
        </div>
    )
}

export default TopicsList
