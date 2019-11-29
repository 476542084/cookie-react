import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '@/store/store'
import InfoTitle from './infoTitle/InfoTitle'
import UserInfoForm from './userInfoForm/UserInfoForm'
import { UserProvider } from '../UserContext'
import { getOwnInfo, getLocationList } from '@/api/getData'
import { saveUserInfo } from '@/store/forum/action'
import { updateUserSettings, updateUserPicture } from '@/api/getData'
import { compressImage, canvasToBlob } from '@/utils/commons'
import styles from './UserSettings.module.css'


class UserSettings extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            years: [],
            months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            days: [],
        }
    }


    componentDidMount = async () => {
        await this.storeUserInfo()
        await this.getLocations()
        const years = []
        for (let i = 1940; i <= 2017; i++) {
            years.push(i)
        }
        this.setState((prevState) => ({
            userinfo: {
                ...prevState.userinfo,
                birthYear: this.state.userinfo.birth_date.slice(0, 4),
                birthMonth: this.state.months[parseInt(this.state.userinfo.birth_date.slice(5, 7)) - 1],
                birthDay: this.state.userinfo.birth_date.slice(8, 10),
            },
            years: years,
        }))
        this.getDays()
    }


    getDays = () => {
        var leapYear = false
        var days = []
        const shortMonths = ['四月', '六月', '九月', '十一月']
        const birthYear = (this.state.userinfo) ? this.state.userinfo.birth_date.slice(0, 4):null
        if (birthYear && birthYear % 4 === 0) {
            leapYear = true
        }
        if (shortMonths.includes(this.state.userinfo.birthMonth)) {
            for (let i = 1; i <= 30; i++) {
                days.push(i)
            }
        } else if (this.state.userinfo.birthMonth === '二月') {
            if (leapYear) {
                for (let i = 1; i <= 29; i++) {
                    days.push(i)
                }
            } else {
                for (let i = 1; i <= 28; i++) {
                    days.push(i)
                }
            }
        } else {
            for (let i = 1; i <= 31; i++) {
                days.push(i)
            }
        }
        this.setState({days: days})
    }


    changeDate = async (e) => {
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        await this.changeSetting(e)
        const date = `${this.state.userinfo.birthYear}-${months[this.state.months.indexOf(this.state.userinfo.birthMonth)]}-${this.state.userinfo.birthDay}`
        this.setState((prevState) => ({
            userinfo: {
                ...prevState.userinfo,
                birth_date: date
            }
        }))
        this.getDays()
    }


    storeUserInfo = async () => {
        try {
            const userId = await store.getState('forum').forumData.userInfo.userId
            const data = await getOwnInfo(userId)
            if (data.status === 200) {
                this.setState({...data})
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log(`错误`)
        }
    }


    getLocations = async () => {
        try {
            const data = await getLocationList()
            if (data.status === 200) {
                this.setState({locations: data})
            } else {
                console.log(data.msg)
            }
        } 
        catch {
            console.log(`错误`)
        }
        
    }


    changeProfilePic = (e) => {
        const imageFile = e.currentTarget.files[0]
        const imageURL = this.getObjectUrl(imageFile)
        this.setState((prevState) => (
            {userinfo: {
                ...prevState.userinfo,
                profile_pic: imageURL,
                profilePicObject: imageFile
            }}
        ))
    }


    getObjectUrl = (file) => {
        let url = null
        if (window.createObjectURL) {
            url = window.createObjectURL(file)
        } else if (window.URL) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    }


    changeSetting = (e) => {
        const value = e.currentTarget.getAttribute('val')
        const id = e.currentTarget.id
        this.setState((prevState) => ({
            userinfo: {
                ...prevState.userinfo,
                [id]: value
            }
        }))
    }


    changeParentLocation = (e) => {
        const value = e.currentTarget.getAttribute('val')
        this.setState((prevState) => ({
            userinfo: {
                ...prevState.userinfo,
                locations: {
                    ...prevState.userinfo.locations,
                    location_id: value,
                    parent_location_id: null
                },
            }
        }))
    }


    changeLocation = (e) => {
        const value = e.currentTarget.getAttribute('val')
        this.setState((prevState) => ({
            userinfo: {
                ...prevState.userinfo,
                locations: {
                    ...prevState.userinfo.locations,
                    parent_location_id: prevState.userinfo.locations.parent_location_id ? prevState.userinfo.locations.parent_location_id:prevState.userinfo.locations.location_id,
                    location_id: value,
                },
            }
        }))
    }


    changeBio = (e) => {
        const value = e.currentTarget.value
        this.setState((prevState) => ({
            userinfo: {
                ...prevState.userinfo,
                bio: value
            }
        }))
    }


    updateSettings = async (e) => {
        e.preventDefault()
        const userId = await store.getState('forum').forumData.userInfo.userId
        const userInfo = this.state.userinfo
        let data = new FormData()
        // if (userInfo.profilePicObject) {
        //     compressImage(userInfo.profilePicObject, 1200, 1200, 0.95).then(canvasToBlob).then((afterFile) => {
        //         data.append('profile_pic', afterFile)
        //     })
        // }
        data.append('profile_pic', userInfo.profilePicObject)
        updateUserSettings(userId, userInfo.sex, userInfo.bio, userInfo.locations.location_id ? userInfo.locations.location_id:userInfo.locations.parent_location_id, userInfo.birth_date)
        if (userInfo.profilePicObject) {
            await updateUserPicture(userId, data)
        }
        this.props.saveUserInfo({
            userId: this.state.id,
            email: this.state.email,
            IsKOL: this.state.is_kol,
            phone: this.state.phone,
            badges: this.state.user_badges,
            userInfo: this.state.userinfo,
            username: this.state.username,
        })
    }


    render() {
        const methods = {changeProfilePic: this.changeProfilePic, changeSetting: this.changeSetting, changeDate: this.changeDate, changeBio: this.changeBio, changeParentLocation: this.changeParentLocation, changeLocation: this.changeLocation, updateSettings: this.updateSettings}
        return (
            <UserProvider value={{state: this.state, methods: methods}} >
                <div className='page_container'>
                    <div className={styles.user_info_container}>
                        <p className={styles.user_info_header}>个人信息</p>
                        <UserInfoForm />
                    </div>
                    <div className={styles.account_info_container}>
                        <p className={styles.account_info_header}>账号信息</p>
                        <div className={styles.phone_row}>
                            <div className={styles.phone_details}>
                                <InfoTitle value='手机' />
                                {this.state.userinfo && <span className={styles.phone_number}>{this.state.phone}</span>}
                            </div>
                            <a href="/account/phone_validate/">
                                <button className={styles.change} type="button">更改号码</button>
                            </a>
                        </div>
                        <div className={styles.password_row}>
                            <div className={styles.password_details}>
                                <InfoTitle value='密码' />
                                <span className={styles.password}>********</span>
                            </div>
                            <a href="/account/user_retrieve/">
                                <button className={styles.change} type="button">更改密码</button>
                            </a>
                        </div>
                    </div>
                </div>
            </UserProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(UserSettings)
