import React, { Component } from 'react'
import { PostConsumer } from '@/pages/pc/forum/postPage/PostContext'
import SubcommentForm from '../subcommentForm/SubcommentForm'
import Subcomments from '../subcomments/Subcomments'
import store from '@/store/store'
import { timeSince } from '@/components/common/timeSince'
import styles from './Comment.module.css'

class Comment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            subcomment: false,
            subcommentUser: '',
        }
    }


    addSubcomment = (e) => {
        this.setState({
            subcomment: true,
            subcommentUser: e.currentTarget.getAttribute('reply_to')
        })
    }


    closeSubcomment = () => {
        this.setState({subcomment: false})
    }


    removeComment = () => {
        const commentId = this.props.comment.id
        this.props.removeComment(commentId)
    }
    

    render() {
        const loginInfo = store.getState('forum').forumData.userInfo.username

        const commentProps = {
            comment: this.props.comment,
            addSubcomment: this.addSubcomment,
            index: this.props.index,
            addSubcommentLike: this.props.addSubcommentLike,
            removeSubcomment: this.props.removeSubcomment,
        }

        const createdDate = timeSince(this.props.comment.created_date)
        return (
            <div id={`comment_${this.props.comment.id}`} className={styles.comment_item} key={`comment_${this.props.comment.id}`}>
                <div className={styles.comment_body}>
                    <div className={styles.comment_profile_img_holder}>
                        <img className={styles.profile_img} src={this.props.comment.author_pic} onerror="this.src='{% static 'default_files/none_user.png' %}'" />
                        {this.props.comment.author_badge && <img className={styles.profile_verif_img} src={this.props.comment.author_badge} />}
                    </div>
                    <div className={styles.comment_contents}>
                        <a href="" className={styles.comment_author_link}>
                            <span className={styles.comment_author}>{this.props.comment.author_name}</span>
                        </a>
                        <span className={styles.comment_time}>{createdDate}</span>
                        <p className={styles.comment_text}>{this.props.comment.text}</p>
                        <div className={styles.comment_image_holder}>
                            {this.props && this.props.comment.comment_images.map((commentImage) => {
                                return <img className={styles.comment_image} src={commentImage.img_url} onerror="this.src='{% static 'default_files/no_image.jpg' %}'" />
                            })} 
                        </div>
                        {loginInfo && <button className={styles.subcomment_button} id={this.props.comment.author} reply_to={this.props.comment.author_name} onClick={this.addSubcomment} >
                            <img src={require("@/assets/forum/comment/comment-reply.png")} className={styles.comment_reply_icon} />
                            {this.props.comment.subcomment_count > 0 && <span className={styles.comment_subcomments}>({this.props.comment.subcomment_count})</span>}
                            {this.props.comment.subcomment_count > 0 && <span className={styles.comment_reply_text}>条评论</span>}
                            {this.props.comment.subcomment_count === 0 && <span className={styles.comment_reply_text}>添加评论</span>}
                        </button>}
                        {!loginInfo && <a href="" className={styles.comment_reply_login}>
                            <button className={styles.subcomment_button_fake} reply_to={this.props.comment.author_name}>
                                <img src={require("@/assets/forum/comment/comment-reply.png")} className={styles.comment_reply_icon} />
                                {this.props.comment.subcomment_count > 0 && <span className={styles.comment_subcomments}>({this.props.comment.subcomment_count})</span>}
                                {this.props.comment.subcomment_count > 0 && <span className={styles.comment_reply_text}>条评论</span>}
                                {this.props.comment.subcomment_count === 0 && <span className={styles.comment_reply_text}>添加评论</span>}
                            </button>
                        </a>}
                        {loginInfo && loginInfo === this.props.comment.author_name && <button className={styles.remove_comment} onClick={this.removeComment}>
                            <img src={require("@/assets/forum/delete.png")} className={styles.comment_delete_icon} />
                            <span className={styles.comment_delete_text}>删除</span>
                        </button>}
                        {loginInfo && this.props.comment && this.props.comment.isLiked && <button type="button" className={styles.comment_like} index={this.props.index} id={this.props.comment.id} onClick={this.props.addCommentLike} >
                            <img src={require("@/assets/forum/comment/comment-like-pressed.png")} className={styles.comment_like_icon} data="{{ comment.pk }}" />
                            <span id="" className={`${styles.comment_like_amount} ${styles.liked}`}>{this.props.comment.like_count}</span>
                        </button>}
                        {loginInfo && this.props.comment && !this.props.comment.isLiked && <button type="button" className={styles.comment_like} index={this.props.index} id={this.props.comment.id} onClick={this.props.addCommentLike} >
                            <img src={require("@/assets/forum/comment/comment-like.png")} className={styles.comment_like_icon} data="{{ comment.pk }}" />
                            <span id="" className={styles.comment_like_amount}>{this.props.comment.like_count}</span>
                        </button>}
                        {!loginInfo && <a href="" className={styles.comment_like_login}>
                            <div className={styles.comment_like_fake}>
                            <img src={require("@/assets/forum/comment/comment-like.png")} className={styles.comment_like_icon} data="{{ comment.pk }}" />
                            <span id="" className={styles.comment_like_amount}>{this.props.comment.like_count}</span>
                            </div>
                        </a>}
                    </div>
                </div>
        
                {this.props.comment.subcomment_count > 0 && <Subcomments comment={commentProps} />}
        
                {this.state.subcomment && <SubcommentForm user={this.state.subcommentUser} comment={this.props.comment} closeSubcomment={this.closeSubcomment} addSubcomment={this.props.addSubcomment} />}
            </div>
        )
    }
}

export default Comment
