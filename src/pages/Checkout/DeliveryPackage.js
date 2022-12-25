import classNames from 'classnames/bind';
import React from 'react';
import CartItem from '~/components/partial/CartItem';
import Subtitle from './Subtitle';
//redux

import styles from './DeliveryPackage.module.scss';

const cb = classNames.bind(styles);

class DeliveryPackage extends React.Component {
    state = {};
    render() {
        return (
            <div className={cb('cart')}>
                <Subtitle text={'Danh sách sản phẩm'} />
                <ul>
                    {this.props.data && this.props.data.length > 0 ? (
                        this.props.data.map((item, index) => (
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
    }
}

export default DeliveryPackage;
