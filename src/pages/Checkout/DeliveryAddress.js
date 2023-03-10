import React from 'react';
import EditAddressModal from '~/components/modals/EditAddressModal';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import Subtitle from './Subtitle';
//redux
import { connect } from 'react-redux';
//style
import classNames from 'classnames/bind';
import styles from './DeliveryAddress.module.scss';
import AddressDetail from '~/components/partial/AddressDetail';

const scss = classNames.bind(styles);

class DeliveryAddress extends React.Component {
    state = {
        modal: {
            active: false,
        },
        listUserAddress: [],
        selectedAddress: {},
    };

    componentDidMount() {
        this.setState((prevState) => ({
            ...prevState,
            listUserAddress: [
                {
                    ...this.props.data,
                    selected: true,
                    default: true,
                },
            ],
            selectedAddress: {
                ...this.props.data,
                selected: true,
                default: true,
            },
        }));
    }
    handleCollapseModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modal: {
                active: !prevState.modal.active,
                data: this.state.listUserAddress,
            },
        }));
    };
    handleUpdateAddress = (listAddress) => {
        this.setState((prevState) => ({
            ...prevState,
            listUserAddress: listAddress,
            selectedAddress: listAddress.find((item) => item.selected === true),
        }));
    };
    handleAddNewAddress = (address) => {
        this.setState((prevState) => ({
            ...prevState,
            listUserAddress: [...prevState.listUserAddress, address],
        }));
        console.log('handle add new', this.state.listUserAddress);
    };
    handleSelectAddress = (index) => {
        let newListAddress = this.state.listUserAddress;
        newListAddress.map((address) => (address.selected = false));
        newListAddress[index].selected = true;
        this.setState((prevState) => ({
            ...prevState,
            listUserAddress: newListAddress,
        }));
    };

    render() {
        return (
            <div className={scss('address')}>
                <div className={scss('header')}>
                    <Subtitle text={'?????a ch??? giao h??ng'} />

                    <TransparentButton onClick={this.handleCollapseModal}>
                        <span>Ch???nh s???a</span>
                    </TransparentButton>

                    {this.state.modal.active && (
                        <EditAddressModal
                            {...this.state.modal}
                            handleAddNewAddress={this.handleAddNewAddress}
                            handleUpdateAddress={this.handleUpdateAddress}
                            handleCollapseModal={this.handleCollapseModal}
                        />
                    )}
                </div>
                <ul className={scss('body')}>
                    <AddressDetail data={this.state.selectedAddress} />
                </ul>
                <div className={scss('footer')}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(DeliveryAddress);
