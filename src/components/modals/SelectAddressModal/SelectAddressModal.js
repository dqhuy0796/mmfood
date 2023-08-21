import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/shared/Button';
import TransparentButton from '~/components/shared/TransparentButton';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import { fetchAddresses, setSelectedAddress } from '~/redux/actions/authActions';
import BaseRightSideModal from '../BaseRightSideModal';
//styles
import classNames from 'classnames/bind';
import AddressCard from '../../partial/AddressCard/AddressCard';
import styles from './SelectAddressModal.module.scss';
const scss = classNames.bind(styles);
class SelectAddressModal extends React.Component {
    state = {
        isNowLoading: true,
        selectedAddress: {},
        addresses: [],
    };

    componentDidMount() {
        this.handleFetchAddresses();

        if (this.props.selected) {
            this.setState({ selectedAddress: this.props.selected });
        }
    }

    handleFetchAddresses = async () => {
        this.setState({ isNowLoading: true });

        await this.props.getAddresses();

        this.setState((prevState) => ({
            ...prevState,
            addresses: this.props.addresses,
        }));

        setTimeout(() => {
            this.setState({ isNowLoading: false });
        }, 1000);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSelectAddress(this.state.selectedAddress);
        this.props.onActiveModal();
    };

    handleOnClickRedirectToCreateAddress = () => {
        this.props.setSelectedAddress();
        this.props.navigate(routes.createAddress);
    };

    handleOnClickSelectAddress = (address) => {
        this.setState({ selectedAddress: address });
    };

    render() {
        const { onActiveModal } = this.props;
        const { addresses, selectedAddress } = this.state;
        return (
            <BaseRightSideModal title={'Địa chỉ nhận hàng'} handleCollapseModal={onActiveModal}>
                <form className={scss('container')} onSubmit={this.handleSubmit}>
                    <div className={scss('header')}>
                        <TransparentButton to={routes.editAddress}>
                            <span>Thêm địa chỉ mới</span>
                        </TransparentButton>
                    </div>

                    <ul className={scss('body')}>
                        {!_.isEmpty(addresses) &&
                            addresses.map((item, index) => (
                                <li key={index} onClick={() => this.handleOnClickSelectAddress(item)}>
                                    <AddressCard data={item} selected={item.id === selectedAddress.id} />
                                </li>
                            ))}
                    </ul>

                    <div className={scss('footer')}>
                        <Button size={'full'} shape={'rounded'} color={'primary'} type={'submit'}>
                            <span>Xác nhận</span>
                        </Button>
                        <Button size={'full'} shape={'rounded'} color={'cancel'} onClick={onActiveModal}>
                            <span>Hủy</span>
                        </Button>
                    </div>
                </form>
            </BaseRightSideModal>
        );
    }
}

const mapStateToProps = (state) => ({
    addresses: state.auth.addresses,
});

const mapActionsToProps = (dispatch) => ({
    getAddresses: () => dispatch(fetchAddresses()),
    setSelectedAddress: (data) => dispatch(setSelectedAddress(data)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(SelectAddressModal));
