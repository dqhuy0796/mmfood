import React from 'react';
import EditAddressModal from '~/components/modals/EditAddressModal';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
//redux
import { connect } from 'react-redux';
import { login } from '~/redux/actions/authActions';
//style
import classNames from 'classnames/bind';
import styles from './DeliveryAddress.module.scss';

const cb = classNames.bind(styles);

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
                        <p>{this.props.currentUser.name}</p>
                    </li>
                    <li>
                        <p>{this.props.currentUser.phone}</p>
                    </li>
                    <li>
                        <p>{this.props.currentUser.address}</p>
                    </li>
                </ul>
                <div className={cb('footer')}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
});

const mapActionsToProps = (action) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(DeliveryAddress);
