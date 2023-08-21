import classNames from 'classnames/bind';
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import SelectPaymentMethodModal from '~/components/modals/SelectPaymentMethodModal';
import TransparentButton from '~/components/shared/TransparentButton';
import styles from './CheckoutPaymentMethod.module.scss';

const scss = classNames.bind(styles);

const paymentMethods = [
    {
        title: 'Thanh toán khi nhận hàng',
        description: 'Cash On Delivery',
        selected: true,
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

class CheckoutPaymentMethod extends React.Component {
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
            <div className={scss('payment')}>
                <div className={scss('header')}>
                    <p className={scss('title')}>Chọn phương thức thanh toán</p>

                    <TransparentButton onClick={this.handleCollapseModal}>
                        <span>Xem tất cả</span>
                    </TransparentButton>

                    {this.state.isModalActive && (
                        <SelectPaymentMethodModal handleCollapseModal={this.handleCollapseModal} />
                    )}
                </div>
                <div className={scss('body')}>
                    {paymentMethods.map((item, index) => (
                        <PaymentItem key={index} data={item} />
                    ))}
                </div>
            </div>
        );
    }
}
const PaymentItem = (props) => (
    <div className={scss('payment-item', props.data.selected && 'selected')}>
        <div className={scss('check')}>
            {props.data.selected ? <MdCheckCircle className={scss('checked')} /> : <MdRadioButtonUnchecked />}
        </div>
        <div className={scss('content')}>
            <div className={scss('header')}>
                <img src={props.data.imageUrl} alt={props.data.description} />
                <p className={scss('text')}>{props.data.title}</p>
            </div>
            <div className={scss('footer')}>
                <p className={scss('text')}>{props.data.description}</p>
                <div className={scss('payment-list')}>
                    {props.data.methods &&
                        props.data.methods.map((item, index) => (
                            <img key={index} src={item.imageUrl} alt={item.title} />
                        ))}
                </div>
            </div>
        </div>
    </div>
);

export default CheckoutPaymentMethod;
