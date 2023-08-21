import React from 'react';
import AddressCard from '~/components/partial/AddressCard';
import TransparentButton from '~/components/shared/TransparentButton';
import SelectAddressModal from '../../components/modals/SelectAddressModal';
import Subtitle from './Subtitle';
//redux
//styles
import classNames from 'classnames/bind';
import styles from './CheckoutAddressSelection.module.scss';
const scss = classNames.bind(styles);

class CheckoutAddressSelection extends React.Component {
    state = {
        isActiveModal: false,
    };

    handleActiveModal = () => {
        this.setState((prevState) => ({
            isActiveModal: !prevState.isActiveModal,
        }));
    };

    handleSelectAddress = (selectedAddress) => {
        this.props.onSelectAddress(selectedAddress);
    };

    render() {
        const { data } = this.props;
        return (
            <div className={scss('address')}>
                <div className={scss('header')}>
                    <Subtitle text={'Địa chỉ giao hàng'} />
                    <TransparentButton onClick={this.handleActiveModal}>
                        <span>Xem tất cả</span>
                    </TransparentButton>
                </div>
                <div className={scss('body')}>
                    <AddressCard data={data} selected={true} />
                </div>

                {this.state.isActiveModal && (
                    <SelectAddressModal
                        selected={data}
                        onActiveModal={this.handleActiveModal}
                        onSelectAddress={this.props.onSelectAddress}
                    />
                )}
            </div>
        );
    }
}

export default CheckoutAddressSelection;
