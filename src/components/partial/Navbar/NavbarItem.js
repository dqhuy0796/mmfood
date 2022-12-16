import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarItem.module.scss';
import classNames from 'classnames/bind';

const cb = classNames.bind(styles);

class NavbarItem extends React.Component {
    state = {};
    render() {
        return (
            <div className={cb('nav-item')}>
                <NavLink
                    to={this.props.path}
                    className={({ isActive }) => (isActive ? cb('nav-link', 'actived') : cb('nav-link'))}
                >
                    {this.props.title}
                </NavLink>
            </div>
        );
    }
}

export default NavbarItem;
