import React from 'react';
import classNames from 'classnames/bind';
import styles from './IconButton.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const scss = classNames.bind(styles);

class IconButton extends React.Component {
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
            <this.state.element
                style={this.props.value && this.props.value > 0 ? {} : { overflow: 'hidden' }}
                className={scss(...this.state.className)}
                {...this.props}
            >
                {this.props.children}
                {this.props.value > 0 && (
                    <span className={scss('tag')}>{this.props.value < 10 ? this.props.value : '9+'}</span>
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
