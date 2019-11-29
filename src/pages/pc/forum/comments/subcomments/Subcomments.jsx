import React from 'react'
import {PostConsumer} from '@/pages/pc/forum/postPage/PostContext'
import store from '@/store/store'
import styles from './Subcomments.module.css'

function Subcomments(comment) {
    const loginInfo = store.getState('forum').forumData.userInfo.username
    
    return (
        <PostConsumer>
            {(info) => {
                return <div className={styles.subcomments_content} id="subcomments">
                    {comment.comment.comment.subcomments && (comment.comment.comment.subcomments).map((subcomment, index) => {
                        const removeSubcomment = () => {
                            info.removeSubcomment(subcomment.id)
                        }
                        return <React.Fragment key={subcomment.id} >
                            <div className={styles.subcomment_item}>
                                <div className={styles.subcomment_profile_img_holder}>
                                    <img className={styles.profile_img} src={subcomment.author_pic} onerror="this.src='{% static 'default_files/none_user.png' %}'" />
                                    {subcomment.author_badge && <img className={styles.profile_verif_img} src={subcomment.author_badge} />}
                                </div>
                                <div className={styles.subcomment_content}>
                                    <a href="">
                                        <span className={styles.subcomment_author}>{subcomment.author_name}</span>
                                    </a>
                                    <p>{subcomment.text}</p>
                                </div>
                                <div className={styles.subcomment_likes_row}>
                                    {loginInfo && loginInfo === subcomment.author_name && <button className={styles.remove_subcomment} onClick={removeSubcomment}>
                                        <img src={require("@/assets/forum/delete.png")} className={styles.comment_delete_icon} />
                                        <span className={styles.comment_delete_text}>删除</span>
                                    </button>}
                                    {loginInfo && loginInfo !== subcomment.author_name && <button className={styles.subcomment_reply_button} reply_to={subcomment.author_name} reply_tag="subcomment_{{forloop.counter}}_reply" onClick={comment.comment.addSubcomment} >
                                        <img src={require("@/assets/forum/comment/comment-reply.png")} className={styles.comment_reply_icon} />
                                        <span className={styles.comment_reply_text} >回复</span>
                                    </button>}
                                    {loginInfo && subcomment && subcomment.isLiked && <button className={styles.subcomment_like} parentindex={comment.comment.index} index={index} id={subcomment.id} onClick={comment.comment.addSubcommentLike} >
                                        <img src={require("@/assets/forum/comment/comment-like-pressed.png")} className={styles.comment_like_icon} />
                                        <span className={`${styles.subcomment_likes} ${styles.liked}`} id="">{subcomment.like_count}</span>
                                    </button>}
                                    {loginInfo && subcomment && !subcomment.isLiked && <button className={styles.subcomment_like} parentindex={comment.comment.index} index={index} id={subcomment.id} onClick={comment.comment.addSubcommentLike} >
                                        <img src={require("@/assets/forum/comment/comment-like.png")} className={styles.comment_like_icon} />
                                        <span className={styles.subcomment_likes} id="">{subcomment.like_count}</span>
                                    </button>}
                                    {!loginInfo && <a href="">
                                        <button className={styles.subcomment_reply_button} reply_to={subcomment.author_name} reply_tag="subcomment_{{forloop.counter}}_reply">
                                            <img src={require("@/assets/forum/comment/comment-reply.png")} className={styles.comment_reply_icon} />
                                            <span className={styles.comment_reply_text}>回复</span>
                                        </button>
                                    </a>}
                                    {!loginInfo && <a href="">
                                        <button type="button" className={styles.subcomment_like} data-url="{% url 'forum:subcomment_like' pk=subcomment.pk %}" index="{{forloop.counter}}" parent_index="{{forloop.parentloop.counter}}">
                                            <img src={require("@/assets/forum/comment/comment-like.png")} className={styles.comment_like_icon} data-url="{% url 'forum:subcomment_check_like' pk=subcomment.pk %}" />
                                            <span className={styles.subcomment_likes} id="">{subcomment.like_count}</span>
                                        </button>
                                    </a>}
                                </div>
                            </div>
                        
                            {comment.comment.subcommentCount > 3 && !info.commentPage && <button className={styles.more_subcomments}>
                                <a href="">查看更多评论<span className={styles.open_icon}></span></a>
                            </button>}
                        </React.Fragment>
                    })}
                </div>
            }}
        </PostConsumer>
    )
}

export default Subcomments
