import fetch from '../config/fetch'

//获取用户信息
export const getUserInfo = () => fetch('/user/stu_info', {stu_name: '111'})

//登录  
export const accountLogin = (userName, password) => fetch('/user/login', {userName, password}, 'POST')