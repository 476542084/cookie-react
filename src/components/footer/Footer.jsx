import React, {Component} from 'react'
import style from  './Footer.module.css'
import {Link} from 'react-router-dom'
import {Alert,Confirm} from '@/components/common/dialog/Dialog'
class Footer extends Component{
    state = {
        wechatStatus: false
    }
    handleWechat = (e) =>{
        this.setState({['wechatStatus']:!this.state.wechatStatus})
        e.preventDefault()

        Alert({
            // 'defaultTitle':'测试一下标题',
            'defaultImage':require('@/assets/footer/cookie_qr_code.jpg'),
            // 'defaultConfirm':{'text':'首页','url':'/account/login'}
        })

        // Confirm('你确定要删除吗',
        // () => {
        //     console.log('确定执行')
        // },
        // () => {
        //     console.log('取消执行')
        // })

    }
    handleWechatAlert = status => {
        this.setState({['wechatStatus']:!status})
    }
    render () {
        return (
            <>
                <footer className={style['footer-container']}>
                    <div className={style['footer-links-container']}>
                        <div className={style['footer-links']}>
                            <Link className={style['footer-link']} to='/about_us'>关于我们</Link>
                            <Link className={style['footer-link']} to='/about_us#contact-section'>联系我们</Link>
                            <Link className={style['footer-link']} to='/limitations'>免责声明</Link>
                            <Link className={style['footer-link']} to='/privacy'>隐私政策</Link>
                        </div>
                    </div>
                    <div className={style['footer-socials']}>
                        {/* Weibo */}
                        <a className={style['Weibo']} href={'https://www.weibo.com/u/6605484378?topnav=1&wvr=6&topsug=1'} target='_blank' rel="noopener noreferrer"><img src={require('@/assets/footer/weibo.png')} alt="微博" /></a>
                        {/* Bilibili */}
                        <a className={style['Bilibili']} href='https://space.bilibili.com/397402486' target='_blank' rel="noopener noreferrer"><img src={require('@/assets/footer/bilibili.png')} alt='哔哩哔哩动画'/></a>
                        {/* Wechat */}
                        <a className={style['Wechat']} href='/' onClick={this.handleWechat.bind(this)}><img src={require('@/assets/footer/wechat.png')} alt="微信公众号" /></a>
                        {/* Instagram */}
                        <a className={style['Instagram']} href='https://www.instagram.com/ckbhofficial/' target='_blank' rel="noopener noreferrer"><img src={require('@/assets/footer/Instagram.png')} alt='Instagram' /></a>
                    </div>
                    <div className={style['footer-copyright']}>
                        <div className={style['container-fluid']}>© 2019 Copyright: 
                            <a href='https://www.cookie.vip' rel="noopener noreferrer"> www.cookie.vip </a>
                        </div>
                        <div className={style['icp-number']}>粤ICP备19078332号</div>
                        <div className={style['license']}>
                            <img className={style['license-icon']} src={require('@/assets/footer/license.jpg')} alt="粤公网安备" /><span className='license-number'>粤公网安备 44030502004239号</span>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

export default Footer
