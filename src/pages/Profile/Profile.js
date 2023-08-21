import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/partial/Loading';
import OrderCardMinimalist from '~/components/partial/OrderCardMinimalist/OrderCardMinimalist';
import TransparentButton from '~/components/shared/TransparentButton';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import { fetchHistoryOrders } from '~/redux/actions/preloadActions';
// style
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const scss = classNames.bind(styles);
class Profile extends React.Component {
    state = {
        isNowLoading: false,
    };

    componentDidMount() {
        if (_.isEmpty(this.props.orders)) {
            this.handleFetchOrders();
        }
    }

    handleFetchOrders = async () => {
        this.setState({ isNowLoading: true });

        await this.props.fetchHistoryOrders();

        setTimeout(() => {
            this.setState({ isNowLoading: false });
        }, 1000);
    };

    render() {
        const { orders, user } = this.props;
        const defaultAddress = user.defaultDeliveryAddress;

        return (
            <>
                <div className={scss('wrapper')}>
                    <div className={scss('greeting')}>
                        <p>{`Hi, ${user.name}`}</p>
                    </div>

                    <div className={scss('profile')}>
                        <div className={scss('details')}>
                            <div className={scss('title')}>
                                <h3>Thông tin cá nhân</h3>
                                <TransparentButton to={routes.editProfile}>
                                    <span>Chỉnh sửa</span>
                                </TransparentButton>
                            </div>
                            <ul>
                                <li>{user.name}</li>
                                <li>{user.birth || '--:--:--'}</li>
                                <li>{user.email}</li>
                                <li>{user.phoneNumber}</li>
                            </ul>
                        </div>
                        <div className={scss('address')}>
                            <div className={scss('title')}>
                                <h3>Sổ địa chỉ</h3>
                                <TransparentButton to={routes.addresses}>
                                    <span>Chỉnh sửa</span>
                                </TransparentButton>
                            </div>
                            <ul>
                                <li>{defaultAddress.receiverName}</li>
                                <li>{defaultAddress.details}</li>
                                <li>{`${defaultAddress.ward}, ${defaultAddress.district}, ${defaultAddress.province}`}</li>
                                <li>{defaultAddress.receiverPhoneNumber}</li>
                                <li>
                                    <span className={scss('default-address')}>Địa chỉ nhận hàng mặc định</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={scss('orders')}>
                        <div className={scss('title')}>
                            <h3>Đơn hàng gần đây</h3>
                            <TransparentButton to={routes.orders}>
                                <span>Xem tất cả</span>
                            </TransparentButton>
                        </div>
                        <ul className={scss('products')}>
                            {orders && orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <li key={index}>
                                        <OrderCardMinimalist data={order} />
                                    </li>
                                ))
                            ) : (
                                <li>Không có đơn hàng nào</li>
                            )}
                        </ul>
                    </div>
                </div>

                {this.state.isNowLoading && <Loading />}

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={false}
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    orders: state.api.historyOrders,
});

const mapActionsToProps = (dispatch) => ({
    fetchHistoryOrders: (id) => dispatch(fetchHistoryOrders(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Profile));
