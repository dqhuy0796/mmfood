import React from 'react';
import OrderProductItem from '../OrderProductItem';
import Button from '~/components/shared/buttons/Button';
// redux and action
import { connect } from 'react-redux';
// style
import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';
const scss = classNames.bind(styles);

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
            <div className={scss('wrapper')}>
                <div className={scss('header')}>
                    <p className={scss('uuid')}>{'#' + data.orderUuid}</p>
                    <Status code={currentState.code} />
                </div>
                <ul className={scss('body')}>
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
                            <li className={scss('hidden-item')}>
                                <span>Và {items.length - 3} sản phẩm khác</span>
                            </li>
                        </>
                    )}
                </ul>
                <div className={scss('footer')}>
                    <p>
                        <span>Thành tiền:</span>
                        <ItemPrice value={paymentDetails.totalPayment} />
                    </p>
                    <div className={scss('action')}>
                        {currentState.code === 0 && (
                            <Button
                                size={'medium'}
                                color={'error'}
                                onClick={() => this.props.handleActiveDialog(data.orderUuid)}
                            >
                                Hủy đơn
                            </Button>
                        )}
                        {currentState.code === 2 && (
                            <Button
                                size={'medium'}
                                color={'success'}
                                onClick={() => this.props.handleActiveDialog(data.orderUuid)}
                            >
                                Đã nhận hàng
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
        <p className={scss(classNames)} title="Trạng thái đơn hàng">
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
