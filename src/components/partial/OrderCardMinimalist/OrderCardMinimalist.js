import React from 'react';
import OrderState from '~/components/shared/OrderState';
import routes from '~/config';
import TransparentButton from '~/components/shared/TransparentButton';
import { withRouter } from '~/hoc/withRouter';
// redux and action
import { connect } from 'react-redux';
// style
import classNames from 'classnames/bind';
import styles from './OrderCardMinimalist.module.scss';
const scss = classNames.bind(styles);

class OrderCardMinimalist extends React.Component {
    state = {};

    handleOnRedirect = (orderUuid) => {
        this.props.navigate(routes.orderDetails.replace(':id', orderUuid));
    };

    render() {
        const data = this.props.data;
        const { items, states } = this.props.data;
        const currentState = states[states.length - 1];

        return (
            <div className={scss('minimum-order-card')}>
                <div className={scss('header')}>
                    <p className={scss('timestampz')}>{data.createdAt.slice(0, 10)}</p>
                    <OrderState data={currentState} />
                </div>
                <ul className={scss('body')}>
                    {items.slice(0, 3).map((item, index) => (
                        <li key={index} className={scss('item')} title={item.name}>
                            <img alt={item.name} src={item.imageUrl} />
                            <span>{`x${item.quantity}`}</span>
                        </li>
                    ))}
                    {items.length > 2 && (
                        <li className={scss('item')} title={`Còn ${items.length - 3} sản phẩm nữa`}>
                            <p className={scss('more')}>{`+ ${items.length - 3} nữa`}</p>
                        </li>
                    )}
                </ul>
                <div className={scss('footer')}>
                    <p className={scss('total')}>
                        {data.subtotal.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}
                    </p>
                    <TransparentButton className={scss('btn')} onClick={() => this.handleOnRedirect(data.orderUuid)}>
                        <span>Chi tiết</span>
                    </TransparentButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(OrderCardMinimalist));
