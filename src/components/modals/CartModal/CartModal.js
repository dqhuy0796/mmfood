import React from 'react';
import emptyCartImage from '~/assets/images/empty-cart.png';
import CartItem from '~/components/partial/CartItem';
import Button from '~/components/shared/buttons/Button';
import config from '~/config';
import BaseRightSideModal from '../BaseRightSideModal';
//redux
import { connect } from 'react-redux';
//style
import classNames from 'classnames/bind';
import styles from './CartModal.module.scss';

const cb = classNames.bind(styles);

class CartModal extends React.Component {
    state = {};
    render() {
        return (
            <BaseRightSideModal
                title={`Giỏ hàng (${this.props.cart.quantity})`}
                handleCollapseModal={this.props.handleCollapseModal}
            >
                <div className={cb('container')}>
                    <ul className={cb('body')}>
                        {this.props.cart.items && this.props.cart.items.length > 0 ? (
                            this.props.cart.items.map((item, index) => (
                                <li key={index}>
                                    <CartItem data={item} />
                                </li>
                            ))
                        ) : (
                            <li className={cb('empty-cart')}>
                                <div className={cb('image')}>
                                    <img src={emptyCartImage} alt={'Chưa có sản phẩm'} />
                                </div>
                                <h2>Chưa có sản phẩm</h2>
                            </li>
                        )}
                    </ul>
                    {this.props.cart.items && this.props.cart.items.length > 0 && (
                        <div className={cb('footer')}>
                            <p className={cb('subtotal')}>
                                <span>Tạm tính:</span>
                                <span>
                                    <ItemPrice value={this.props.cart.subtotal} />
                                </span>
                            </p>
                            <Button
                                size={'large'}
                                shape={'pill'}
                                color={'error'}
                                to={this.props.isLoggedIn ? config.routes.checkout : config.routes.login}
                            >
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
    isLoggedIn: state.auth.isLoggedIn,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(CartModal);
