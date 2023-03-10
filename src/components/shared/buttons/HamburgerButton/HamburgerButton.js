import React from 'react';
import classNames from 'classnames/bind';
import styles from './HamburgerButton.module.scss';

const scss = classNames.bind(styles);

class HamburgerButton extends React.Component {
    render() {
        return (
            <div
                className={scss('wrapper', this.props.className, this.props.color, this.props.isCollapsed && 'open')}
                onClick={this.props.onClick}
            >
                <span></span>
            </div>
        );
    }
}

export default HamburgerButton;
