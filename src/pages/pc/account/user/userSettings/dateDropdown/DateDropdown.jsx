import React, { Component } from 'react'
import styles from './DateDropdown.module.css'
import { UserConsumer } from '../../UserContext'

export class DateDropdown extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            dropdownOpen: false,
        }
    }


    toggleDropdown = () => {
        this.setState((prevState) => ({dropdownOpen: !prevState.dropdownOpen}))
    }
    

    render() {
        return (
            <UserConsumer>
                {(state) => {
                    return <div className={styles.date_holder}>
                        <div className={`${styles.date_open} ${styles.dropdown_open}`} onClick={this.toggleDropdown} >
                            <span className={styles.date}>{this.props.date}</span>
                            <img src={require('@/assets/shared/arrow-down.png')} className={styles.dropdown_arrow} />
                        </div>
                        {this.state.dropdownOpen && <div className={`${styles.date_dropdown} ${styles.dropdown_list}`} onClick={this.toggleDropdown} >
                            <div className={styles.date_dropdown_option} id={this.props.id} val="" onClick={state.methods.changeDate} >
                                <span>---</span>
                            </div>
                            {(this.props.dropdown).map((item) => {
                                return <div className={styles.date_dropdown_option} id={this.props.id} val={item} key={item} onClick={state.methods.changeDate} >
                                    <span>{item}</span>
                                </div>
                            })}
                        </div>}
                    </div>
                }}
            </UserConsumer>
        )
    }
}

export default DateDropdown
