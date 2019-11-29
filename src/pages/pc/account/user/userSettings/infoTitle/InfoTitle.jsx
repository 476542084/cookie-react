import React from 'react'
import styles from './InfoTitle.module.css'


function InfoTitle(props) {
    return (
        <>
            <span className={styles.user_info_title}>{props.value}</span>
        </>
    )
}

export default InfoTitle
