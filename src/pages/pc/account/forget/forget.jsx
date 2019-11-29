import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {getIdentiyingCode,checkPhone,resetPassword} from '@/api/getData'
import {setStore, getStore,getObjectValueForKeys} from '@/utils/commons'
import styles from './forget.module.css'

class Forget extends Component {
    state = {
        userId:'',
        phone:'',
        identifyingCode:'',
        firstPassword:'',
        secondPassword:'',
        passStatus:false,
        countDown:60,
        phoneType:[{'value':'+86','text':'中国/+86'},{'value':'+1','text':'美国/+1'},{'value':'+1','text':'加拿大/+1'}],
        phoneTypeSelcted:'中国/+86',
        error:{'phone':true, 'code':true, 'password':true, 'password2':true},
        resError:{'phone':'', 'code':'', 'password':'', 'password2':''}
    }
    handleInput = (type,event) =>{  
        this.setState({[type]: event.target.value})
    }
    handleSubmit = e => {
        e.preventDefault()
    }
    handleBack = () => {
        this.setState({['passStatus']:false})
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
    handleforgot = async () => {
        let error = {...this.state.error}
        this.state.phone === '' ? error.phone = false : error.phone = true
        this.state.identifyingCode === '' ? error.code = false : error.code = true
        this.setState({error})
        if(!error.phone || !error.code) return

        let phoneTypeSelcted = getObjectValueForKeys(this.state.phoneType,'text',this.state.phoneTypeSelcted)
        try {
            let data = await checkPhone(phoneTypeSelcted['value'] + this.state.phone, this.state.identifyingCode)
            if(data.status === 200 || data.status === 201){
                //通过
                this.setState({['passStatus']:true})
                this.setState({'userId': data.user_id})
                return
            }else{
                this.validForm(data)
            }
        } catch (error) {
            //  接口/网络错误
            console.log('error',error)
        }
    }

    handleIdentifyingCode = async () =>{
        let error = {...this.state.error}
        this.state.phone === '' ? error.phone = false : error.phone = true
        this.setState({error})
        if(!error.phone) return
        let tempAcountDown =  getStore('forgotAcountDown') === undefined ? this.state.countDown : parseInt(getStore('forgotAcountDown')) 
        if(tempAcountDown === 60 ){
            try {
                let phoneTypeSelcted = getObjectValueForKeys(this.state.phoneType,'text',this.state.phoneTypeSelcted)
                let data = await getIdentiyingCode(phoneTypeSelcted['value'] + this.state.phone)
                if(data.status === 200 || data.status === 201){
                    let countDown = setInterval(() => {
                        if(this.state.countDown > 1){
                            this.setState({['countDown']: --tempAcountDown})
                            setStore('forgotAcountDown', tempAcountDown)
                        }else{
                            clearInterval(countDown)
                            this.setState({['countDown']: 60})
                            setStore('forgotAcountDown', 60)
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
            let countDown = setInterval(() => {
                if(tempAcountDown > 1){
                    this.setState({['countDown']: --tempAcountDown})
                    setStore('forgotAcountDown', tempAcountDown)
                }else{
                    clearInterval(countDown)
                    this.setState({['countDown']: 60})
                    setStore('forgotAcountDown', 60)
                }
            },1000)
        }
    }
    handleSavePassword = async () => {
        let error = {...this.state.error}
        this.state.firstPassword === '' ? error.password = false : error.password = true
        this.state.secondPassword === '' ? error.password2 = false : error.password2 = true
        this.setState({error})
        if(!error.password || !error.password2) return
        try {
            let phoneTypeSelcted = getObjectValueForKeys(this.state.phoneType,'text',this.state.phoneTypeSelcted)
            let data = await resetPassword(
                this.state.userId, 
                this.state.firstPassword, 
                this.state.secondPassword,
                phoneTypeSelcted['value'] + this.state.phone, 
                this.state.identifyingCode
            )
            if(data.status === 200 || data.status === 201){
                //通过
                this.props.history.push('/account/login')
                return
            }else{
                this.validForm(data)
            }
        } catch (error) {
            //  接口/网络错误
            console.log('error',error)
        }
    }
    render(){
        return (
            <>
            {!this.state.passStatus ? 
                <div className={styles['forgot-container']}>
                    <div className={styles['forgot-title']}>
                        <p>找回密码</p>
                    </div>
                    <form id="forgot_form" className={styles['forgot-content']} onSubmit={this.handleSubmit.bind(this)}>
                        <div className={ this.state.error.phone ? styles['forgot-content-item'] : styles['forgot-content-item-error']} >
                            <div className={[`${styles['forgot-input']}`,`${styles['phone-input']}`].join(' ')}>
                                <input type="text" name="phone" id="id_phone" placeholder="请输入您的手机号" onChange={this.handleInput.bind(this,'phone')} value={this.state.phone} />
                                <select name="phone_area_code" class="form-control" onChange={this.handleInput.bind(this,'phoneTypeSelcted')} value={this.state.phoneTypeSelcted}>
                                    {this.state.phoneType.map((item,index) => 
                                        <option key={index+item} value={item['text']} >{item['text']}</option>
                                    )}
                                </select>
                            </div>
                            {this.state.resError.phone !== '' ? <p className={styles.error}>{this.state.resError.phone}</p>: ''}
                        </div>
                        <div className={ this.state.error.code ? styles['forgot-content-item'] : styles['forgot-content-item-error']}>
                            <div className={[`${styles['forgot-input']}`,`${styles['identifying-input']}`].join(' ')}>
                                <input type="text" name="phone_code" id="id_phone_code" placeholder="请输入验证码" onChange={this.handleInput.bind(this,'identifyingCode')} value={this.state.identifyingCode}  />
                                <span id="identifying_flag" className={styles['get_identifying_code']} onClick={this.handleIdentifyingCode.bind(this)} >{this.state.countDown === 60 ?'获取验证码' : this.state.countDown}</span>
                            </div>
                            {this.state.resError.code !== '' ? <p className={styles.error}>{this.state.resError.code}</p>: ''}
                        </div>
                        <div className={styles['forgot-bottom']}>
                            <input type="submit" className={[`${styles['forgot-submit']}`,`${styles['black']}`].join(' ')} onClick={this.handleforgot.bind(this)} defaultValue="立即找回" />
                            <Link to="/account/login"><input type="button" className={[`${styles['back-button']}`,`${styles['white']}`].join(' ')} defaultValue="上一页" />
                            </Link>
                        </div>
                    </form>
                </div>
                : 
                <div className={styles['forgot-container']}>
                    <div className={styles['forgot-title']}>
                        <p>重新设置新密码</p>
                    </div>
                    <form id="forgot_form" className={styles['forgot-content']} onSubmit={this.handleSubmit.bind(this)}>
                        <div className={ this.state.error.password ? styles['forgot-content-item'] : styles['forgot-content-item-error']}>
                            <div className={[`${styles['forgot-input']}`,`${styles['password-input']}`].join(' ')}>
                                <input type="password" placeholder="请输入您的新密码" onChange={this.handleInput.bind(this,'firstPassword')} value={this.state.firstPassword}  />
                            </div>
                            {this.state.resError.password !== '' ? <p className={styles.error}>{this.state.resError.password}</p>: ''}
                        </div>
                        <div className={ this.state.error.password2 ? styles['forgot-content-item'] : styles['forgot-content-item-error']}>
                            <div className={[`${styles['forgot-input']}`,`${styles['verify-input']}`].join(' ')}>
                                <input type="password" placeholder="请再次输入新密码" onChange={this.handleInput.bind(this,'secondPassword')} value={this.state.secondPassword}  />
                            </div>
                            {this.state.resError.password2 !== '' ? <p className={styles.error}>{this.state.resError.password2}</p>: ''}
                        </div>
                        <div className={styles['forgot-bottom']}>
                            <input type="submit" className={[`${styles['forgot-submit']}`,`${styles['black']}`].join(' ')} onClick={this.handleSavePassword.bind(this)} defaultValue="确定" />
                            <input type="button" className={[`${styles['back-button']}`,`${styles['white']}`].join(' ')} onClick={this.handleBack.bind(this)} defaultValue="上一步" />
                        </div>
                    </form>
                </div>
            }
        </> 
          );
    }
}

export default Forget