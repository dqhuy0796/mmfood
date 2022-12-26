import React from 'react';
// redux and action
import { connect } from 'react-redux';
// style
import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';
const css = classNames.bind(styles);

class OrderItem extends React.Component {
    state = {};

    render() {
        const items = JSON.parse(this.props.data.items);
        const paymentDetails = JSON.parse(this.props.data.paymentDetails);
        return (
            <div className={css('wrapper')}>
                <div className={css('header')}>
                    <p>#{this.props.data.orderUuid}</p>
                    <p>{this.props.data.state}</p>
                </div>
                <ul className={css('body')}>
                    {items.map((item, index) => (
                        <li key={index} className={css('item')}>
                            <div className={css('image')}>
                                <img src={item.imageUrl} alt={''} />
                            </div>
                            <div className={css('detail')}>
                                <p className={css('name')}>{item.name}</p>
                                <p className={css('clgt')}>
                                    <span>{item.unit}</span>
                                    <span>-</span>
                                    <span>{item.size}</span>
                                </p>
                                <p className={css('quantity')}>x{item.quantity}</p>
                            </div>
                            <div className={css('price')}>
                                <ItemPrice value={item.oldPrice} />
                                <ItemPrice value={item.newPrice} />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={css('footer')}>
                    <p>
                        Thành tiền: <ItemPrice value={paymentDetails.totalPayment} />
                    </p>
                </div>
            </div>
        );
    }
}

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(OrderItem);
