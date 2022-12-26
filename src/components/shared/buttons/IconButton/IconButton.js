import React from 'react';
import classNames from 'classnames/bind';
import styles from './IconButton.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const cb = classNames.bind(styles);

class IconButton extends React.Component {
    state = {
        element: 'button',
        className: [],
        options: {},
    };

    componentDidMount() {
        this.handleSetButtonOption(this.props.options);
    }

    handleSetButtonOption = () => {
        if (this.props.to) {
            this.setState((prevState) => ({
                ...prevState,
                element: Link,
                options: {
                    ...prevState.options,
                    to: this.props.to,
                },
            }));
        }
        if (this.props.href) {
            this.setState((prevState) => ({
                ...prevState,
                element: 'a',
                options: {
                    ...prevState.options,
                    href: this.props.href,
                },
            }));
        }
        this.setState((prevState) => ({
            ...prevState,
            className: ['wrapper', this.props.className, this.props.size, this.props.shape, this.props.color],
            options: {
                ...prevState.options,
                onClick: this.props.onClick,
            },
        }));
    };

    render() {
        return (
            <this.state.element
                style={this.props.value && this.props.value > 0 ? {} : { overflow: 'hidden' }}
                className={cb(...this.state.className)}
                {...this.state.options}
            >
                {this.props.children}
                {this.props.value > 0 && (
                    <span className={cb('tag')}>{this.props.value < 10 ? this.props.value : '9+'}</span>
                )}
            </this.state.element>
        );
    }
}

IconButton.propTypes = {
    size: PropTypes.string.isRequired,
    color: PropTypes.string,
    shape: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default IconButton;
