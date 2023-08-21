import classNames from 'classnames/bind';
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import Subtitle from './Subtitle';
import styles from './CheckoutDeliveryMethod.module.scss';

const scss = classNames.bind(styles);

class CheckoutDeliveryMethod extends React.Component {
    state = {
        selected: {},
    };
    getToday = () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        return `${day}/${month}/${year}`;
    };
    getTomorrow = () => {
        let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    render() {
        return (
            <div className={scss('delivery')}>
                <Subtitle text={'Tùy chọn giao hàng'} />
                <div className={scss('container')}>
                    <DeliveryServiceItem
                        selected={true}
                        data={{
                            price: 20000,
                            date: this.getToday(),
                            name: 'Giao hàng nhanh!',
                        }}
                    />
                </div>
            </div>
        );
    }
}

const DeliveryServiceItem = (props) => {
    const priceString = props.data.price.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' });
    return (
        <div className={scss('delivery-item', props.selected && 'selected')} onClick={props.onClick}>
            <ul>
                <li>
                    <span>{priceString}</span>
                </li>
                <li>
                    <span>"{props.data.name}"</span>
                </li>
                <li>
                    <span>Nhận vào: {props.data.date}</span>
                </li>
            </ul>
            <div className={scss('check')}>{props.selected ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}</div>
        </div>
    );
};

export default CheckoutDeliveryMethod;
