import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/partial/Loading';
import OrderCard from '~/components/partial/OrderCard/OrderCard';
import { withRouter } from '~/hoc/withRouter';
import { fetchHistoryOrders } from '~/redux/actions/preloadActions';
// style
import classNames from 'classnames/bind';
import styles from './Orders.module.scss';

const scss = classNames.bind(styles);
class Orders extends React.Component {
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
        const { orders } = this.props;

        return (
            <>
                <div className={scss('wrapper')}>
                    <div className={scss('greeting')}>
                        <p>Đơn hàng gần đây</p>
                    </div>

                    <ul className={scss('orders')}>
                        {orders && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <li key={index} className={scss('order')}>
                                    <OrderCard data={order} />
                                </li>
                            ))
                        ) : (
                            <li>Không có đơn hàng nào</li>
                        )}
                    </ul>
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

const mapStateToProps = (state) => ({
    orders: state.api.historyOrders,
});

const mapActionsToProps = (dispatch) => ({
    fetchHistoryOrders: (id) => dispatch(fetchHistoryOrders(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Orders));
