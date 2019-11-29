import React, { Component } from 'react'
import styles from './leftNav.module.css'

class LeftNav extends Component{
    constructor(props){
        super(props)
    }
    state = {
        navList:[
            {text:'关于Cookie',status:'default'},
            {text:'Cookie团队',status:'default'},
            {text:'联系我们',status:'default'},
            {text:'免责声明',status:'default'},
            {text:'隐私政策',status:'default'},
            {text:'服务协议',status:'default'},
        ]
    }
    render(){
        return(
            <div className={styles['col']}>
                <div className={styles['sticky-top']}>
                    <ul className={styles['about-us-nav']}>
                        {this.navList.map((item,index)=>(
                        <li key={index}>
                            <a className={item.status === 'default' ? styles['defalut'] : styles['active']}>{item.text}</a>
                        </li>
                        ))}
                        
                    </ul>
                </div>
            </div>
        )
    }
}

export default LeftNav