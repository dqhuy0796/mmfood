import classNames from 'classnames/bind';
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import SelectPaymentMethodModal from '~/components/modals/SelectPaymentMethodModal';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import styles from './PaymentMethod.module.scss';

const cb = classNames.bind(styles);

const paymentMethods = [
    {
        title: 'Thanh toán khi nhận hàng',
        description: 'Cash On Delivery',
        imageUrl:
            'https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q80.jpg_.webp',
    },
    {
        title: 'Thẻ tín dụng/Thẻ ghi nợ',
        description: 'Chọn thêm thẻ',
        imageUrl:
            'https://lzd-img-global.slatic.net/g/tps/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png_2200x2200q80.jpg_.webp',
        methods: [
            {
                title: 'Master Card',
                description: '',
                imageUrl:
                    'https://lzd-img-global.slatic.net/g/tps/tfs/TB1sH7_bxrI8KJjy0FpXXb5hVXa-80-80.png_2200x2200q80.jpg_.webp',
            },
            {
                title: 'J.C.B',
                description: '',
                imageUrl:
                    'https://lzd-img-global.slatic.net/g/tps/tfs/TB1JmMulOqAXuNjy1XdXXaYcVXa-80-80.png_2200x2200q80.jpg_.webp',
            },
            {
                title: 'VISA',
                description: '',
                imageUrl:
                    'https://lzd-img-global.slatic.net/g/tps/tfs/TB1RI0cbLDH8KJjy1XcXXcpdXXa-80-80.png_2200x2200q80.jpg_.webp',
            },
        ],
    },
];

class PaymentMethod extends React.Component {
    state = {
        isModalActive: false,
    };
    handleCollapseModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            isModalActive: !prevState.isModalActive,
        }));
    };
    render() {
        return (
            <div className={cb('payment')}>
                <div className={cb('header')}>
                    <p className={cb('title')}>Chọn phương thức thanh toán</p>

                    <TransparentButton onClick={this.handleCollapseModal}>
                        <span>Xem tất cả</span>
                    </TransparentButton>

                    {this.state.isModalActive && (
                        <SelectPaymentMethodModal handleCollapseModal={this.handleCollapseModal} />
                    )}
                </div>
                <div className={cb('body')}>
                    {paymentMethods.map((item, index) => (
                        <PaymentItem key={index} data={item} />
                    ))}
                </div>
            </div>
        );
    }
}
const PaymentItem = (props) => (
    <div className={cb('payment-item')}>
        <div className={cb('content')}>
            <div className={cb('header')}>
                <img src={props.data.imageUrl} alt={props.data.description} />
                <p className={cb('text')}>{props.data.title}</p>
            </div>
            <div className={cb('footer')}>
                <p className={cb('text')}>{props.data.description}</p>
                <div className={cb('payment-list')}>
                    {props.data.methods &&
                        props.data.methods.map((item, index) => (
                            <img key={index} src={item.imageUrl} alt={item.title} />
                        ))}
                </div>
            </div>
        </div>
        <div className={cb('check')}>{props.selected ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}</div>
    </div>
);

export default PaymentMethod;
