import React from 'react';
import { IoLockClosedSharp, IoSettingsOutline } from 'react-icons/io5';
import { IoMdLogOut } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderItem from '~/components/partial/OrderItem';
import IconButton from '~/components/shared/buttons/IconButton';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import config from '~/config';
import { withRouter } from '~/hoc/withRouter';
import DialogMessage from '~/components/partial/DialogMessage/DialogMessage';
import OrderDetailModal from '~/components/modals/OrderDetailModal';
import _ from 'lodash';
import { userService } from '~/services';
// redux and actions
import { connect } from 'react-redux';
import { logout } from '~/redux/actions/authActions';
import { fetchHistoryOrders } from '~/redux/actions/apiActions';
// style
import classNames from 'classnames/bind';
import styles from './Account.module.scss';

const css = classNames.bind(styles);
class Account extends React.Component {
    state = {
        subnav: [
            {
                title: 'Tất cả',
                selected: true,
            },
            {
                title: 'Chờ xử lý',
                selected: false,
            },
            {
                title: 'Đang giao',
                selected: false,
            },
            {
                title: 'Hoàn thành',
                selected: false,
            },
            {
                title: 'Đã hủy',
                selected: false,
            },
        ],
        orders: [],
        dialog: {
            active: false,
        },
        modal: {
            active: false,
        },
    };

    componentDidMount() {
        this.props.fetchHistoryOrders(this.props.currentUser.id);
    }
    handleLogOut = () => {
        this.props.logout();
        this.props.navigate(config.routes.home);
    };
    handleCancelOrder = async (uuid) => {
        let res = await userService.cancelOrderService(uuid);
        if (res && res.code === 0) {
            toast.success(`Đã hủy đơn hàng #${uuid}`);
            this.props.fetchHistoryOrders(this.props.currentUser.id);
        }
    };
    handleActiveModal = (data) => {
        // toggle (open/close) only
        this.setState((prevState) => ({
            ...prevState,
            modal: {
                active: !prevState.modal.active,
            },
        }));
        // map data
        if (data && !_.isEmpty(data)) {
            this.setState((prevState) => ({
                ...prevState,
                modal: {
                    ...prevState.modal,
                    data: data,
                },
            }));
        }
    };
    handleActiveDialog = (uuid) => {
        // toggle (open/close) only
        this.setState((prevState) => ({
            ...prevState,
            dialog: {
                active: !prevState.dialog.active,
            },
        }));
        // map data
        if (uuid) {
            this.setState((prevState) => ({
                ...prevState,
                dialog: {
                    ...prevState.dialog,
                    title: 'xác nhận hủy đơn',
                    message: `Bạn có chắc chắn muốn hủy đơn hàng #${uuid} `,
                    button: [
                        {
                            title: 'Xác nhận',
                            color: 'error',
                            onClick: () => {
                                this.handleActiveDialog();
                                this.handleCancelOrder(uuid);
                            },
                        },
                        {
                            title: 'Hủy',
                            color: 'cancel',
                            onClick: () => {
                                this.handleActiveDialog();
                            },
                        },
                    ],
                },
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                dialog: {
                    ...prevState.dialog,
                    title: 'Hệ thống',
                    message: 'Không khả dụng. Vui lòng quay lại sau.',
                },
            }));
        }
    };

    render() {
        const currentUser = this.props.currentUser;
        return (
            <>
                <Header />
                <div className={css('background')}>
                    <div className={css('wrapper')}>
                        <div className={css('header')}>
                            <div className={css('avatar')}>
                                <img src={currentUser.avatarUrl} alt={currentUser.name} />
                            </div>
                            <div className={css('detail')}>
                                <ul>
                                    <li>
                                        <p>{currentUser.name}</p>
                                    </li>
                                    <li>
                                        <p>{currentUser.email}</p>
                                    </li>
                                    <li>
                                        <p>{currentUser.phone}</p>
                                    </li>
                                    <li>
                                        <p>{currentUser.birth}</p>
                                    </li>
                                    <li>
                                        <p>{currentUser.address}</p>
                                    </li>
                                </ul>
                                <ul className={css('action')}>
                                    <li>
                                        <IconButton size={'medium'} shape={'round'} color={'blur'}>
                                            <IoSettingsOutline />
                                        </IconButton>
                                    </li>
                                    <li>
                                        <IconButton size={'medium'} shape={'round'} color={'blur'}>
                                            <IoLockClosedSharp />
                                        </IconButton>
                                    </li>
                                    <li>
                                        <IconButton
                                            size={'medium'}
                                            shape={'round'}
                                            color={'blur'}
                                            onClick={this.handleLogOut}
                                        >
                                            <IoMdLogOut />
                                        </IconButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={css('body')}>
                            <ul className={css('order-nav')}>
                                {this.state.subnav.map((item, index) => (
                                    <li key={index}>
                                        <p className={item.selected ? css('selected') : ''}>{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                            <ul className={css('list')}>
                                {this.props.historyOrders && this.props.historyOrders.length > 0 ? (
                                    this.props.historyOrders.map((item, index) => (
                                        <li key={index} className={css('order-item')}>
                                            <OrderItem
                                                data={item}
                                                handleActiveModal={this.handleActiveModal}
                                                handleActiveDialog={this.handleActiveDialog}
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <div className={css('empty')}>
                                        <p>Oh! Hình như bạn chưa có đơn hàng nào</p>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                {this.state.modal.active && (
                    <OrderDetailModal {...this.state.modal} handleActiveModal={this.handleActiveModal} />
                )}

                {this.state.dialog.active && (
                    <DialogMessage {...this.state.dialog} handleActiveDialog={this.handleActiveDialog} />
                )}
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    historyOrders: state.api.historyOrders,
});

const mapActionsToProps = (dispatch) => ({
    fetchHistoryOrders: (id) => dispatch(fetchHistoryOrders(id)),
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Account));
