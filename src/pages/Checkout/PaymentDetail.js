import classNames from 'classnames/bind';
import React from 'react';
import Button from '~/components/shared/buttons/Button';
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
                                <ItemPrice value={100000} />
                            </span>
                        </p>
                        <p>
                            <span>Phí vận chuyển:</span>
                            <span>
                                <ItemPrice value={20000} />
                            </span>
                        </p>
                        <p>
                            <span>Tổng cộng:</span>
                            <span>
                                <ItemPrice value={120000} />
                            </span>
                        </p>
                    </div>
                    <Button size={'large'} shape={'pill'} color={'red'}>
                        <span>Đặt hàng</span>
                    </Button>
                </div>
            </div>
        );
    }
}

export default PaymentDetail;

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;
