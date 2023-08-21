import React from 'react';
import { BsBag } from 'react-icons/bs';
import CartModal from '~/components/modals/CartModal';
import Navbar from '~/components/partial/Navbar';
import HamburgerButton from '~/components/shared/HamburgerButton';
import IconButton from '~/components/shared/IconButton';
import LogoFull from '~/components/shared/Logo/LogoFull';
//redux
import { connect } from 'react-redux';
//styles
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const scss = classNames.bind(styles);
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
            <header className={scss('header')}>
                <div className={scss('wrapper')}>
                    <HamburgerButton
                        className={scss('hamburger-btn')}
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
                        value={this.props.cart.quantity}
                    >
                        <BsBag />
                    </IconButton>

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
