import classNames from 'classnames/bind';
import React from 'react';
import CartItem from '~/components/partial/CartItem';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import DeliveryAddress from './DeliveryAddress';
import DeliveryMethod from './DeliveryMethod';
import PaymentDetail from './PaymentDetail';
import PaymentMethod from './PaymentMethod';
import styles from './Checkout.module.scss';

const cb = classNames.bind(styles);

const cartItems = [
    {
        id: 1003,
        name: 'bánh canh ghẹ (đặt biệt)',
        oldPrice: 85000,
        newPrice: 75000,
        size: 'vừa',
        description: 'ngon vl',
        url: 'https://res.cloudinary.com/dqhuy/image/upload/v1667639893/MMFood/Food/banh-canh-dacbiet_nkjhsy.jpg',
    },
    {
        id: 2004,
        name: "trà sữa trân châu M'M",
        oldPrice: 35000,
        newPrice: 35000,
        size: 'vừa',
        description: 'ngon vắt lưỡi',
        url: 'https://res.cloudinary.com/dqhuy/image/upload/v1667640606/MMFood/Drink/trasua-tranchau_lcaggq.jpg',
    },
];

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
                            <DeliveryPackage />
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

export default Checkout;

const DeliveryPackage = (props) => (
    <div className={cb('cart')}>
        <p className={cb('title')}>
            <span>Địa chỉ giao hàng</span>
        </p>
        <ul>
            {cartItems.map((item, index) => (
                <li key={index}>
                    <CartItem data={item} />
                </li>
            ))}
        </ul>
    </div>
);
