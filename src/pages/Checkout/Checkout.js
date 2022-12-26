import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import { userService } from '~/services';
import DeliveryAddress from './DeliveryAddress';
import DeliveryMethod from './DeliveryMethod';
import DeliveryPackage from './DeliveryPackage';
import PaymentDetail from './PaymentDetail';
import PaymentMethod from './PaymentMethod';
//redux
import { connect } from 'react-redux';
import { cartItemRemoveAll } from '~/redux/actions/cartActions';
//styles
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
const cb = classNames.bind(styles);

class Checkout extends React.Component {
    state = {
        receiverDetails: {},
        paymentDetails: {},
        items: [],
    };

    componentDidMount() {
        this.setState((prevState) => ({
            ...prevState,
            receiverDetails: {
                name: this.props.currentUser.name,
                phone: this.props.currentUser.phone,
                address: this.props.currentUser.address,
                note: 'ahihi',
            },
            paymentDetails: {
                discount: 0,
                deliveryCharges: 20000,
                paymentMethod: 'Thanh toán khi nhận hàng',
                subtotal: this.props.cart.subtotal,
                totalPayment: this.props.cart.subtotal + 20000,
            },
            items: this.props.cart.items,
        }));
    }

    handleCheckOut = async () => {
        // need to improve this solution
        this.setState((prevState) => ({
            ...prevState,
            paymentDetails: {
                ...prevState.paymentDetails,
                subtotal: this.props.cart.subtotal,
                totalPayment: this.props.cart.subtotal + 20000,
            },
        }));
        let res = await userService.createOrderService(
            this.props.currentUser.id,
            this.state.receiverDetails,
            this.props.cart.items,
            this.state.paymentDetails,
        );
        if (res && res.code === 0) {
            this.props.removeAll();
            toast.success('Đặt hàng thành công');
        }
    };

    render() {
        return (
            <>
                <Header />
                <div className={cb('background')}>
                    <div className={cb('wrapper')}>
                        <div className={cb('left')}>
                            <DeliveryAddress data={this.props.currentUser} />
                            <DeliveryMethod />
                            <DeliveryPackage data={this.props.cart.items} />
                        </div>
                        <div className={cb('right')}>
                            <PaymentMethod />
                            <PaymentDetail data={this.state.paymentDetails} handleCheckOut={this.handleCheckOut} />
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    currentUser: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    removeAll: () => dispatch(cartItemRemoveAll()),
});

export default connect(mapStateToProps, mapActionsToProps)(Checkout);
