import React from 'react';
import OrderProductItem from '../OrderProductItem';
import Button from '~/components/shared/buttons/Button';
// redux and action
import { connect } from 'react-redux';
// style
import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';
const css = classNames.bind(styles);

class OrderItem extends React.Component {
    state = {};

    handleDisplayOrderState = (code) => {
        switch (code) {
            case 0:
                return 'Chờ xử lý grey';

            default:
                break;
        }
    };

    render() {
        const data = this.props.data;
        const items = JSON.parse(data.items);
        const orderStates = JSON.parse(data.state);
        const currentState = orderStates[orderStates.length - 1];
        const paymentDetails = JSON.parse(data.paymentDetails);
        return (
            <div className={css('wrapper')}>
                <div className={css('header')}>
                    <p className={css('uuid')}>{'#' + data.orderUuid}</p>
                    <Status code={currentState.code} />
                </div>
                <ul className={css('body')}>
                    {items.length < 3 ? (
                        items.map((item, index) => (
                            <li key={index}>
                                <OrderProductItem data={item} />
                            </li>
                        ))
                    ) : (
                        <>
                            {items.slice(0, 3).map((item, index) => (
                                <li key={index}>
                                    <OrderProductItem data={item} />
                                </li>
                            ))}
                            <li className={css('hidden-item')}>
                                <span>Và {items.length - 3} sản phẩm khác</span>
                            </li>
                        </>
                    )}
                </ul>
                <div className={css('footer')}>
                    <p>
                        <span>Thành tiền:</span>
                        <ItemPrice value={paymentDetails.totalPayment} />
                    </p>
                    <div className={css('action')}>
                        {currentState.code === 0 && (
                            <Button
                                size={'medium'}
                                color={'error'}
                                onClick={() => this.props.handleActiveDialog(data.orderUuid)}
                            >
                                Hủy đơn
                            </Button>
                        )}
                        <Button
                            size={'medium'}
                            color={'info'}
                            onClick={() => this.props.handleActiveModal(this.props.data)}
                        >
                            Chi tiết
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const Status = (props) => {
    let classNames = ['status'];
    let content = 'Chờ xử lý';
    switch (props.code) {
        case 0:
            classNames = [...classNames, 'grey'];
            content = 'Chờ xử lý';
            break;
        case 1:
            classNames = [...classNames, 'warning'];
            content = 'Đã xác nhận';
            break;
        case 2:
            classNames = [...classNames, 'blue'];
            content = 'Đang giao hàng';
            break;
        case 3:
            classNames = [...classNames, 'green'];
            content = 'Giao hàng thành công';
            break;
        case 4:
            classNames = [...classNames, 'error'];
            content = 'Đã hủy';
            break;
        default:
            break;
    }
    return (
        <p className={css(classNames)} title="Trạng thái đơn hàng">
            {content}
        </p>
    );
};

const mapStateToProps = (state) => ({
    // cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(OrderItem);
