import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import CartModal from '~/components/modals/CartModal';
import AccountDropdown from '~/components/partial/AccountDropdown/AccountDropdown';
import Navbar from '~/components/partial/Navbar';
import HamburgerButton from '~/components/shared/buttons/HamburgerButton';
import IconButton from '~/components/shared/buttons/IconButton';
import LogoFull from '~/components/shared/Logo/LogoFull';
//redux
import { connect } from 'react-redux';
//styles
import classNames from 'classnames/bind';
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
                    <div className={cb('action')}>
                        <AccountDropdown />
                        <IconButton
                            size={'large'}
                            shape={'round'}
                            color={'transparent'}
                            onClick={this.handleCollapseModal}
                            value={this.props.cart.quantity}
                        >
                            <HiOutlineShoppingBag />
                        </IconButton>
                    </div>
                    {this.state.isModalActive && <CartModal handleCollapseModal={this.handleCollapseModal} />}
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    // cartAdd,
    // cartRemove,
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
