import React from 'react';
import classNames from 'classnames/bind';
import styles from './TransparentButton.module.scss';
import { Link } from 'react-router-dom';

const scss = classNames.bind(styles);

class TransparentButton extends React.Component {
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
        if (this.props.onClick) {
            this.setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    onClick: this.props.onClick,
                },
            }));
        }
        this.setState((prevState) => ({
            ...prevState,
            className: ['wrapper', this.props.className, this.props.size, this.props.shape, this.props.color],
        }));
    };

    render() {
        return (
            <this.state.element className={scss(...this.state.className)} {...this.state.options}>
                {this.props.children}
            </this.state.element>
        );
    }
}

export default TransparentButton;
