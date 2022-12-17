import classNames from 'classnames/bind';
import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import CartModal from '~/components/modals/CartModal';
import Navbar from '~/components/partial/Navbar';
import HamburgerButton from '~/components/shared/buttons/HamburgerButton';
import IconButton from '~/components/shared/buttons/IconButton';
import LogoFull from '~/components/shared/Logo/LogoFull';
import styles from './Header.module.scss';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (action) => ({
    // cartAdd,
    // cartRemove,
});

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
                        onClick={this.handleCollapseModal}
                        value={this.props.cart.quantity}
                    >
                        <HiOutlineShoppingBag />
                    </IconButton>
                    {this.state.isModalActive && <CartModal handleCollapseModal={this.handleCollapseModal} />}
                </div>
            </header>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Header);
