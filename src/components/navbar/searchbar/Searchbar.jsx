import React from 'react'
import styles from './Searchbar.module.css'

function Searchbar(props) {
    if (props.open) {
        return <div className={styles.navbar_search_container} >
            <form method="GET" action="/search/posts/" className={styles.form_inline} id={styles.products_search_form}>
                <img src={require("@/assets/navbar/search-close.png")} className={styles.search_cancel} onClick={props.toggleSearchbar} />
                <input type="text" className={styles.form_control} id={styles.search_query}/>
                <button className={styles.btn}>
                    <img src={require("@/assets/navbar/search.png")} className={styles.search_icon} />
                </button>
            </form>
        </div>
    } else {
        return null
    }
}

export default Searchbar
