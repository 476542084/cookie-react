import React, { Component } from 'react'
import { getIndexFeatured } from '@/api/getData'
import { parseContent } from '@/components/common/parseContent'
import styles from './IndexFeatured.module.css'

export class IndexFeatured extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts: [],
            slideIndex: 0,
            slidePosts: [],
        }
    }


    componentDidMount = () => {
        this.storeFeaturedPosts()
        this.getSlidePosts(this.state.slideIndex)
    }


    storeFeaturedPosts = async () => {
        try {
            const data = await getIndexFeatured()
            if (data.status === 200) {
                this.setState({posts: [...data]})
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    getSlidePosts = (n) => {
        let posts = []
        posts.push(this.getSlide(n - 1))
        posts.push(this.getSlide(n))
        posts.push(this.getSlide(n + 1))
    }


    getSlide = (n) => {
        if (n >= this.state.posts.length) {
            return this.state.posts[n % (this.state.posts.length - 1)]
        } else if (n < 0) {
            return this.state.posts[this.state.posts.length + n]
        } else {
            return this.state.posts[n]
        }
    }


    scrollSlides = (n) => {
        if (this.state.slideIndex === 0 && n === -1) {
            this.getSlidePosts(this.state.posts.length - 1)
            this.setState((prevState) => ({slideIndex: prevState.posts.length - 1}))
        } else if (this.state.slideIndex === this.state.posts.length - 1 && n === 1) {
            this.getSlidePosts(0)
            this.setState({slideIndex: 0})
        } else {
            this.getSlidePosts(this.state.slideIndex + n)
            this.setState((prevState) => ({slideIndex: prevState.slideIndex + n}))
        }
    }


    nextSlide = () => {
        this.scrollSlides(1)
    }


    prevSlide = () => {
        this.scrollSlides(-1)
    }


    render() {
        return (
            <div className={styles.page_container}>
                <div className={styles.featured_post_scroll_container}>
                    <div className={styles.featured_post_container} >
                        {this.state.posts.map((post, index) => {
                            var content = post ? (post.content.length > 160 ? post.content.slice(0, 160) + '...':post.content):null
                            content = parseContent(content)
                            return (index === 0 && this.state.slideIndex === this.state.posts.length - 1 && <div className={styles.featured_post_holder} key={index} style={{transform: `translateX(100%)`, visibility: 'hidden'}} >
                                <div className={styles.featured_post_content}>
                                    <span className={styles.featured_post_title}>{post.title}</span>
                                    <span className={styles.featured_post_text} dangerouslySetInnerHTML={content}></span>
                                    <a href={`#/post/${post.id}`}>
                                        <button className={styles.featured_post_enter}>立即查看</button>
                                    </a>
                                </div>
                                <a href={`#/post/${post.id}`} className={styles.post_link}>
                                    <div className={styles.featured_post_image_holder}>
                                        { post.cover_image && <img className={styles.featured_post_image} src={post.cover_image} alt=""/> }
                                        { !post.cover_image && <img className={styles.featured_post_image} src={require('@/assets/shared/no-image.jpg')} alt=""/> }
                                    </div>
                                </a>
                            </div>) || 
                            (index === this.state.posts.length - 1 && this.state.slideIndex === 0 && <div className={styles.featured_post_holder} key={index} style={{transform: `translateX(-${this.state.posts.length * 100}%)`, visibility: 'hidden'}} >
                                <div className={styles.featured_post_content}>
                                    <span className={styles.featured_post_title}>{post.title}</span>
                                    <span className={styles.featured_post_text} dangerouslySetInnerHTML={content}></span>
                                    <a href={`#/post/${post.id}`}>
                                        <button className={styles.featured_post_enter}>立即查看</button>
                                    </a>
                                </div>
                                <a href={`#/post/${post.id}`} className={styles.post_link}>
                                    <div className={styles.featured_post_image_holder}>
                                        { post.cover_image && <img className={styles.featured_post_image} src={post.cover_image} alt=""/> }
                                        { !post.cover_image && <img className={styles.featured_post_image} src={require('@/assets/shared/no-image.jpg')} alt=""/> }
                                    </div>
                                </a>
                            </div>) || 
                            ((index !== this.state.posts.length - 1 || this.state.slideIndex !== 0) && (index !== 0 || this.state.slideIndex !== this.state.posts.length - 1) && <div className={styles.featured_post_holder} key={index} style={{transform: `translateX(-${this.state.slideIndex * 100}%)`, visibility: index === this.state.slideIndex ? 'visible':'hidden'}} >
                                <div className={styles.featured_post_content}>
                                    <span className={styles.featured_post_title}>{post.title}</span>
                                    <span className={styles.featured_post_text} dangerouslySetInnerHTML={content}></span>
                                    <a href={`#/post/${post.id}`}>
                                        <button className={styles.featured_post_enter}>立即查看</button>
                                    </a>
                                </div>
                                <a href={`#/post/${post.id}`} className={styles.post_link}>
                                    <div className={styles.featured_post_image_holder}>
                                        { post.cover_image && <img className={styles.featured_post_image} src={post.cover_image} alt=""/> }
                                        { !post.cover_image && <img className={styles.featured_post_image} src={require('@/assets/shared/no-image.jpg')} alt=""/> }
                                    </div>
                                </a>
                            </div>)
                        })}
                    </div>
                    <img src={require('@/assets/shared/scroll-left.png')} alt="" className={styles.scroll_left} onClick={this.prevSlide} />
                    <img src={require('@/assets/shared/scroll-right.png')} alt="" className={styles.scroll_right} onClick={this.nextSlide} />
                </div>
            </div>
        )
    }
}

export default IndexFeatured

