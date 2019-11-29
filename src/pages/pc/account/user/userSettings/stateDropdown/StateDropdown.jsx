import React, { Component } from 'react'
import styles from './StateDropdown.module.css'
import { UserConsumer } from '../../UserContext'

export class StateDropdown extends Component {
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
                    return <div className={styles.user_location1_holder}>
                        <div className={`${styles.user_location1_open}`} onClick={this.toggleDropdown} >
                            {this.props.options && userInfo && userInfo.locations.parent_location_id && <span className={styles.user_location1}>{this.props.options[userInfo.locations.parent_location_id].name}</span>}
                            {this.props.options && userInfo && !userInfo.locations.parent_location_id && <span className={styles.user_location1}>{this.props.options[userInfo.locations.location_id].name}</span>}
                            <img src={require('@/assets/shared/arrow-down.png')} className={styles.dropdown_arrow} />
                        </div>
                        {this.state.dropdownOpen && <div className={`${styles.user_location1_dropdown} ${styles.dropdown_list}`} onClick={this.toggleDropdown}>
                            {this.props.options.map((location) => {
                                if (location.level === 1) {
                                    return <div className={styles.user_location1_dropdown_option} key={location.id} id="location_parent_id" val={location.id} onClick={state.methods.changeParentLocation} >
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

export default StateDropdown
