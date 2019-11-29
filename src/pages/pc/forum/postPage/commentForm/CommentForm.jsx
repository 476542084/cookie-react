import React, { Component } from 'react'
import {PostConsumer} from '@/pages/pc/forum/postPage/PostContext'
import store from '@/store/store'
import styles from './CommentForm.module.css'

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: '',
            commentPics: [],
            commentPicsURL: [],
        }
    }


    commentInput = (e) => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value})
    }


    addCommentImage = async (e) => {
        let imageFiles = e.currentTarget.files
        let commentPics = []
        let commentPicsURL = []
        for (let i = 0; i < imageFiles.length; i++) {
            const imageURL = this.getObjectUrl(imageFiles[i])
            commentPicsURL.push(imageURL)
            commentPics.push(imageFiles[i])
        }
        this.setState({
            commentPics: commentPics,
            commentPicsURL: commentPicsURL
        })
    }


    getObjectUrl = (file) => {
        let url = null
        if (window.createObjectURL) {
            url = window.createObjectURL(file)
        } else if (window.URL) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    }


    render() {
        const loginInfo = store.getState('forum').forumData.token
        return (
            <PostConsumer>
                {(props) => {
                    const addComment = (e) => {
                        e.preventDefault()
                        if (this.state.comment.length > 0 || this.state.commentPics.length > 0) {
                            props.addComment(this.state.comment, this.state.commentPics)
                        }
                        this.setState({comment: ''})
                    }

                    return <div className={styles.comment_form_container} id={styles.comment_form_container}>
                        {props.post && <span className={styles.comment_header}>文章评论 ({props.post.comment_count})</span>}
                        {loginInfo && <form className={styles.comment_form} id={styles.comment_form} onSubmit={addComment} encType="multipart/form-data" method="POST">
                            <textarea name="text" id='comment' className={styles.comment_input} placeholder="评论最多可评论200字" onChange={this.commentInput} value={this.state.comment}></textarea>
                            <div id={styles.comment_img_show} className={styles.row}>
                                {this.state.commentPicsURL.map((commentPic, index) => {
                                    return <img src={commentPic} key={index} />
                                })}
                            </div>
                            <div className={styles.comment}>
                                <label className={styles.comment_add_img} htmlFor={styles.comment_img_field}><img src={require("@/assets/forum/comment_form/upload-img.png")} /></label>
                                <input id={styles.comment_img_field} name="comment_img_input" type="file" accept="image/png, image/jpeg, image/pjpeg, image/gif" multiple max-uploads="6" onChange={this.addCommentImage} />
                                <span className={styles.max_comment_images}>最多只可上传6张图</span>
                                <button className={styles.comment_submit} type="submit">发表</button>
                            </div>
                        </form>}
                        {!loginInfo && <div id={styles.fake_comment_form} className={styles.comment_form}>
                            <textarea placeholder="请先登录之后再添加评论" disabled className={styles.comment_input}></textarea>
                            <div className={styles.comment}>
                                <label className={styles.comment_add_img} htmlFor={styles.comment_img_field}><img src={require("@/assets/forum/comment_form/upload-img.png")} /></label>
                                <input id={styles.comment_img_field} name="comment_img_input" type="file" accept="image/png, image/jpeg, image/pjpeg, image/gif" multiple max-uploads="6" disabled/>
                                <button type="button" className={styles.comment_submit} type="submit">发表</button>
                            </div>
                        </div>}
                    </div>
                }}
            </PostConsumer>
        )
    }
}

export default CommentForm

