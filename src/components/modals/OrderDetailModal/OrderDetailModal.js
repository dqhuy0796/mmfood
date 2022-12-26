import classNames from 'classnames/bind';
import React from 'react';
import BaseCenterModal from '~/components/modals/BaseCenterModal';
import OrderProductItem from '~/components/partial/OrderProductItem';
import Timeline from '../../partial/Timeline/Timeline';
import styles from './OrderDetailModal.module.scss';
const css = classNames.bind(styles);

class OrderDetailModal extends React.Component {
    state = {};

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        const data = this.props.data;
        const items = JSON.parse(data.items);
        const paymentDetails = JSON.parse(data.paymentDetails);
        const receiverDetails = JSON.parse(data.receiverDetails);
        const status = JSON.parse(data.state);
        return (
            <BaseCenterModal title={`Đơn hàng #${data.orderUuid}`} handleActiveModal={this.props.handleActiveModal}>
                <form className={css('container')} onSubmit={this.handleSubmit}>
                    <div className={css('header')}>
                        <div className={css('section')}>
                            <p className={css('title')}>Địa chỉ nhận hàng</p>
                            <p className={css('name')}>{receiverDetails.name}</p>
                            <p className={css('phone')}>{receiverDetails.phone}</p>
                            <p className={css('address')}>{receiverDetails.address}</p>
                        </div>
                        <div className={css('section')}>
                            <p className={css('title')}>Tình trạng đơn hàng</p>
                            <Timeline data={status} />
                        </div>
                    </div>
                    <ul className={css('body')}>
                        {items.map((item, index) => (
                            <li key={index} className={css('item')}>
                                <OrderProductItem data={item} />
                            </li>
                        ))}
                    </ul>
                    <div className={css('footer')}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Tổng tiền hàng:</td>
                                    <td>
                                        <ItemPrice value={paymentDetails.subtotal} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Khuyến mãi:</td>
                                    <td>
                                        <ItemPrice value={paymentDetails.discount} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phí vận chuyển:</td>
                                    <td>
                                        <ItemPrice value={paymentDetails.deliveryCharges} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thành tiền:</td>
                                    <td>
                                        <ItemPrice value={paymentDetails.totalPayment} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phương thức thanh toán:</td>
                                    <td>{paymentDetails.paymentMethod}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </BaseCenterModal>
        );
    }
}
const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

export default OrderDetailModal;
