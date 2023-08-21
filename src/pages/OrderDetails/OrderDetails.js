import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/partial/Loading';
import OrderProductCard from '~/components/partial/OrderCard/OrderProductCard';
import Timeline from '~/components/partial/Timeline';
import { withRouter } from '~/hoc/withRouter';
import { fetchHistoryOrders } from '~/redux/actions/preloadActions';
import { userService } from '~/services';
// style
import classNames from 'classnames/bind';
import styles from './OrderDetails.module.scss';

const scss = classNames.bind(styles);
class OrderDetails extends React.Component {
    state = {
        isNowLoading: false,
        order: {},
    };

    componentDidMount() {
        this.handleFetchOrders();
    }

    handleFetchOrders = async () => {
        this.setState({ isNowLoading: true });

        const pathnameArray = this.props.location.pathname.split('/');
        const pathnameUuid = pathnameArray[pathnameArray.length - 1];

        const response = await userService.fetchOrderByIdService(pathnameUuid);

        if (response && response.code === 0) {
            this.setState((prevState) => ({
                ...prevState,
                order: response.result,
            }));
        }

        setTimeout(() => {
            this.setState({ isNowLoading: false });
        }, 1000);
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        const { order } = this.state;
        const { items, states, deliveryAddress } = order;
        console.log(items, states, deliveryAddress);
        return (
            <>
                <div className={scss('wrapper')}>
                    <div className={scss('title')}>
                        <p>{`Chi tiết đơn hàng #${order.orderUuid}`}</p>
                    </div>

                    <div className={scss('container')}>
                        <div className={scss('header')}>
                            <p className={scss('subtitle')}>Tình trạng đơn hàng</p>
                            {states && <Timeline data={states} />}
                        </div>

                        <div className={scss('body')}>
                            <p className={scss('subtitle')}>Danh sách sản phẩm</p>
                            <ul>
                                {items &&
                                    items.slice(0, 3).map((item, index) => (
                                        <li key={index} className={scss('item')}>
                                            <OrderProductCard data={item} />
                                        </li>
                                    ))}
                                {items && items.length > 3 && (
                                    <li className={scss('hidden', 'item')}>
                                        <span>Và {items.length - 3} sản phẩm khác</span>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className={scss('footer')}>
                            <div className={scss('section')}>
                                <p className={scss('subtitle')}>Địa chỉ nhận hàng</p>
                                {deliveryAddress && (
                                    <ul className={scss('address')}>
                                        <li>{deliveryAddress.receiverName}</li>
                                        <li>{deliveryAddress.receiverPhoneNumber}</li>
                                        <li>{deliveryAddress.details}</li>
                                        <li>{`${deliveryAddress.ward}, ${deliveryAddress.district}, ${deliveryAddress.province}`}</li>
                                    </ul>
                                )}
                            </div>
                            <div className={scss('section')}>
                                <p className={scss('subtitle')}>Chi tiết thanh toán</p>
                                {true && (
                                    <ul className={scss('payment-details')}>
                                        <li>
                                            <span>Phương thức thanh toán:</span>
                                            <span>{'COD'}</span>
                                        </li>
                                        <li>
                                            <span>Tổng tiền hàng:</span>
                                            <span>
                                                <ItemPrice value={0} />
                                            </span>
                                        </li>
                                        <li>
                                            <span>Khuyến mãi:</span>
                                            <span>
                                                <ItemPrice value={0} />
                                            </span>
                                        </li>
                                        <li>
                                            <span>Phí vận chuyển:</span>
                                            <span>
                                                <ItemPrice value={0} />
                                            </span>
                                        </li>
                                        <li>
                                            <span>Thành tiền:</span>
                                            <span>
                                                <ItemPrice value={0} />
                                            </span>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

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

                {this.state.isNowLoading && <Loading />}
            </>
        );
    }
}

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const mapStateToProps = (state) => ({
    historyOrders: state.api.historyOrders,
});

const mapActionsToProps = (dispatch) => ({
    fetchHistoryOrders: (id) => dispatch(fetchHistoryOrders(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(OrderDetails));
