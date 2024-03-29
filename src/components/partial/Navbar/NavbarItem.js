import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarItem.module.scss';
import classNames from 'classnames/bind';
import { BsChevronDown } from 'react-icons/bs';

const scss = classNames.bind(styles);

class NavbarItem extends React.Component {
    state = {
        isOpenDropdown: false,
    };

    handleToggleDropdown = () => {
        this.setState((prevState) => ({
            ...prevState,
            isOpenDropdown: !prevState.isOpenDropdown,
        }));
    };

    render() {
        const data = this.props.data;

        if (data.menu) {
            return (
                <div className={scss('nav-item')}>
                    <div className={scss('menu')}>
                        <div className={scss('collapse')}>
                            <NavLink
                                to={data.path}
                                className={({ isActive }) =>
                                    isActive ? scss('nav-link', 'actived') : scss('nav-link')
                                }
                            >
                                {data.title}
                            </NavLink>
                            <div className={scss('icon')} onClick={this.handleToggleDropdown}>
                                <BsChevronDown />
                            </div>
                        </div>

                        <div className={scss('dropdown')}>
                            {data.menu.map((item, index) => {
                                if (item.onClick) {
                                    return (
                                        <div key={index} className={scss('nav-link')} onClick={item.onClick}>
                                            {item.title}
                                        </div>
                                    );
                                }

                                return (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            isActive ? scss('nav-link', 'actived') : scss('nav-link')
                                        }
                                    >
                                        {item.title}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={scss('nav-item')}>
                <NavLink
                    to={data.path}
                    className={({ isActive }) => (isActive ? scss('nav-link', 'actived') : scss('nav-link'))}
                >
                    {data.title}
                </NavLink>
            </div>
        );
    }
}

export default NavbarItem;
