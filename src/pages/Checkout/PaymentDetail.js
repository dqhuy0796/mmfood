import React from 'react';
import Button from '~/components/shared/buttons/Button';
//redux
import { connect } from 'react-redux';
//style
import classNames from 'classnames/bind';
import styles from './PaymentDetail.module.scss';

const scss = classNames.bind(styles);

class PaymentDetail extends React.Component {
    state = {
        dialog: {
            active: false,
        },
    };

    render() {
        return (
            <div className={scss('wrapper')}>
                <div className={scss('voucher')}>
                    <p className={scss('title')}>Mã giảm giá</p>
                    <div className={scss('content')}>
                        <div className={scss('voucher-input')}>
                            <input placeholder="Nhập mã giảm giá..." />
                        </div>
                        <div className={scss('voucher-btn')}>
                            <Button size={'tiny'} shape={'pill'} color={'red'}>
                                <span>Áp dụng</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={scss('summary')}>
                    <p className={scss('title')}>Thông tin đơn hàng</p>
                    <div className={scss('content')}>
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
                        <Button
                            widthfull
                            size={'large'}
                            shape={'pill'}
                            color={'red'}
                            onClick={() => this.props.handleCheckOut()}
                        >
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
