import React, { Component } from 'react'
import Comment from '../comments/comment/Comment'
import { like, commentIsLiked, subcommentIsLiked, createSubcomment, deleteComment, deleteSubcomment, getComment, getCommentSubcomments } from '@/api/getData'
import { PostProvider } from '../postPage/PostContext'
import store from '@/store/store'
import styles from './CommentPage.module.css'

class CommentPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            page: 1
        }
    }
    

    componentDidMount = async () => {
        await this.getComment()
        await this.getCommentSubcomments()
        document.addEventListener('scroll', this.trackScroll)
    }


    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.trackScroll)
    }


    addCommentLike = async (e) => {
        try {
            if (this.state.comment.isLiked) {
                return
            }
            const commentId = e.currentTarget.id
            const data = await like(commentId, 2)
            if (data.status === 201) {
                this.setState((prevState) => ({
                    comment: {
                        ...prevState.comment,
                        like_count: prevState.comment.like_count + 1,
                        isLiked: true,
                    }
                }))
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('add comment like error')
        }
    }


    addSubcommentLike = async (e) => {
        try {
            const subcommentIndex = e.currentTarget.getAttribute('index')
            const subcommentId = e.currentTarget.id
            if (this.state.comment.subcomments[subcommentIndex].isLiked) {
                return
            }
            const newSubcomment = {
                ...this.state.comment.subcomments[subcommentIndex],
                like_count: this.state.comment.subcomments[subcommentIndex].like_count + 1,
                isLiked: true,
            }
            const subcomments = this.state.comment.subcomments
            subcomments[subcommentIndex] = newSubcomment
            const data = await like(subcommentId, 3)
            console.log(data)
            if (data.status === 201) {
                this.setState((prevState) => ({
                    comment: {
                        ...prevState.comment,
                        subcomments: subcomments,
                    }
                }))
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('add subcomment like error')
        } 
    }


    commentIsLiked = async () => {
        try {
            const data = await commentIsLiked(this.state.comment.id)
            if (data.status === 200) {
                this.setState((prevState) => ({
                    comment: {
                        ...prevState.comment,
                        isLiked: data.is_liked,
                    }
                }))
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('add like error')
        }
    }


    subcommentIsLiked = async () => {
        try {
            const newSubcomments = []
            for (let j = 0; j < this.state.comment.subcomments.length; j++) {
                const newSubcomment = this.state.comment.subcomments[j]
                const data = await subcommentIsLiked(newSubcomment.id)
                if (data.status === 200) {
                    newSubcomment.isLiked = data.is_liked
                    newSubcomments.push(newSubcomment)
                } else {
                    console.log(data.msg)
                }
            }
            this.setState((prevState) => ({
                comment: {
                    ...prevState.comment,
                    subcomments: newSubcomments
                }
            }))
        }
        catch {
            console.log('add like error')
        }
    }


    addSubcomment = async (commentId, comment) => {
        try {
            const data = await createSubcomment(commentId, comment)
            if (data.status === 201) {
                this.getCommentSubcomments()
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('add subcomment error')
        }
    }


    removeComment = async (id) => {
        try {
            const data = await deleteComment(id)
            if (data.status === 204 || data.status === 200) {
                window.history.go(-1)
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('delete comment error')
        }
    }


    removeSubcomment = async (id) => {
        try {
            const data = await deleteSubcomment(id)
            if (data.status === 204 || data.status === 200) {
                this.getCommentSubcomments()
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('delete comment error')
        }
    }


    getComment = async () => {
        try {
            const commentId = window.location.href.split('/')[window.location.href.split('/').indexOf('comment') + 1]
            const data = await getComment(commentId)
            if (data.status === 200) {
                this.setState({comment: data})
                if (store.getState('forum').forumData.token) {
                    await this.commentIsLiked()
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('get comment error')
        }
    }


    getCommentSubcomments = async () => {
        try {
            const commentId = this.state.comment.id
            const data = await getCommentSubcomments(commentId, this.state.page)
            if (data.status === 200) {
                if (this.state.page === 1) {
                    this.setState((prevState) => ({
                        comment: {
                            ...prevState.comment,
                            next: data.next,
                            subcomments: data.results,
                        }
                    }))
                    if (store.getState('forum').forumData.token) {
                        await this.subcommentIsLiked()
                    }
                } else if (this.state.page > 1) {
                    const subcomments = this.state.comment.subcomments
                    subcomments.push(...data.subcomments)
                    this.setState((prevState) => ({
                        comment: {
                            ...prevState.comment,
                            next: data.next,
                            subcomments: subcomments,
                        }
                    }))
                    if (store.getState('forum').forumData.token) {
                        await this.subcommentIsLiked()
                    }
                }
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('get comment error')
        }
    }


    isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight
    }


    trackScroll = () => {
        const subcomments = document.getElementById('subcomments')
        if (this.isBottom(subcomments)) {
            if (this.state.comment.next) {
                this.setState((prevState) => ({
                    page: prevState.page + 1,
                }), () => {
                    this.getCommentSubcomments()
                })
            }
        }
    }


    render() {
        console.log(this.state)
        const comment = this.state ? this.state.comment : null
        const methods = {
            removeComment: this.removeComment,
            removeSubcomment: this.removeSubcomment,
        }
        return (
            <PostProvider value={{commentPage: true, ...methods}} >
                <div className={styles.page_container} value={methods}>
                    {comment && <Comment key={comment.id} index={comment.id} comment={comment} addCommentLike={this.addCommentLike} addSubcommentLike={this.addSubcommentLike} addSubcomment={this.addSubcomment} removeComment={this.removeComment} />}
                </div>
            </PostProvider>
        )
    }
}

export default CommentPage

