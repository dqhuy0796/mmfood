import classNames from 'classnames/bind';
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import Subtitle from './Subtitle';
import styles from './DeliveryMethod.module.scss';

const scss = classNames.bind(styles);

class DeliveryMethod extends React.Component {
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
                            name: 'Ship luôn và ngay!',
                        }}
                    />
                    <DeliveryServiceItem
                        selected={false}
                        data={{
                            price: 10000,
                            date: this.getTomorrow(),
                            name: 'Ngày mai hãy ship!',
                        }}
                    />
                </div>
            </div>
        );
    }
}
const DeliveryServiceItem = (props) => (
    <div className={scss('delivery-item', props.selected && 'selected')} onClick={props.onClick}>
        <div className={scss('check')}>{props.selected ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}</div>
        <ul>
            <li>
                <span>
                    <ItemPrice value={props.data.price} />
                </span>
            </li>
            <li>
                <span>"{props.data.name}"</span>
            </li>
            <li>
                <span>Nhận vào: {props.data.date}</span>
            </li>
        </ul>
    </div>
);
export default DeliveryMethod;

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;
