import React from 'react'
import styles from './UserRecommendations.module.css'

function UserRecommendations(content) {
    return (
        <div className={styles.recommendation_container}>
            <div className={styles.recommendation_content}>
                {content.content.map((recommendation) => {
                    return <div className={styles.recommendation_content_item}>
                        <div className={styles.recommendation_content_img_holder}>
                            <a href="">
                                <img src="" alt="" onerror="this.src='{% static 'default_files/no-image.jpg' %}'" />
                            </a>
                        </div>
                        <div className={styles.recommendation_content_item_detail}>
                            <div>
                            <a href="">
                                <p>{recommendation.name}</p>
                            </a>
                            <span className={styles.isWeb}></span>
                            </div>
                            <p>
                                <span></span>
                            </p>
                            <p>
                                <span>¥ </span>
                                <span className={styles.recommendation_delete} spu_id=""></span>
                            </p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default UserRecommendations
