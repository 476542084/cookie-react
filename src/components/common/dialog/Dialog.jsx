import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {Link,HashRouter as Router} from 'react-router-dom'
import styles from './Dialog.module.css'
let state = {
    visible: true,
    defaultImage: '',
    defaultTitle: '',
    defaultDetailText: '',
    defaultConfirm: {text:'确定',url:''},
    defaultCancel: {text:'取消',url:''}
}

const DialogAlert = (props = state) => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    Object.assign(state,props.props)
    const onClickClose = () => {
        props.onClose()
    }
    const handleAlert = e => {
        e.preventDefault()
    }
    const x = props.visible ? 
    <Fragment>
        <main className={styles['popup-container']} >
            <div className={styles['popup-holder']}>
                <div className className={styles['content']}>
                    {state.defaultImage !== '' ? <img src={state.defaultImage} alt="" onerror="暂无" /> : ''}
                    {state.defaultTitle !== '' ? <p className={styles['title']}>{state.defaultTitle}</p>: ''}
                    {state.defaultDetailText !== '' ? <p className={styles['detail']}>{state.defaultDetailText}</p>: ''}
                </div>
                <div className={styles['popup-button-row']}>
                    {state.defaultConfirm.url !== '' ? 
                        <button className={[`${styles['black']}`,`${styles['black popup-confirm']}`].join(' ')} 
                            onClick={onClickClose}>
                            <Router>
                                <Link to={`${state.defaultConfirm.url}`}>
                                    {state.defaultConfirm.text}
                                </Link>
                            </Router>
                        </button>
                    :   <button className={[`${styles['black']}`,`${styles['black popup-confirm']}`].join(' ')} 
                            onClick={onClickClose}>
                                <a href="/" onClick={handleAlert}>{state.defaultConfirm.text}</a>
                        </button>}
                    {state.defaultCancel.url !== '' ? 
                        <button className={[`${styles['white']}`,`${styles['white popup-cancel']}`].join(' ')} 
                            onClick={onClickClose}>
                                    <Router>
                                <Link to={state.defaultCancel.url}>
                                    {state.defaultCancel.text}
                                </Link>
                            </Router>
                        </button>
                    :   <button className={[`${styles['white']}`,`${styles['white popup-cancel']}`].join(' ')} 
                            onClick={onClickClose}>
                                <a href="/" onClick={handleAlert}>{state.defaultCancel.text}</a>
                        </button>}
                </div>
        </div>
    </main>
    </Fragment>
    : 
    null
    return (
      ReactDOM.createPortal(x, document.body)
    )
}

const DialogConfirm = (props) => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    const x = props.visible ? 
    <Fragment>
        <main className={styles['popup-container']}>
            <div className={styles['popup-holder']}>
                <div className className={styles['content']}>
                    <p className={styles['title']}>{props.content}</p>
                </div>
                <div className={styles['popup-button-row']}>
                    <button className={[`${styles['black']}`,`${styles['black popup-confirm']}`].join(' ')}>
                        <a href="/" onClick={props.yes}>确定</a>
                    </button>
                    <button className={[`${styles['white']}`,`${styles['white popup-cancel']}`].join(' ')}>
                        <a href="/" onClick={props.no}>取消</a>
                    </button>
                </div>
            </div>
        </main>
    </Fragment>
    : 
    null
    return (
      ReactDOM.createPortal(x, document.body)
    )
}

// const DialogLoad = (props) => {
//     document.body.style.overflow = 'hidden';
//     document.body.style.height = '100%';
//     const x = props.visible ? 
    
//     : 
//     null
//     return (
//       ReactDOM.createPortal(x, document.body)
//     )
// }


export const Alert = (props) => {
    const component = 
        <DialogAlert props={props} visible={true} onClose={() => {
            document.body.style.overflow = 'visible';
            document.body.style.height = 'auto';
            ReactDOM.render(React.cloneElement(component, {visible: false}), div)
            ReactDOM.unmountComponentAtNode(div)
            div.remove()
        }}>
        </DialogAlert>
    const div = document.createElement('div')
    document.body.append(div)
    ReactDOM.render(component,div)
}

export const Confirm = (content,yes,no) => {    
    const handleYes = e => {
        e.preventDefault()
        document.body.style.overflow = 'visible';
        document.body.style.height = 'auto';
        ReactDOM.render(React.cloneElement(component, {visible: false}), div)
        ReactDOM.unmountComponentAtNode(div)
        div.remove()
        yes && yes()
    }
    const handleNo = e => {
        e.preventDefault()
        document.body.style.overflow = 'visible';
        document.body.style.height = 'auto';
        ReactDOM.render(React.cloneElement(component, {visible: false}), div)
        ReactDOM.unmountComponentAtNode(div)
        div.remove()
        no && no()
    }
    const component = <DialogConfirm content={content} yes={handleYes} no={handleNo} visible={true} ></DialogConfirm>
    const div = document.createElement('div')
    document.body.append(div)
    ReactDOM.render(component,div)
}
