import React, { Component } from 'react'
import { PostConsumer } from '@/pages/pc/forum/postPage/PostContext'
import styles from './Comments.module.css'
import Comment from './comment/Comment'
import Scrollbar from '@/components/common/scrollbar/Scrollbar'

class Comments extends Component {
    render() {
        return (
            <PostConsumer>
                {(props) => {
                    return <React.Fragment>
                        <div className={styles.comments_container} id='comments'>
                            {props.comments && props.comments.results.map((comment, index) => {
                                return <Comment key={comment.id} index={index} comment={comment} addCommentLike={props.addCommentLike} addSubcommentLike={props.addSubcommentLike} addSubcomment={props.addSubcomment} removeComment={props.removeComment} removeSubcomment={props.removeSubcomment}/>
                            })}
                        </div>

                        {/* <Scrollbar /> */}
                    </React.Fragment>
                }}
            </PostConsumer>
        )
    }
}

export default Comments
