import classNames from 'classnames/bind';
import React from 'react';
import { FaMap } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { withRouter } from '~/hoc/withRouter';
import { connect } from 'react-redux';
import { setSelectedAddress } from '~/redux/actions/authActions';
import TransparentButton from '~/components/shared/TransparentButton';
import routes from '~/config';
import styles from './AddressBookItem.module.scss';
const scss = classNames.bind(styles);

class AddressBookItem extends React.Component {
    state = {};

    handleOnClickEditAddress = () => {
        if (this.props.data) {
            this.props.setSelectedAddress(this.props.data);
            this.props.navigate(routes.editAddress.replace(':id', this.props.data.id));
        } else {
            this.props.setSelectedAddress();
            this.props.navigate(routes.createAddress);
        }
    };

    render() {
        const data = this.props.data;

        return (
            <div className={scss('wrapper')}>
                <div className={scss('detail')}>
                    <div className={scss('icon')}>
                        <span>
                            <MdLocationPin />
                        </span>
                        <span>
                            <FaMap />
                        </span>
                    </div>
                    <div className={scss('content')}>
                        <div className={scss('top')}>
                            <div className={scss('info')}>
                                <p>{data.receiverName}</p>
                                <p>{data.receiverPhoneNumber}</p>
                            </div>
                            <TransparentButton onClick={this.handleOnClickEditAddress}>
                                <span>Chỉnh sửa</span>
                            </TransparentButton>
                        </div>
                        <div className={scss('address')}>
                            <p>{`${data.details},`}</p>
                            <p>{`${data.ward}, ${data.district}, ${data.province}`}</p>
                        </div>
                        {data.isDefault && (
                            <div className={scss('default-address')}>
                                <span>Địa chỉ nhận hàng mặc định</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    setSelectedAddress: (data) => dispatch(setSelectedAddress(data)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(AddressBookItem));
