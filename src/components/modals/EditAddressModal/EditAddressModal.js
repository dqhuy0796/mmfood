import classNames from 'classnames/bind';
import React from 'react';
import { MdAddLocation } from 'react-icons/md';
import Button from '~/components/shared/buttons/Button';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import BaseRightSideModal from '../BaseRightSideModal';
import AddressDetail, { NewAddressDetail } from '~/components/partial/AddressDetail';
import styles from './EditAddressModal.module.scss';
import _ from 'lodash';
const cb = classNames.bind(styles);
class EditAddressModal extends React.Component {
    state = {
        listAddress: [],
        createNewAddress: false,
        message: '',
    };

    componentDidMount = () => {
        // const listAddressProps = this.props.data.map(
        //     (item, index) => (item = { ...item, onClick: () => this.handleOnClickSelectAddress(index) }),
        // );
        this.setState((prevState) => ({
            ...prevState,
            listAddress: this.props.data,
        }));
    };

    handleOnClickCreateAddress = (data) => {
        this.setState((prevState) => ({
            ...prevState,
            createNewAddress: !prevState.createNewAddress,
        }));
        if (data && !_.isEmpty(data)) {
            this.props.handleAddNewAddress(data);
        }
    };

    handleOnClickSelectAddress = (index) => {
        let newListAddress = this.state.listAddress;
        newListAddress.map((address) => (address.selected = false));
        newListAddress[index].selected = true;
        this.setState((prevState) => ({
            ...prevState,
            listAddress: newListAddress,
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleUpdateAddress(this.state.listAddress);
    };

    render() {
        return (
            <BaseRightSideModal title={'Địa chỉ nhận hàng'} handleCollapseModal={this.props.handleCollapseModal}>
                <form className={cb('container')} onSubmit={this.handleSubmit}>
                    <div className={cb('header')}>
                        <TransparentButton onClick={() => this.handleOnClickCreateAddress()}>
                            <MdAddLocation />
                            <span>Thêm địa chỉ mới</span>
                        </TransparentButton>
                    </div>
                    <ul className={cb('body')}>
                        {this.state.listAddress.map((item, index) => (
                            <li key={index}>
                                <AddressDetail data={item} />
                            </li>
                        ))}
                        {this.state.message && <p className={cb('message')}>{this.state.message}</p>}
                        {this.state.createNewAddress && (
                            <li>
                                <NewAddressDetail handleOnClickCreateAddress={this.handleOnClickCreateAddress} />
                            </li>
                        )}
                    </ul>
                    <div className={cb('footer')}>
                        <label>
                            <input type={'submit'} hidden />
                            <Button size={'medium'} shape={'rounded'} color={'info'}>
                                <span>Xác nhận</span>
                            </Button>
                        </label>
                        <Button size={'medium'} shape={'rounded'} onClick={this.props.handleCollapseModal}>
                            <span>Hủy</span>
                        </Button>
                    </div>
                </form>
            </BaseRightSideModal>
        );
    }
}

export default EditAddressModal;
