import _ from 'lodash';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Loading from '~/components/partial/Loading';
import TransparentButton from '~/components/shared/TransparentButton';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import { fetchAddresses, setSelectedAddress } from '~/redux/actions/authActions';
import AddressBookItem from './AddressBookItem';
// styles
import classNames from 'classnames/bind';
import styles from './AddressBook.module.scss';
const scss = classNames.bind(styles);

class AddressBook extends React.Component {
    state = {
        isNowLoading: false,
    };

    componentDidMount() {
        if (_.isEmpty(this.props.addresses)) {
            this.handleFetchAddresses();
        }
    }

    handleFetchAddresses = async () => {
        this.setState({ isNowLoading: true });

        await this.props.getAddresses();

        setTimeout(() => {
            this.setState({ isNowLoading: false });
        }, 1000);
    };

    handleOnClickRedirectToCreate = () => {
        this.props.setSelectedAddress();
        this.props.navigate(routes.createAddress);
    };

    render() {
        const { addresses } = this.props;
        return (
            <div className={scss('wrapper')}>
                <div className={scss('greeting')}>
                    <p>Địa chỉ giao hàng</p>
                    <TransparentButton onClick={this.handleOnClickRedirectToCreate}>
                        <BiPlus />
                        <span>Địa chỉ mới</span>
                    </TransparentButton>
                </div>

                <div className={scss('main')}>
                    <ul className={scss('addresses')}>
                        {!_.isEmpty(addresses) ? (
                            addresses.map((address, index) => (
                                <li key={index}>
                                    <AddressBookItem data={address} />
                                </li>
                            ))
                        ) : (
                            <li>Chưa có địa chỉ nhận hàng nào</li>
                        )}
                    </ul>
                </div>

                {this.state.isNowLoading && <Loading />}

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeButton={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
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

export default connect(mapStateToProps, mapActionsToProps)(withRouter(AddressBook));
