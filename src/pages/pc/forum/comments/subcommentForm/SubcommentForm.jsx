import React, { Component } from 'react'
import styles from './SubcommentForm.module.css'

class SubcommentForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            comment: `@${this.props.user} `
        }
    }


    commentInput = (e) => {
        this.setState({comment: e.currentTarget.value})
    }


    addSubcomment = (e) => {
        e.preventDefault()
        this.props.addSubcomment(this.props.comment.id, this.state.comment)
        this.props.closeSubcomment()
    }
    

    render() {
        return (
            <div className={styles.subcomment_form_container} htmlFor="comment_reply">
            
                <form method="POST" className={styles.subcomment_form} index="{{forloop.counter}}" key={this.props.user} onSubmit={this.addSubcomment}>
                    <textarea name="subcomment_text" className={styles.subcomment_text_comment} id="subcomment" placeholder="最多可评论200字" defaultValue={this.state.comment} onInput={this.commentInput}></textarea>
                    <button className={styles.comment_submit} type="submit">发表</button>
                </form>
            
            </div>
        )
    }
}

export default SubcommentForm

