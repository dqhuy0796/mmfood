import classNames from 'classnames/bind';
import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Navbar from '~/components/partial/Navbar';
import HamburgerButton from '~/components/shared/buttons/HamburgerButton';
import LogoFull from '~/components/shared/Logo/LogoFull';
import IconButton from '~/components/shared/buttons/IconButton';
import CartModal from '~/components/modals/CartModal';
import styles from './Header.module.scss';

const cb = classNames.bind(styles);

class Header extends React.Component {
    state = {
        isModalActive: false,
        isMobileMenuOpening: false,
    };

    handleCollapseMenu = () => {
        this.setState((prevState) => ({
            ...prevState,
            isMobileMenuOpening: !prevState.isMobileMenuOpening,
        }));
    };

    handleCollapseModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            isModalActive: !prevState.isModalActive,
        }));
    };

    render() {
        return (
            <header className={cb('header')}>
                <div className={cb('wrapper')}>
                    <HamburgerButton
                        className={cb('hamburger-btn')}
                        onClick={this.handleCollapseMenu}
                        isCollapsed={this.state.isMobileMenuOpening}
                    />
                    <LogoFull />
                    <Navbar isCollapsed={this.state.isMobileMenuOpening} />
                    <IconButton
                        size={'large'}
                        shape={'round'}
                        color={'transparent'}
                        onClick={this.handleCollapseModal}
                        value={22}
                    >
                        <HiOutlineShoppingBag />
                    </IconButton>
                    {this.state.isModalActive && <CartModal handleCollapseModal={this.handleCollapseModal} />}
                </div>
            </header>
        );
    }
}

export default Header;
