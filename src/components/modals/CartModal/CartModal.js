import React from 'react';
import emptyCartImage from '~/assets/images/empty-cart.png';
import CartItem from '~/components/partial/CartItem';
import Button from '~/components/shared/Button';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import BaseRightSideModal from '../BaseRightSideModal';

//redux
import { connect } from 'react-redux';
//style
import classNames from 'classnames/bind';
import styles from './CartModal.module.scss';

const scss = classNames.bind(styles);

class CartModal extends React.Component {
    handleOnClickCheckOut = () => {
        if (this.props.isLogged) {
            this.props.navigate(routes.checkout);
        } else {
            this.props.navigate(routes.login);
        }
        this.props.handleCollapseModal();
    };

    render() {
        return (
            <BaseRightSideModal
                title={`Giỏ hàng (${this.props.cart.quantity})`}
                handleCollapseModal={this.props.handleCollapseModal}
            >
                <div className={scss('container')}>
                    <ul className={scss('body')}>
                        {this.props.cart.items && this.props.cart.items.length > 0 ? (
                            this.props.cart.items.map((item, index) => (
                                <li key={index}>
                                    <CartItem data={item} />
                                </li>
                            ))
                        ) : (
                            <li className={scss('empty-cart')}>
                                <div className={scss('image')}>
                                    <img src={emptyCartImage} alt={'Chưa có sản phẩm'} />
                                </div>
                                <h2>Chưa có sản phẩm</h2>
                            </li>
                        )}
                    </ul>
                    {this.props.cart.items && this.props.cart.items.length > 0 && (
                        <div className={scss('footer')}>
                            <p className={scss('subtotal')}>
                                <span>Tạm tính:</span>
                                <span>
                                    <ItemPrice value={this.props.cart.subtotal} />
                                </span>
                            </p>
                            <Button size={'full'} shape={'pill'} color={'red'} onClick={this.handleOnClickCheckOut}>
                                Thanh toán
                            </Button>
                        </div>
                    )}
                </div>
            </BaseRightSideModal>
        );
    }
}

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const mapStateToProps = (state) => ({
    cart: state.cart,
    isLogged: state.auth.isLogged,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(CartModal));
