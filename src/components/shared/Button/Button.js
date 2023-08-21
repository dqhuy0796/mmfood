import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const scss = classNames.bind(styles);

class Button extends React.Component {
    state = {
        element: 'button',
        className: [],
    };

    componentDidMount() {
        this.handleSetButtonOption();
    }

    handleSetButtonOption = () => {
        if (this.props.to) {
            this.setState((prevState) => ({
                ...prevState,
                element: Link,
            }));
        } else if (this.props.href) {
            this.setState((prevState) => ({
                ...prevState,
                element: 'a',
            }));
        }
        this.setState((prevState) => ({
            ...prevState,
            className: ['wrapper', this.props.className, this.props.size, this.props.shape, this.props.color],
        }));
    };

    render() {
        return (
            <this.state.element {...this.props} className={scss(...this.state.className)}>
                {this.props.children}
            </this.state.element>
        );
    }
}

Button.propTypes = {
    size: PropTypes.string,
    widthfull: PropTypes.bool,
    color: PropTypes.string,
    shape: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Button;
