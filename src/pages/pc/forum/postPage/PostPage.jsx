import React, { Component } from 'react'
import PostDetail from './postDetail/PostDetail'
import CommentForm from './commentForm/CommentForm'
import Comments from '../comments/Comments'
import { PostProvider } from '@/pages/pc/forum/postPage/PostContext'
import { getPostDetail, getPostComments, like, postIsLiked, commentIsLiked, subcommentIsLiked, createComment, createSubcomment, deleteComment, deleteSubcomment, checkUserFollowed, userFollow, userUnfollow } from '@/api/getData'
import { compressImage, canvasToBlob } from '@/utils/commons'
import store from '@/store/store'

class PostPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            page: 1,
        }

        this.commentRef = React.createRef()
    }


    componentDidMount = () => {
        this.storePostData()
        this.storePostComments()
        document.addEventListener('scroll', this.trackScroll)
    }


    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.trackScroll)
    }


    checkAuthorFollowed = async () => {
        const userId = store.getState('forum').forumData.userInfo.userId
        const authorId = this.state.postDetail.author_id
        if (userId && userId !== authorId) {
            try {
                const data = await checkUserFollowed(authorId)
                if (data.status === 200) {
                    this.setState((prevState) => ({
                        postDetail: {
                            ...prevState.postDetail,
                            authorFollowed: data.connection,
                        }
                    }))
                } else {
                    console.log(data.msg)
                }
            }
            catch {
                console.log('check user followed error')
            }
        }
    }


    authorFollow = async () => {
        const userId = store.getState('forum').forumData.userInfo.userId
        const authorId = this.state.postDetail.author_id
        if (userId) {
            try {
                const data = await userFollow(authorId)
                if (data.status === 201) {
                    if (data.followee === authorId) {
                        this.setState((prevState) => ({
                            postDetail: {
                                ...prevState.postDetail,
                                authorFollowed: prevState.postDetail.authorFollowed === '关注' ? '已关注' : '互相关注',
                            }
                        }))
                    }
                } else {
                    console.log(data.msg)
                }
            }
            catch {
                console.log('author follow error')
            }
        }
    }


    authorUnfollow = async () => {
        const userId = store.getState('forum').forumData.userInfo.userId
        const authorId = this.state.postDetail.author_id
        if (userId) {
            try {
                const data = await userUnfollow(authorId)
                if (data.status === 200) {
                    this.setState((prevState) => ({
                        postDetail: {
                            ...prevState.postDetail,
                            authorFollowed: prevState.postDetail.authorFollowed === '已关注' ? '关注' : '回粉',
                        }
                    }))
                } else {
                    console.log(data.msg)
                }
            }
            catch {
                console.log('author follow error')
            }
        }
    }


    addPostLike = () => {
        this.setState((prevState) => ({
            postDetail: {
                ...prevState.postDetail,
                like_count: prevState.postDetail.like_count + 1,
                isLiked: true,
            }
        }), () => {
            like(this.state.postDetail.id, 1)
        })
    }


    addCommentLike = async (e) => {
        try {
            const commentIndex = e.currentTarget.getAttribute('index')
            const commentId = e.currentTarget.id
            if (this.state.postComments.results[commentIndex].isLiked) {
                return
            }
            const newComment = {
                ...this.state.postComments.results[commentIndex],
                like_count: this.state.postComments.results[commentIndex].like_count + 1,
                isLiked: true,
            }
            const comments = this.state.postComments.results
            comments[commentIndex] = newComment
            const data = await like(commentId, 2)
            if (data.status === 200) {
                this.setState((prevState) => ({
                    postComments: {
                        ...prevState.postComments,
                        results: comments,
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
            const parentindex = e.currentTarget.getAttribute('parentindex')
            if (this.state.postComments.results[parentindex].subcomments[subcommentIndex].isLiked) {
                return
            }
            const newSubcomment = {
                ...this.state.postComments.results[parentindex].subcomments[subcommentIndex],
                like_count: this.state.postComments.results[parentindex].subcomments[subcommentIndex].like_count + 1
            }
            const subcomments = this.state.postComments.results[parentindex].subcomments
            const comments = this.state.postComments.results
            const newComment = this.state.postComments.results[parentindex]
            subcomments[subcommentIndex] = newSubcomment
            newComment.subcomments = subcomments
            comments[parentindex] = newComment
            const data = await like(subcommentId, 3)
            if (data.status === 200) {
                this.setState((prevState) => ({
                    postComments: {
                        ...prevState.postComments,
                        results: comments,
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


    postIsLiked = async () => {
        try {
            const postId = window.location.href.split('/')[window.location.href.split('/').indexOf('post') + 1]
            const data = await postIsLiked(postId)
            if (data.status === 200) {
                this.setState((prevState) => ({
                    postDetail: {
                        ...prevState.postDetail,
                        isLiked: data.is_liked,
                    }
                }))
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('get data error')
        }
    }


    commentIsLiked = async () => {
        try {
            const newResults = []
            for (let i = 0; i < this.state.postComments.results.length; i++) {
                const newComment = this.state.postComments.results[i]
                const data = await commentIsLiked(newComment.id)
                if (data.status === 200) {
                    newComment.isLiked = data.is_liked
                    newResults.push(newComment)
                } else {
                    console.log(data.msg)
                }
            }
            this.setState((prevState) => ({
                postComments: {
                    ...prevState.postComments,
                    results: newResults
                }
            }))
        }
        catch {
            console.log('add like error')
        }
    }


    subcommentIsLiked = async () => {
        try {
            const newResults = []
            for (let i = 0; i < this.state.postComments.results.length; i++) {
                const newSubcomments = []
                const newComment = this.state.postComments.results[i]
                for (let j = 0; j < newComment.subcomments.length; j++) {
                    const newSubcomment = newComment.subcomments[j]
                    const data = await subcommentIsLiked(newSubcomment.id)
                    if (data.status === 200) {
                        newSubcomment.isLiked = data.is_liked
                        newSubcomments.push(newSubcomment)
                    } else {
                        console.log(data.msg)
                    }
                }
                newComment.subcomments = newSubcomments
                newResults.push(newComment)
            }
            this.setState((prevState) => ({
                postComments: {
                    ...prevState.postComments,
                    results: newResults
                }
            }))
        }
        catch {
            console.log('add like error')
        }
    }


    addComment = async (comment, commentPics) => {
        try {
            var formData = new FormData()
            if (commentPics.length > 0) {
                // var compressedPics = []
                for (let i = 0; i < commentPics.length; i++) {
                    // await compressImage(commentPics[i], 1200, 1200, 0.95).then(canvasToBlob).then((afterFile) => {
                    //     formData.append('image', afterFile)
                    //     compressedPics.push(formData)
                    // })
                    formData.append('images', commentPics[i])
                }
            }
            formData.append('post', this.state.postDetail.id)
            formData.append('text', comment)
            const data = await createComment(formData)
            if (data.status === 201) {
                this.storePostComments()
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('add comment error')
        }
    }


    addSubcomment = async (commentId, comment) => {
        try {
            const data = await createSubcomment(commentId, comment)
            if (data.status === 201) {
                this.storePostComments()
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('add subcomment error')
        }
    }


    storePostData = async () => {
        try {
            const postId = window.location.href.split('/')[window.location.href.split('/').indexOf('post') + 1]
            const data = await getPostDetail(postId)
            if (data.status === 200) {
                this.setState({postDetail: data})
                this.postIsLiked()
                this.checkAuthorFollowed()
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('get data error')
        } 
    }


    storePostComments = async () => {
        try {
            const postId = window.location.href.split('/')[window.location.href.split('/').indexOf('post') + 1]
            const data = await getPostComments(postId, this.state.page)
            if (data) {
                if (data.status === 200) {
                    if (this.state.page === 1) {
                        this.setState({postComments: data})
                        if (store.getState('forum').forumData.token) {
                            this.commentIsLiked()
                            this.subcommentIsLiked()
                        }
                    } else if (this.state.page > 1) {
                        const comments = this.state.postComments.results
                        comments.push(...data.results)
                        this.setState({
                            postComments: {
                                ...data,
                                results: comments,
                            }
                        })
                        if (store.getState('forum').forumData.token) {
                            this.commentIsLiked()
                            this.subcommentIsLiked()
                        }
                    }
                } else {
                    console.log(data.msg)
                }
            }
        }
        catch {
            console.log('get data error')
        } 
    }


    isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight
    }


    trackScroll = () => {
        const comments = document.getElementById('comments')
        if (this.isBottom(comments)) {
            if (this.state.postComments && this.state.postComments.next) {
                this.setState((prevState) => ({
                    page: prevState.page + 1
                }), () => {
                    this.storePostComments()
                })
            }
        }
    }


    removeComment = async (id) => {
        try {
            const data = await deleteComment(id)
            if (data.status === 204 || data.status === 200) {
                this.storePostComments()
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
                this.storePostComments()
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('delete comment error')
        }
    }
    

    render() {
        const methods = {
            addPostLike: this.addPostLike, 
            comments: this.state.postComments, 
            addCommentLike:this.addCommentLike, 
            addSubcommentLike:this.addSubcommentLike, 
            addComment: this.addComment, 
            addSubcomment: this.addSubcomment,
            removeComment: this.removeComment,
            removeSubcomment: this.removeSubcomment,
            authorFollow: this.authorFollow,
            authorUnfollow: this.authorUnfollow,
        }
        console.log(this.state)
        return (
            <div className='page_container'>
                <PostProvider value={{post:this.state.postDetail, ...methods}} >
                    <PostDetail />
                    <CommentForm />
                    <Comments ref={this.commentRef} />
                </PostProvider>
            </div>
        )
    }
}

export default PostPage

