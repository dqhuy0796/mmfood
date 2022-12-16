import classNames from 'classnames/bind';
import React from 'react';
import EditAddressModal from '~/components/modals/EditAddressModal';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import styles from './DeliveryAddress.module.scss';

const cb = classNames.bind(styles);

const customer = {
    name: 'Sam Quoc Anh',
    phone: '0988 999 555',
    address: 'Tổ 4, phường Tân Thịnh, thành phố Thái Nguyên',
};

class DeliveryAddress extends React.Component {
    state = {
        isModalActive: false,
    };

    handleCollapseModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            isModalActive: !prevState.isModalActive,
        }));
    };

    render() {
        return (
            <div className={cb('address')}>
                <div className={cb('header')}>
                    <p className={cb('title')}>
                        <span>Địa chỉ giao hàng</span>
                    </p>
                    <TransparentButton onClick={this.handleCollapseModal}>
                        <span>Chỉnh sửa</span>
                    </TransparentButton>

                    {this.state.isModalActive && <EditAddressModal handleCollapseModal={this.handleCollapseModal} />}
                </div>
                <ul className={cb('body')}>
                    <li>
                        <p>{customer.name}</p>
                    </li>
                    <li>
                        <p>{customer.phone}</p>
                    </li>
                    <li>
                        <p>{customer.address}</p>
                    </li>
                </ul>
                <div className={cb('footer')}></div>
            </div>
        );
    }
}

export default DeliveryAddress;
