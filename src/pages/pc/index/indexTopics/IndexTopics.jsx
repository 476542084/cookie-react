import React from 'react'
import styles from './IndexTopics.module.css'

function IndexTopics(props) {
    const topics = props.topics

    return (
        <div className={styles.topics_container}>
            <div className={styles.topic_small}>
                <a href="#/topics/5">
                    <img src={require('@/assets/forum/topic_pics/ShiZhuang.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[0].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[0].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_large}>
                <a href="#/topics/4">
                    <img src={require('@/assets/forum/topic_pics/GaoJie.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[1].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[1].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_large}>
                <a href="#/topics/6">
                    <img src={require('@/assets/forum/topic_pics/MeiShiJieTou.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[2].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[2].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_small}>
                <a href="#/topics/7">
                    <img src={require('@/assets/forum/topic_pics/AnHeiXianFeng.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[3].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[3].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_large}>
                <a href="#/topics/8">
                    <img src={require('@/assets/forum/topic_pics/RiXi.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[4].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[4].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_small}>
                <a href="#/topics/3">
                    <img src={require('@/assets/forum/topic_pics/GuoChao.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[5].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[5].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_small}>
                <a href="#/topics/2">
                    <img src={require('@/assets/forum/topic_pics/YuanChuang.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[6].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[6].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_small}>
                <a href="#/topics/1">
                    <img src={require('@/assets/forum/topic_pics/BingGanZha.jpg')} alt="" className={styles.topic_image_small}/>
                    <div className={styles.topic_text}>
                        {topics.length && <span className={styles.topic_title}>{topics[7].title}</span>}
                        {topics.length && <span className={styles.topic_description}>{topics[7].description}</span>}
                    </div>
                </a>
            </div>
            <div className={styles.topic_coming}>
                <a href="#/topics/all">
                    <img src={require('@/assets/forum/topic_pics/QuanBuReTie.jpg')} alt="" className={styles.topic_coming_image}/>
                    <span className={styles.topic_coming_text}>全部热帖</span>
                </a>
            </div>
        </div>  
    )
}

export default IndexTopics
