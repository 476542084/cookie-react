import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
// import {Link,HashRouter as Router} from 'react-router-dom'
import styles from './postFormDialog.module.css'

export const Loading  = {
    showLoading(){
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        const div = document.createElement('div')
        div.id = 'loading'
        document.body.append(div)
        ReactDOM.render(
            <Fragment>
                <main className={styles['popup-container-loading']}>
                    <div className={styles['popup-holder-downloadImg']}>
                        <div>
                            <img src={require('@/assets/forum/load.png')} alt="" />
                            <p>图片上传中</p>
                        </div>
                    </div>
                </main>
            </Fragment>
        ,div)
    },
    hideLoading(){
        document.body.style.overflow = 'visible';
        document.body.style.height = 'auto';
        ReactDOM.unmountComponentAtNode(document.getElementById("loading"))
        document.body.removeChild(document.getElementById("loading"))
    }
}

export const postFormError  = {
    show(){
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.position = 'fixed';
        const div = document.createElement('div')
        div.id = 'postFormError'
        document.body.append(div)
        ReactDOM.render(
            <Fragment>
                <main className={styles['popup-container']}>
                    <div className={styles.postFormError}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <p>发帖条件</p>
                        </div>
                        <div className={styles.detail}>
                            <p><span></span>必须上传封面图</p>
                            <p><span></span>必须上传两张以上的内容图</p>
                            <p><span></span>内容文字必须50字以上</p>
                        </div>
                    </div>
                    <button onClick={this.hide}>确定</button>
                    </div>
                </main>
            </Fragment>
        ,div)
    },
    hide(){
        document.body.style.overflow = 'visible';
        document.body.style.height = 'auto';
        document.body.style.width = '100%';
        document.body.style.position = 'unset';
        ReactDOM.unmountComponentAtNode(document.getElementById("postFormError"))
        document.body.removeChild(document.getElementById("postFormError"))
    }
}
