import React from 'react'
import styles from './Scrollbar.module.css'

function Scrollbar(props) {
    return (
        <div className={styles.scroll_container}>
            {props.page > 1 && <span className={styles.prev} onClick={props.methods.prevPage} >
                <img src={require('@/assets/shared/scroll-left.png')} className={styles.scroll_left} id={styles.scroll_left} />
            </span>} 
            {props.page === 1 && <span className={`${styles.disabled} ${styles.prev}`}>
                <img src={require('@/assets/shared/scroll-left.png')} className={styles.scroll_left} id={styles.scroll_left} />
            </span>
            }
            <span className={`${styles.page} ${styles.first}`} onClick={props.methods.firstPage} >1</span>
            <span className={styles.scroll_dot_link} onClick={props.methods.previousSkipPage}><img src={require('@/assets/shared/scroll-dot.png')} className={styles.scroll_dot} /></span>
            <span className={styles.scroll_dot_link} onClick={props.methods.prevPage}><img src={require('@/assets/shared/scroll-dot.png')} className={styles.scroll_dot} /></span>
            <span className={`${styles.current} ${styles.page}`}>{props.page}</span>
            <span className={styles.scroll_dot_link} onClick={props.methods.nextPage}><img src={require('@/assets/shared/scroll-dot.png')} className={styles.scroll_dot} /></span>
            <span className={styles.scroll_dot_link} onClick={props.methods.nextSkipPage}><img src={require('@/assets/shared/scroll-dot.png')} className={styles.scroll_dot} /></span>
            <span className={`${styles.page} ${styles.last}`} onClick={props.methods.lastPage} >{props.pages}</span>
            {props.page < props.pages && <span className={styles.next} onClick={props.methods.nextPage} >
                <img src={require('@/assets/shared/scroll-right.png')} className={styles.scroll_right} id={styles.scroll_right} />
            </span>}
            {props.page === props.pages && <span className={`${styles.disabled} ${styles.next}`}>
                <img src={require('@/assets/shared/scroll-right.png')} className={styles.scroll_right} id={styles.scroll_right} />
            </span>}
        </div>
    )
}

export default Scrollbar
