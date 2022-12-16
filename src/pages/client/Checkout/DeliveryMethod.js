import classNames from 'classnames/bind';
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import styles from './DeliveryMethod.module.scss';

const cb = classNames.bind(styles);

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
    handleSelectDeliveryService = (index) => {
        let temp = this.state.deliveryServices;
        temp.map((item) => (item.selected = false));
        // temp[index].selected = true;
        this.setState((prevState) => ({
            ...prevState,
            deliveryServices: temp,
        }));
    };

    render() {
        return (
            <div className={cb('delivery')}>
                <p className={cb('title')}>
                    <span>Tùy chọn giao hàng</span>
                </p>
                <div className={cb('container')}>
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
    <div className={cb('delivery-item', props.selected && 'selected')} onClick={props.onClick}>
        <div className={cb('check')}>{props.selected ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}</div>
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
