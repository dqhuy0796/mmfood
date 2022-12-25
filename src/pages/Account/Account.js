import React from 'react';
import { IoLockClosedSharp, IoSettingsOutline } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '~/components/shared/buttons/IconButton';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
// redux and actions
import { connect } from 'react-redux';
import { fetchHistoryOrders } from '~/redux/actions/apiActions';
import { logout } from '~/redux/actions/authActions';
// style
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import OrderItem from '../../components/partial/OrderItem/OrderItem';

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
    };

    componentDidMount() {
        this.props.fetchHistoryOrders(this.props.currentUser.id);
    }

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
                                        <IconButton size={'tiny'} shape={'round'} color={'blur'}>
                                            <IoSettingsOutline />
                                        </IconButton>
                                    </li>
                                    <li>
                                        <IconButton size={'tiny'} shape={'round'} color={'blur'}>
                                            <IoLockClosedSharp />
                                        </IconButton>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={css('body')}>
                            <ul className={css('order-nav')}>
                                {this.state.subnav.map((item, index) => (
                                    <li key={index}>
                                        <p className={item.selected && css('selected')}>{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                            <ul className={css('list')}>
                                {this.props.historyOrders && this.props.historyOrders.length > 0 ? (
                                    this.props.historyOrders.map((item, index) => (
                                        <li key={index} className={css('order-item')}>
                                            <OrderItem data={item} />
                                        </li>
                                    ))
                                ) : (
                                    <div className={css('empty')}>
                                        <p>Oh! Hình như bạn chưa có đơn hàng nào</p>
                                    </div>
                                )}
                            </ul>
                        </div>

                        <div className={css('footer')}>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </div>
                    </div>
                </div>
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
});

export default connect(mapStateToProps, mapActionsToProps)(Account);
