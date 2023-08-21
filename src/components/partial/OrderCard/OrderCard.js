import React from 'react';
import Button from '~/components/shared/Button';
import OrderState from '~/components/shared/OrderState';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import OrderProductCard from './OrderProductCard';
// style
import classNames from 'classnames/bind';
import styles from './OrderCard.module.scss';
const scss = classNames.bind(styles);

class OrderCard extends React.Component {
    state = {};

    handleOnRedirect = (orderUuid) => {
        this.props.navigate(routes.orderDetails.replace(':id', orderUuid));
    };

    render() {
        const data = this.props.data;
        const { items, states } = this.props.data;
        const currentState = states[states.length - 1];

        return (
            <div className={scss('wrapper')}>
                <div className={scss('header')}>
                    <p className={scss('uuid')}>{'#' + data.orderUuid}</p>
                    <OrderState data={currentState} />
                </div>
                <ul className={scss('body')}>
                    {items.slice(0, 3).map((item, index) => (
                        <li key={index} className={scss('item')}>
                            <OrderProductCard data={item} />
                        </li>
                    ))}
                    {items.length > 3 && (
                        <li className={scss('hidden', 'item')}>
                            <span>Và {items.length - 3} sản phẩm khác</span>
                        </li>
                    )}
                </ul>
                <div className={scss('footer')}>
                    <p className={scss('total-payment')}>
                        <span>Thành tiền:</span>
                        <span className={scss('total')}>
                            {data.subtotal.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}
                        </span>
                    </p>
                    <div className={scss('action')}>
                        {currentState.code === 1 && (
                            <Button size={'tiny'} color={'error'} onClick={() => {}}>
                                Hủy đơn
                            </Button>
                        )}
                        {currentState.code === 3 && (
                            <Button size={'tiny'} color={'success'} onClick={() => {}}>
                                Đã nhận hàng
                            </Button>
                        )}
                        <Button size={'tiny'} color={'info'} onClick={() => this.handleOnRedirect(data.orderUuid)}>
                            Chi tiết
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(OrderCard);
