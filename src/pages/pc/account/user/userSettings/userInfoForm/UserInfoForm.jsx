import React from 'react'
import InfoTitle from '../infoTitle/InfoTitle'
import CityDropdown from '../cityDropdown/CityDropdown'
import StateDropdown from '../stateDropdown/StateDropdown'
import DateDropdown from '../dateDropdown/DateDropdown'
import { UserConsumer } from '../../UserContext'
import styles from './UserInfoForm.module.css'


function UserInfoForm() {
    return (
        <UserConsumer>
            {(state) => {
                const userInfo = (state.state.userinfo) ? state.state.userinfo:null
                return <form id="user_info_form" encType="multipart/form-data" method="POST">
                    <div className={styles.profile_img_row}>
                        <InfoTitle value='头像' />
                        {userInfo && userInfo.profile_pic && <img src={userInfo.profile_pic} className={styles.user_profile_pic} onerror="this.src='{% static 'default_files/none_user.png' %}'" />}
                        {userInfo && !userInfo.profile_pic && <img className={styles.user_profile_pic} src="{% static 'default_files/none_user.png' %}" />}
                        <input name="profile_pic" className={styles.id_profile_pic} id="id_profile_pic" type="file" accept="image/png, image/jpeg, image/pjpeg" onChange={state.methods.changeProfilePic} />
                        <label htmlFor="id_profile_pic">
                            <span className={styles.change_profile_pic}>修改头像</span>
                        </label>
                    </div>
                    <div className={styles.username_row}>
                        <InfoTitle value='账户' />
                        <span className={styles.username}>{state.state.username}</span>
                    </div>
                    <div className={styles.user_gender_row}>
                        <InfoTitle value='性别' />
                        {userInfo && userInfo.sex === "male" && <span className={`${styles.user_radio_label} selected radio_select`} id="sex" val="male" onClick={state.methods.changeSetting} ></span>}
                        {userInfo && userInfo.sex === "female" && <span className={`${styles.user_radio_label} radio_select`} id="sex" val="male" onClick={state.methods.changeSetting} ></span>}
                        <span className={styles.user_gender}>男</span>
                        {userInfo && userInfo.sex === "female" && <span className={`${styles.user_radio_label} selected radio_select`} id="sex" val="female" onClick={state.methods.changeSetting} ></span>}
                        {userInfo && userInfo.sex === "male" && <span className={`${styles.user_radio_label} radio_select`} id="sex" val="female" onClick={state.methods.changeSetting} ></span>}
                        <span className={styles.user_gender}>女</span>
                    </div>
                    <div className={styles.user_location_row}>
                        <InfoTitle value='城市' />
                        <StateDropdown options={state.state.locations} />
                        <CityDropdown options={state.state.locations} />
                    </div>
                    <div className={styles.birthday_row}>
                        <InfoTitle value='生日' />
                        {userInfo && <DateDropdown date={userInfo.birthYear} dropdown={state.state.years} id="birthYear" />}
                        {userInfo && <DateDropdown date={userInfo.birthMonth} dropdown={state.state.months} id="birthMonth" />}
                        {userInfo && <DateDropdown date={userInfo.birthDay} dropdown={state.state.days} id="birthDay" />}
                    </div>
                    <div className={styles.bio_row}>
                        <label htmlFor="bio" className={styles.user_info_title}>签名</label>
                        <textarea name="bio" id="bio" className={styles.id_bio} placeholder="最多可输入50个文字。" onInput={state.methods.changeBio} ></textarea>
                    </div>
                    <button className={styles.save_info} type="submit" onClick={state.methods.updateSettings} >保存</button>
                </form>
            }}
        </UserConsumer>
    )
}

export default UserInfoForm

