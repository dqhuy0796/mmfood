import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarItem.module.scss';
import classNames from 'classnames/bind';

const scss = classNames.bind(styles);

class NavbarItem extends React.Component {
    state = {};
    render() {
        return (
            <div className={scss('nav-item')}>
                <NavLink
                    to={this.props.path}
                    className={({ isActive }) => (isActive ? scss('nav-link', 'actived') : scss('nav-link'))}
                >
                    {this.props.title}
                </NavLink>
            </div>
        );
    }
}

export default NavbarItem;
