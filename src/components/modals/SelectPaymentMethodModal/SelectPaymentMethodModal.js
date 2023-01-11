import classNames from 'classnames/bind';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import BaseRightSideModal from '../BaseRightSideModal';
import styles from './SelectPaymentMethodModal.module.scss';

const scss = classNames.bind(styles);

class SelectPaymentMethodModal extends React.Component {
    state = {
        payment_methods: {
            suggestion: [
                {
                    id: 1,
                    imageUrl:
                        'https://lzd-img-global.slatic.net/g/tps/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png_2200x2200q80.jpg_.webp',
                    title: 'Thẻ tín dụng/Thẻ ghi nợ',
                    description: 'VISA/MasterCard/JCB',
                    popular: [
                        {
                            imageUrl:
                                'https://lzd-img-global.slatic.net/g/tps/tfs/TB1sH7_bxrI8KJjy0FpXXb5hVXa-80-80.png_2200x2200q80.jpg_.webp',
                            title: 'mastercard',
                            description: 'mastercard',
                        },
                        {
                            imageUrl:
                                'https://lzd-img-global.slatic.net/g/tps/tfs/TB1JmMulOqAXuNjy1XdXXaYcVXa-80-80.png_2200x2200q80.jpg_.webp',
                            title: 'jcb',
                            description: 'JCB',
                        },
                        {
                            imageUrl:
                                'https://lzd-img-global.slatic.net/g/tps/tfs/TB1RI0cbLDH8KJjy1XcXXcpdXXa-80-80.png_2200x2200q80.jpg_.webp',
                            title: 'visa',
                            description: 'visa',
                        },
                    ],
                },
                {
                    id: 5,
                    imageUrl:
                        'https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q80.jpg_.webp',
                    title: 'Thanh toán khi nhận hàng',
                    description: 'Cash On Delivery',
                },
            ],
            all: [
                {
                    id: 1,
                    imageUrl:
                        'https://lzd-img-global.slatic.net/g/tps/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png_2200x2200q80.jpg_.webp',
                    title: 'Thẻ tín dụng/Thẻ ghi nợ',
                    description: 'VISA/MasterCard/JCB',
                    popular: [
                        {
                            imageUrl:
                                'https://lzd-img-global.slatic.net/g/tps/tfs/TB1sH7_bxrI8KJjy0FpXXb5hVXa-80-80.png_2200x2200q80.jpg_.webp',
                            title: 'mastercard',
                            description: 'mastercard',
                        },
                        {
                            imageUrl:
                                'https://lzd-img-global.slatic.net/g/tps/tfs/TB1JmMulOqAXuNjy1XdXXaYcVXa-80-80.png_2200x2200q80.jpg_.webp',
                            title: 'jcb',
                            description: 'JCB',
                        },
                        {
                            imageUrl:
                                'https://lzd-img-global.slatic.net/g/tps/tfs/TB1RI0cbLDH8KJjy1XcXXcpdXXa-80-80.png_2200x2200q80.jpg_.webp',
                            title: 'visa',
                            description: 'visa',
                        },
                    ],
                },
                {
                    id: 2,
                    imageUrl:
                        'https://lzd-img-global.slatic.net/g/tps/tfs/TB17BAYE7L0gK0jSZFAXXcA9pXa-80-80.png_2200x2200q80.jpg_.webp',
                    title: 'ZaloPay',
                    description: '**** 5555',
                },
                {
                    id: 3,
                    imageUrl:
                        'https://lzd-img-global.slatic.net/g/tps/tfs/TB1L1Felmf2gK0jSZFPXXXsopXa-160-160.png_2200x2200q80.jpg_.webp',
                    title: 'Ví MoMo',
                    description: 'Bạn phải có tài khoản MoMo',
                },
                {
                    id: 4,
                    imageUrl:
                        'https://lzd-img-global.slatic.net/g/tps/tfs/O1CN012GqGXB23W2xdKEEa1_!!6000000007262-2-tps-284-200.png_2200x2200q80.jpg_.webp',
                    title: 'Thẻ ATM nội địa/Internet Banking',
                    description: 'Thanh toán qua Napas',
                },
                {
                    id: 5,
                    imageUrl:
                        'https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q80.jpg_.webp',
                    title: 'Thanh toán khi nhận hàng',
                    description: 'Cash On Delivery',
                },
            ],
        },
    };
    render() {
        return (
            <BaseRightSideModal title={'Phương thức thanh toán'} handleCollapseModal={this.props.handleCollapseModal}>
                <div className={scss('container')}>
                    <ul className={scss('body')}>
                        <li>
                            <p>Phương thức thanh toán khuyên dùng</p>
                            {this.state.payment_methods.suggestion.map((item, index) => (
                                <PaymentMethodItem key={index} data={item} />
                            ))}
                        </li>

                        <li>
                            <p>Tất cả phương thức thanh toán</p>
                            {this.state.payment_methods.all.map((item, index) => (
                                <PaymentMethodItem key={index} data={item} />
                            ))}
                        </li>
                    </ul>
                </div>
            </BaseRightSideModal>
        );
    }
}

const PaymentMethodItem = (props) => (
    <div className={scss('method')}>
        <div className={scss('image')}>
            <img src={props.data.imageUrl} alt={props.data.title} />
        </div>
        <div className={scss('text')}>
            <p>{props.data.title}</p>
            <p>{props.data.description}</p>
        </div>
        {props.data.popular && (
            <div className={scss('payment-list')}>
                {props.data.popular.map((item, index) => (
                    <img key={index} src={item.imageUrl} alt={item.title} />
                ))}
            </div>
        )}
        <div className={scss('button')}>
            <BsChevronRight />
        </div>
    </div>
);

export default SelectPaymentMethodModal;
