import classNames from 'classnames/bind';
import React from 'react';
import CartItem from '~/components/partial/CartItem';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import DeliveryAddress from './DeliveryAddress';
import DeliveryMethod from './DeliveryMethod';
import PaymentDetail from './PaymentDetail';
import PaymentMethod from './PaymentMethod';
//redux
import { connect } from 'react-redux';
import { login } from '~/redux/actions/authActions';

import styles from './Checkout.module.scss';

const cb = classNames.bind(styles);

class Checkout extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div className={cb('background')}>
                    <div className={cb('wrapper')}>
                        <div className={cb('left')}>
                            <DeliveryAddress />
                            <DeliveryMethod />
                            <DeliveryPackage items={this.props.cart.items} />
                        </div>

                        <div className={cb('right')}>
                            <PaymentMethod />
                            <PaymentDetail />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (action) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(Checkout);

const DeliveryPackage = (props) => (
    <div className={cb('cart')}>
        <p className={cb('title')}>
            <span>Đơn hàng</span>
        </p>
        <ul>
            {props.items && props.items.length > 0 ? (
                props.items.map((item, index) => (
                    <li key={index}>
                        <CartItem data={item} />
                    </li>
                ))
            ) : (
                <li className={cb('empty-cart')}>
                    <p>Chưa có sản phẩm</p>
                </li>
            )}
        </ul>
    </div>
);
