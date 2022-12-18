import React from 'react';
import Button from '~/components/shared/buttons/Button';
//redux
import { connect } from 'react-redux';
import { login } from '~/redux/actions/authActions';
//style
import classNames from 'classnames/bind';
import styles from './PaymentDetail.module.scss';

const cb = classNames.bind(styles);

class PaymentDetail extends React.Component {
    state = {};
    render() {
        return (
            <div className={cb('wrapper')}>
                <div className={cb('voucher')}>
                    <p className={cb('title')}>Mã giảm giá</p>
                    <div className={cb('content')}>
                        <div className={cb('voucher-input')}>
                            <input placeholder="Nhập mã giảm giá..." />
                        </div>
                        <div className={cb('voucher-btn')}>
                            <Button size={'tiny'} shape={'pill'} color={'red'}>
                                <span>Áp dụng</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={cb('summary')}>
                    <p className={cb('title')}>Thông tin đơn hàng</p>
                    <div className={cb('content')}>
                        <p>
                            <span>Tạm tính:</span>
                            <span>
                                <ItemPrice value={this.props.cart.subtotal} />
                            </span>
                        </p>
                        <p>
                            <span>Phí vận chuyển:</span>
                            <span>
                                <ItemPrice value={this.props.cart.subtotal > 0 ? 20000 : 0} />
                            </span>
                        </p>
                        <p>
                            <span>Tổng cộng:</span>
                            <span>
                                <ItemPrice
                                    value={this.props.cart.subtotal > 0 ? this.props.cart.subtotal + 20000 : 0}
                                />
                            </span>
                        </p>
                    </div>
                    {this.props.cart.subtotal > 0 && (
                        <Button size={'large'} shape={'pill'} color={'red'}>
                            <span>Đặt hàng</span>
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (action) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(PaymentDetail);

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;
