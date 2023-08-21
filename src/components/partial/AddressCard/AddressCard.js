import classNames from 'classnames/bind';
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import styles from './AddressCard.module.scss';
const scss = classNames.bind(styles);

class AddressCard extends React.Component {
    state = {};
    render() {
        const { data, selected } = this.props;
        return (
            <div className={scss('wrapper', selected ? 'selected' : null)}>
                <div className={scss('check')}>{selected ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}</div>
                <ul className={scss('detail')}>
                    <li>{data.receiverName}</li>
                    <li>{data.receiverPhoneNumber}</li>
                    <li>{data.details}</li>
                    <li>{`${data.ward}, ${data.district}, ${data.province}`}</li>
                    {data.isDefault && (
                        <li>
                            <span className={scss('default-address')}>Địa chỉ nhận hàng mặc định</span>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default AddressCard;
