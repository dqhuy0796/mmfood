import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { userService } from '~/services';
import CheckoutAddressSelection from './CheckoutAddressSelection';
import CheckoutDeliveryMethod from './CheckoutDeliveryMethod';
import CheckoutDeliveryPackage from './CheckoutDeliveryPackage';
import CheckoutPaymentDetail from './CheckoutPaymentDetail';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';
//redux
import { connect } from 'react-redux';
import { cartItemRemoveAll } from '~/redux/actions/cartActions';
//styles
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
const scss = classNames.bind(styles);

class Checkout extends React.Component {
    state = {
        items: [],
        selectedAddress: {},
        paymentDetails: {},
    };

    componentDidMount() {
        const { user, cart } = this.props;
        this.setState((prevState) => ({
            ...prevState,
            items: cart.items,
            selectedAddress: user.defaultDeliveryAddress,
            paymentDetails: {
                discount: 0,
                deliveryCharges: 20000,
                paymentMethod: 'Thanh toán khi nhận hàng',
                subtotal: cart.subtotal,
            },
        }));
    }

    handleSelectAddress = (address) => {
        if (address !== this.state.selectedAddress) {
            this.setState({ selectedAddress: address });
        }
    };

    handleCheckOut = () => {
        this.setState((prevState) => ({
            ...prevState,
            paymentDetails: {
                ...prevState.paymentDetails,
                subtotal: this.props.cart.subtotal,
                totalPayment: this.props.cart.subtotal + 20000,
            },
        }));

        const orderPromise = new Promise(async (resolve, reject) => {
            try {
                const res = await userService.createOrderService(
                    this.props.user.id,
                    this.state.selectedAddress.id,
                    this.props.cart.items,
                    this.state.paymentDetails,
                );

                if (res) {
                    resolve(res);
                } else {
                    reject(new Error('Order creation failed'));
                }
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(orderPromise, {
            pending: 'Đang xử lý đơn hàng...',
            success: 'Đặt hàng thành công',
            error: 'Đặt hàng thất bại',
        });

        orderPromise
            .then(() => {
                this.props.removeAll();
            })
            .catch((error) => {
                // Handle error, if needed
            });
    };

    render() {
        const { cart } = this.props;
        const { selectedAddress, paymentDetails } = this.state;
        return (
            <div className={scss('wrapper')}>
                <div className={scss('left')}>
                    <CheckoutAddressSelection data={selectedAddress} onSelectAddress={this.handleSelectAddress} />
                    <CheckoutDeliveryPackage data={cart.items} />
                </div>

                <div className={scss('right')}>
                    <CheckoutPaymentMethod />
                    <CheckoutDeliveryMethod />
                    <CheckoutPaymentDetail data={paymentDetails} handleCheckOut={this.handleCheckOut} />
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={false}
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    removeAll: () => dispatch(cartItemRemoveAll()),
});

export default connect(mapStateToProps, mapActionsToProps)(Checkout);
