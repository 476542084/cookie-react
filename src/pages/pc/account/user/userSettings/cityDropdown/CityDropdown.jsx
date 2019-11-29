import React, { Component } from 'react'
import { UserConsumer } from '../../UserContext'
import styles from './CityDropdown.module.css'

export class CityDropdown extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            dropdownOpen: false
        }
    }


    toggleDropdown = () => {
        this.setState((prevState) => ({dropdownOpen: !prevState.dropdownOpen}))
    }


    render() {
        return (
            <UserConsumer>
                {(state) => {
                    const userInfo = state.state.userinfo ? state.state.userinfo:null
                    return <div className={styles.user_location2_holder}>
                        <div className={styles.user_location2_open} onClick={this.toggleDropdown} >
                            {this.props.options && userInfo && userInfo.locations.location_id && userInfo.locations.parent_location_id && <span className={styles.user_location2}>{this.props.options[userInfo.locations.location_id].name}</span>}
                            {userInfo && !userInfo.locations.parent_location_id && <span className={styles.user_location2}>---</span>}
                            <img src={require('@/assets/shared/arrow-down.png')} className={styles.dropdown_arrow} />
                        </div>
                        {this.state.dropdownOpen && <div className={`${styles.user_location2_dropdown} ${styles.dropdown_list}`} onClick={this.toggleDropdown}>
                            <div className={styles.user_location2_dropdown_option} id="location_id" val="" onClick={state.methods.changeLocation} >
                                <span>---</span>
                            </div>
                            {this.props.options.map((location) => {
                                if (location.level === 2 && (parseInt(userInfo.locations.parent_location_id) === location.parent_location || parseInt(userInfo.locations.location_id) === location.parent_location)) {
                                    return <div className={styles.user_location2_dropdown_option} key={location.id} id="location_id" val={location.id} onClick={state.methods.changeLocation} >
                                        <span>{location.name}</span>
                                    </div>
                                }
                            })}
                        </div>}
                    </div>
                }}
            </UserConsumer>
        )
    }
}

export default CityDropdown
