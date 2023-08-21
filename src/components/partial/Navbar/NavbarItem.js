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
        return (
            <div className={scss('nav-item')}>
                {data.menu ? (
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
                            {data.menu.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive ? scss('nav-link', 'actived') : scss('nav-link')
                                    }
                                >
                                    {item.title}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ) : (
                    <NavLink
                        to={data.path}
                        className={({ isActive }) => (isActive ? scss('nav-link', 'actived') : scss('nav-link'))}
                    >
                        {data.title}
                    </NavLink>
                )}
            </div>
        );
    }
}

export default NavbarItem;
