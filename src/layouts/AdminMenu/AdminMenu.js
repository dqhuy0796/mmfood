import classNames from 'classnames/bind';
import React from 'react';
import { TbTag } from 'react-icons/tb';
import { MdOutlineFastfood } from 'react-icons/md';
import { RiUserSettingsLine, RiUserStarLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { TfiDashboard } from 'react-icons/tfi';
import { NavLink } from 'react-router-dom';
import HamburgerButton from '~/components/shared/buttons/HamburgerButton';
import config from '~/config';
import LogoFull from '~/components/shared/Logo/LogoFull';
import styles from './AdminMenu.module.scss';

const cb = classNames.bind(styles);

const menu = [
    { icon: <TfiDashboard />, title: 'bảng điều khiển', path: config.routes.dashboard },
    { icon: <RiUserSettingsLine />, title: 'tài khoản', path: config.routes.users },
    { icon: <RiUserStarLine />, title: 'khách hàng', path: config.routes.customers },
    { icon: <MdOutlineFastfood />, title: 'sản phẩm', path: config.routes.products },
    { icon: <TbTag />, title: 'đơn hàng', path: config.routes.orders },
    { icon: <TbTag />, title: 'bài viết', path: config.routes.posts },
];

class AdminMenu extends React.Component {
    state = {
        isMobileMenuOpening: false,
    };

    handleCollapseMenu = () => {
        this.setState((prevState) => ({
            ...prevState,
            isMobileMenuOpening: !prevState.isMobileMenuOpening,
        }));
    };

    render() {
        return (
            <div className={cb('menu', this.state.isMobileMenuOpening && 'collapse')}>
                <div className={cb('navbar')}>
                    <ul>
                        <li>
                            <HamburgerButton
                                color={'white'}
                                onClick={this.handleCollapseMenu}
                                isCollapsed={this.state.isMobileMenuOpening}
                            />
                            <span className={cb('logo')}>MMFood</span>
                        </li>
                        {menu.map((item, index) => (
                            <li key={index}>
                                <MenuItem path={item.path} icon={item.icon} title={item.title} />
                            </li>
                        ))}
                        <li>
                            <MenuItem path={config.routes.login} icon={<RiLogoutBoxRLine />} title="đăng xuất" />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const MenuItem = (props) => (
    <NavLink to={props.path} className={({ isActive }) => (isActive ? cb('menu-link', 'actived') : cb('menu-link'))}>
        <span className={cb('icon')}>{props.icon}</span>
        <span className={cb('title')}>{props.title}</span>
    </NavLink>
);

export default AdminMenu;
