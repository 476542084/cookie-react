import React, { Component } from "react"
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'

/**
 * 按需异步加载模块
 * @param {*} importComponent 
 */
export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({ component });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent;
}