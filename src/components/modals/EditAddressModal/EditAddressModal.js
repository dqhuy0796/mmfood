import classNames from 'classnames/bind';
import React from 'react';
import { MdAddLocation, MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import BaseRightSideModal from '../BaseRightSideModal';
import styles from './EditAddressModal.module.scss';

const cb = classNames.bind(styles);

class EditAddressModal extends React.Component {
    state = {
        address: [
            {
                id: 1,
                name: 'Đồng Quốc Huy',
                phone: '0985 805 096',
                address: 'Tổ 4, Phường Tân Thịnh, Thành phố Thái Nguyên',
                default: false,
            },
            {
                id: 2,
                name: 'Đồng Quốc Huy',
                phone: '0985 805 096',
                address: 'Trường ĐH CNTT, Đường z115, Thành phố Thái Nguyên',
                default: true,
            },
            {
                id: 3,
                name: 'Đồng Quốc Huy',
                phone: '0985 805 096',
                address: 'Thôn 6, xã Trung Môn, huyện Yên Sơn, tỉnh Tuyên Quang',
                default: false,
            },
        ],
    };

    handleSelectAddress = (id) => {
        // let selectedAddress = this.state.address.filter((item) => item.id === id)[0];
        // console.log(selectedAddress);
    };

    render() {
        return (
            <BaseRightSideModal title={'Địa chỉ nhận hàng'} handleCollapseModal={this.props.handleCollapseModal}>
                <div className={cb('container')}>
                    <div className={cb('header')}>
                        <TransparentButton onClick={() => {}}>
                            <MdAddLocation />
                            <span>Thêm địa chỉ mới</span>
                        </TransparentButton>
                    </div>
                    <ul className={cb('body')}>
                        {this.state.address.map((item, index) => (
                            <li key={index}>
                                <AddressDetail data={item} handleOnClick={this.handleSelectAddress(item.id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </BaseRightSideModal>
        );
    }
}

const AddressDetail = (props) => (
    <div className={cb('address-detail')} onClick={props.handleOnClick}>
        <div className={cb('check')}>
            {props.isChecked ? <MdCheckCircle style={{ color: 'var(--color-green)' }} /> : <MdRadioButtonUnchecked />}
        </div>
        <div className={cb('detail')}>
            <ul>
                <li>
                    <p>{props.data.name}</p>
                </li>
                <li>
                    <p>{props.data.phone}</p>
                </li>
                <li>
                    <p>{props.data.address}</p>
                </li>
                {props.data.default && (
                    <li>
                        <span className={cb('default-address')}>Địa chỉ nhận hàng mặc định</span>
                    </li>
                )}
            </ul>
        </div>
    </div>
);

export default EditAddressModal;
