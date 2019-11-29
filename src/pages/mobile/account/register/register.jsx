import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {register, getIdentiyingCode} from '@/api/getData'
import {setStore, getStore, getObjectValueForKeys} from '@/utils/commons'
import styles from './register.module.css'

class Register extends Component {
    state = {
        account:'',
        firstPassword:'',
        secondPassword:'',
        phone:'',
        identifyingCode:'',
        countDown:60,
        phoneType:[{'value':'+86','text':'中国/+86'},{'value':'+1','text':'美国/+1'},{'value':'+1','text':'加拿大/+1'}],
        phoneTypeSelcted:'中国/+86',
        error:{'phone':true, 'code':true, 'password':true, 'password2':true, 'username': true},
        resError:{'phone':'', 'code':'', 'password':'', 'password2':'', 'username': ''}
    }
    handleInput = (type,event) =>{
        this.setState({[type]: event.target.value})
    }
    handleSubmit = e => {
        e.preventDefault()
    }
    validForm = obj => {   
        let flag = false 
        if(obj){
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
        }else{
            let error = {...this.state.error}
            this.state.phone === '' ? error.phone = false : error.phone = true
            this.state.identifyingCode === '' ? error.code = false : error.code = true
            this.state.firstPassword === '' ? error.password = false : error.password = true
            this.state.secondPassword === '' ? error.password2 = false : error.password2 = true
            this.state.account === '' ? error.username = false : error.username = true
            this.setState({'error':error})
            let errorArray = Object.values(error)
            flag = errorArray.every(item => { return item})
            return flag
        }
    }
    handleRegister = async () => {
        if(!this.validForm()) return
        try {
            let phoneTypeSelcted = getObjectValueForKeys(this.state.phoneType,'text',this.state.phoneTypeSelcted)
            let data = await register(phoneTypeSelcted['value'] + this.state.phone, this.state.identiyingCode, this.state.firstPassword, this.state.secondPassword, this.state.account)
            if(data.status === 200 || data.status === 201){
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

    handleIdentifyingCode = async () =>{
        let error = {...this.state.error}
        this.state.phone === '' ? error.phone = false : error.phone = true
        this.setState({error})
        if(!error.phone) return

        let tempAcountDown =  getStore('registerAcountDown') === undefined ? this.state.countDown : parseInt(getStore('registerAcountDown')) 
        if(tempAcountDown === 60 ){
            try {
                let phoneTypeSelcted = getObjectValueForKeys(this.state.phoneType,'text',this.state.phoneTypeSelcted)
                let data = await getIdentiyingCode(phoneTypeSelcted['value'] + this.state.phone)
                if(data.status === 200 || data.status === 201){
                    let countDown = setInterval(() => {
                        if(this.state.countDown > 1){
                            this.setState({['countDown']: --tempAcountDown})
                            setStore('registerAcountDown', tempAcountDown)
                        }else{
                            clearInterval(countDown)
                            this.setState({['countDown']: 60})
                            setStore('registerAcountDown', 60)
                        }
                    },1000)
                    return
                }else{
                    let error = {...this.state.error}
                    error.phone = false
                    this.setState({error})
                }
            } catch (err) {
                //  接口/网络错误
                console.log('err',err)
            }
        }else{
            let countDown =setInterval(() => {
                if(tempAcountDown > 1){
                    this.setState({['countDown']: --tempAcountDown})
                    setStore('registerAcountDown', tempAcountDown)
                }else{
                    clearInterval(countDown)
                    this.setState({['countDown']: 60})
                    setStore('registerAcountDown', 60)
                }
            },1000)
        }
    }
    render(){
        return (
            <div className={styles['register-container']}>
              <div className={styles['register-title']}>
                <p>注册</p>
              </div>
              <form id="register_form" className={styles['register-content']} onSubmit={this.handleSubmit.bind(this)}>

                <div className={ this.state.error.phone ? styles['register-content-item'] : styles['register-content-item-error'] }>
                  <div className={[`${styles['register-input']}`,`${styles['phone-input']}`].join(' ')}>
                    <input type="text" name="phone" id="id_phone" placeholder="请输入您的手机号" onChange={this.handleInput.bind(this,'phone')} value={this.state.phone} />
                    <select className={styles['select-item']} onChange={this.handleInput.bind(this,'phoneTypeSelcted')} value={this.state.phoneTypeSelcted}>
                        {this.state.phoneType.map((item,index) => 
                            <option key={index+item} value={item['text']} >{item['text']}</option>
                        )}
                    </select>
                  </div>
                  {this.state.resError.phone !== '' ? <p className={styles.error}>{this.state.resError.phone}</p>: ''}
                </div>

                <div className={ this.state.error.code ? styles['register-content-item'] : styles['register-content-item-error'] }>
                  <div className={[`${styles['register-input']}`,`${styles['identifying-input']}`].join(' ')}>
                    <input type="text" name="phone_code" id="id_phone_code" placeholder="请输入验证码" onChange={this.handleInput.bind(this,'identifyingCode')} value={this.state.identifyingCode}  />
                    <span id="identifying_flag" className={styles['get_identifying_code']} onClick={this.handleIdentifyingCode.bind(this)} >{this.state.countDown === 60 ?'获取验证码' : this.state.countDown}</span>
                  </div>
                  {this.state.resError.code !== '' ? <p className={styles.error}>{this.state.resError.code}</p>: ''}
                </div>

                <div className={ this.state.error.password ? styles['register-content-item'] : styles['register-content-item-error'] }>
                  <div className={[`${styles['register-input']}`,`${styles['password-input']}`].join(' ')}>
                    <input type="password" name="password" id="id_password" placeholder="请输入密码" onChange={this.handleInput.bind(this,'firstPassword')} value={this.state.firstPassword}  />
                  </div>
                  {this.state.resError.password !== '' ? <p className={styles.error}>{this.state.resError.password}</p>: ''}
                </div>
                
                <div className={ this.state.error.password2 ? styles['register-content-item'] : styles['register-content-item-error'] }>
                  <div className={[`${styles['register-input']}`,`${styles['verify-input']}`].join(' ')}>
                    <input type="password" name="verify_password" id="id_verify_password" placeholder="请再次输入密码" onChange={this.handleInput.bind(this,'secondPassword')} value={this.state.secondPassword}  />
                  </div>
                  {this.state.resError.password2 !== '' ? <p className={styles.error}>{this.state.resError.password2}</p>: ''}
                </div>

                <div className={ this.state.error.username ? styles['register-content-item'] : styles['register-content-item-error'] }>
                  <div className={[`${styles['register-input']}`,`${styles['account-input']}`].join(' ')}>
                    <input type="text" name="username" id="id_username" placeholder="请输入您的用户名" maxLength={20}  onChange={this.handleInput.bind(this,'account')} value={this.state.account}  />
                  </div>
                  {this.state.resError.username !== '' ? <p className={styles.error}>{this.state.resError.username}</p>: ''}
                </div>

                <div className={styles['register-artcle']}>
                  <p>
                    <span>注册即代表同意</span>
                    <Link to="/login"><span>《用户服务协议》</span></Link>
                  </p>
                </div>
                <div className={styles['register-bottom']}>
                  <input type="submit" onClick={this.handleRegister.bind(this)} className={[`${styles['register-submit']}`,`${styles['black']}`].join(' ')} value="注册" />
                  <Link to="/account/login"><input type="button" className={[`${styles['back-button']}`,`${styles['white']}`].join(' ')} defaultValue="上一页" /></Link>
                </div>
              </form>
            </div>
          );
    }
}

export default Register