import React, { Component } from 'react'
import { connect } from 'react-redux'
import { is, fromJS  } from 'immutable'  // 保证数据的不可变
import PropTypes from 'prop-types'
import { saveToken, saveUserInfo } from '@/store/forum/action'
import {Link} from 'react-router-dom'
import {getIdentiyingCode, accountLogin, phoneLogin} from '@/api/getData'
import {setStore, getStore, getObjectValueForKeys} from '@/utils/commons'
import styles from './login.module.css'

class Login extends Component {
    static propTypes = {
        saveToken: PropTypes.func.isRequired,
        saveUserInfo: PropTypes.func.isRequired,
    }
    state = {
        data: [],
        loginType: false,
        account:'',
        password:'',
        phone:'',
        identifyingCode:'',
        countDown:60,
        phoneType:[{'value':'+86','text':'中国/+86'},{'value':'+1','text':'美国/+1'},{'value':'+1','text':'加拿大/+1'}],
        phoneTypeSelcted:'中国/+86',
        error:{'phone':true, 'code':true, 'account':true, 'password':true},
        resError:{'phone':'', 'code':'', 'account':'', 'password':''}
    }
    handleLoginType = () =>{
        this.setState({['loginType']: !this.state.loginType})
    }
    handleInput = (type,event) =>{
        this.setState({[type]: event.target.value})
    }
    handleSubmit = e => {
        e.preventDefault()
    }
    validForm = obj => {   
        let flag = false 
        if(!(obj instanceof Object)) return false
        let resError = {...this.state.error}
        Object.getOwnPropertyNames(obj).forEach(function(key){
            if(obj.hasOwnProperty(key)){
                resError[key] = obj[key]
            }else{
                resError[key] = ''
            }
        })
        this.setState({'resError':resError})
        let resErrorArray = Object.values(resError)
        flag = resErrorArray.every(item => { return (item == '')})
        return flag
    }
    handleLogin = async () => {
        if(this.state.loginType){
            //手机登录
            let error = {...this.state.error}
            this.state.phone === '' ? error.phone = false : error.phone = true
            this.state.identifyingCode === '' ? error.code = false : error.code = true
            this.setState({error})
            if(!error.phone) return
            try {
                let phoneTypeSelcted = getObjectValueForKeys(this.state.phoneType,'text',this.state.phoneTypeSelcted)
                let data = await phoneLogin(phoneTypeSelcted['value'] + this.state.phone, this.state.identifyingCode)
                if(data.code === 0){
                    this.props.saveToken(data.token)
                    this.props.saveUserInfo(data.userInfo)
                    this.props.history.push('/')
                    return
                }else{
                    this.validForm(data)
                }
            } catch (error) {
                //  接口/网络错误
                console.log('error',error)
            }
        }else{
            //账号登录
            let error = {...this.state.error}
            this.state.account === '' ? error.account = false : error.account = true
            this.state.password === '' ? error.password = false : error.password = true
            this.setState({error})
            if(!error.account || !error.password) return
            try {
                let data = await accountLogin(this.state.account, this.state.password)
                if (data.status === 200 || data.status === 201) {
                    this.props.saveToken(data.token)
                    this.props.saveUserInfo({userId: data.user_id, username: data.username})
                    this.props.history.push('/')
                    return
                } else {
                    let resError = {...this.state.resError}
                    resError.account = '请输入正确的账号与密码'
                    this.setState({resError})
                }
            } catch (error) {
                //  接口/网络错误
                console.log('error',error)
            }
        }
    }
    handleIdentifyingCode = async () =>{
        let error = {...this.state.error}
        this.state.phone === '' ? error.phone = false : error.phone = true
        this.setState({error})
        if(!error.phone) return
        let tempAcountDown =  getStore('loginAcountDown') == undefined ? this.state.countDown : parseInt(getStore('loginAcountDown')) 
        if(tempAcountDown === 60 ){
            try {
                let phoneTypeSelcted = getObjectValueForKeys(this.state.phoneType,'text',this.state.phoneTypeSelcted)
                let data = await getIdentiyingCode(phoneTypeSelcted['value'] + this.state.phone)
                if(data.status === 200 || data.status === 201){
                    let countDown = setInterval(() => {
                        if(this.state.countDown > 1){
                            this.setState({['countDown']: --tempAcountDown})
                            setStore('loginAcountDown', tempAcountDown)
                        }else{
                            clearInterval(countDown)
                            this.setState({['countDown']: 60})
                            setStore('loginAcountDown', 60)
                        }
                    },1000)
                    return
                }else{
                    this.validForm(data)
                }
            } catch (err) {
                //  接口/网络错误
                console.log('err',err)
            }
        }else{
            let countDown =setInterval(() => {
                if(tempAcountDown > 1){
                    this.setState({['countDown']: --tempAcountDown})
                    setStore('loginAcountDown', tempAcountDown)
                }else{
                    clearInterval(countDown)
                    this.setState({['countDown']: 60})
                    setStore('loginAcountDown', 60)
                }
            },1000)
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    render(){
        return (
            <main>
                <div className={styles['default-login-container']}>
                    <div className={styles['default-login-container-left']}>
                        <div className={styles['default-login-container-left-detail']}>
                            <div className={styles['title']}>
                                <p>登录{this.state.randomNum}</p>
                            </div>
                            <div className={styles['default-login-container-left-detail-content']}>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    {this.state.loginType === false ?
                                    <div>
                                        <div className={this.state.error.account ? styles['login-account'] : styles['login-account-error']}>
                                            <div className={styles['account-icon']}>
                                                <input type="text" className={styles['account-input']} value={this.state.account} onChange={this.handleInput.bind(this,'account')} name="account" placeholder="用户名/邮箱" />
                                            </div>
                                        </div>

                                        <div className={this.state.error.password ? styles['login-password'] : styles['login-password-error']} >
                                            <div className={styles['password-icon']}>
                                                <input type="password" className={styles['password-input']} value={this.state.password} onChange={this.handleInput.bind(this,'password')} name="password" placeholder="密码" />
                                            </div>
                                            {this.state.resError.account !== '' ? <p className={styles.error}>{this.state.resError.account}</p>: ''}
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className={this.state.error.phone ? styles['login-phone'] : styles['login-phone-error']} >
                                            <div className={styles['phone-icon']}>
                                                <input type="text" className={styles['phone-input']} value={this.state.phone} onChange={this.handleInput.bind(this,'phone')} name="phone" placeholder="手机号码" />
                                                <select className={styles['select-item']} onChange={this.handleInput.bind(this,'phoneTypeSelcted')} value={this.state.phoneTypeSelcted}>
                                                    {this.state.phoneType.map((item,index) => 
                                                        <option key={index+item} value={item['text']} >{item['text']}</option>
                                                    )}
                                                </select>
                                            </div>
                                            {this.state.resError.phone !== '' ? <p className={styles.error}>{this.state.resError.phone}</p>: ''}
                                        </div>

                                        <div className={this.state.error.code ? styles['login-identifying-code'] : styles['login-identifying-code-error']}  >
                                            <div className={styles['identifying-icon']}>
                                                <input type="text" className={styles['identifying-code-input']} value={this.state.identifyingCode} onChange={this.handleInput.bind(this,'identifyingCode')} name="identifyingCode" placeholder="验证码" />
                                                <span id="identifying_flag" onClick={this.handleIdentifyingCode.bind(this)} className={styles['get_identifying_code']}>{this.state.countDown === 60 ?'获取验证码' : this.state.countDown}</span>
                                            </div>
                                            {this.state.resError.code !== '' ? <p className={styles.error}>{this.state.resError.code}</p>: ''}
                                        </div>

                                    </div>}
                                    <div className={styles['login-other']}>
                                        <Link to="/account/register"><p className={styles['register-account']}>注册账号</p></Link>
                                        <Link to="/account/forget"><p className={styles['forget-account']}>忘记密码</p></Link>
                                    </div>
                                    <div className={styles['login-sub']}>
                                        <input type="submit" onClick={this.handleLogin.bind(this)} className={styles['login-enter']} value="登录" />
                                    </div>
                                </form>
                               
                                <div className={styles['login-bottom']}>
                                    <span className={styles['other-login-method']}>其他登录方式</span>
                                        {this.state.loginType === true ? 
                                            <div className={styles['login-bottom-icon']}>
                                                <img className={styles['phone-login']}  src={require('@/assets/account/login/mobile_default.png')} title="手机登录" alt="手机登录" />
                                                <img className={styles['account-login']} onClick={this.handleLoginType.bind(this)} src={require('@/assets/account/login/user_login.png')} title="账号登录" alt="账号登录" />
                                            </div>
                                        :
                                            <div className={styles['login-bottom-icon']}>
                                                <img className={styles['phone-login']} onClick={this.handleLoginType.bind(this)} src={require('@/assets/account/login/mobile.png')} title="手机登录" alt="手机登录" />
                                                <img className={styles['account-login']} src={require('@/assets/account/login/user_login_default.png')} title="账号登录" alt="账号登录" />
                                            </div>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['default-login-container-right']}>
                        <img src={require('@/assets/account/login/index.png')} alt="show" />
                    </div>
                </div>
            </main>
         
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        saveToken: token => dispatch(saveToken(token)),
        saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(Login)