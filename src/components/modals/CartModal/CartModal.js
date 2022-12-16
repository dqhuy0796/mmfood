import classNames from 'classnames/bind';
import React from 'react';
import CartItem from '~/components/partial/CartItem';
import Button from '~/components/shared/buttons/Button';
import config from '~/config';
import BaseRightSideModal from '../BaseRightSideModal';
import styles from './CartModal.module.scss';

const cb = classNames.bind(styles);

class CartModal extends React.Component {
    state = {
        cartItems: [
            {
                id: 1003,
                name: 'bánh canh ghẹ (đặc biệt)',
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
        ],
    };
    render() {
        return (
            <BaseRightSideModal title={'Giỏ hàng'} handleCollapseModal={this.props.handleCollapseModal}>
                <div className={cb('container')}>
                    <ul className={cb('body')}>
                        {this.state.cartItems.map((item, index) => (
                            <li key={index}>
                                <CartItem data={item} />
                            </li>
                        ))}
                    </ul>
                    <div className={cb('footer')}>
                        <Button size={'large'} shape={'pill'} color={'red'} to={config.routes.payment}>
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </BaseRightSideModal>
        );
    }
}

export default CartModal;
