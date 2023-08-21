import React from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
//redux and action
import { connect } from 'react-redux';
import { cartItemDescrease, cartItemIncrease, cartItemRemove } from '~/redux/actions/cartActions';
//styles
import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

const scss = classNames.bind(styles);

class CartItem extends React.Component {
    render() {
        return (
            <div className={scss('cart-item')}>
                <div className={scss('image')}>
                    <div>
                        <img src={this.props.data.imageUrl} alt={this.props.data.name} />
                    </div>
                </div>

                <div className={scss('content')}>
                    <div className={scss('top')}>
                        <h4 className={scss('title')}>
                            <span>{this.props.data.name}</span>
                        </h4>
                    </div>
                    <div className={scss('bottom')}>
                        <div className={scss('info')}>
                            <p className={scss('size')}>
                                <span>K.thước: </span>
                                <span>{this.props.data.size}</span>
                            </p>
                            <div className={scss('tag')}>Đồ ăn</div>
                        </div>
                        <hr></hr>
                        <div className={scss('payment')}>
                            <Price before={this.props.data.oldPrice} current={this.props.data.newPrice} />
                            <div className={scss('action')}>
                                <div className={scss('quantity')}>
                                    <span onClick={() => this.props.itemIncrease(this.props.data)}>
                                        <BiPlus />
                                    </span>
                                    <span>{this.props.data.quantity}</span>
                                    <span onClick={() => this.props.itemDescrease(this.props.data)}>
                                        <BiMinus />
                                    </span>
                                </div>
                                <div className={scss('delete')}>
                                    <span onClick={() => this.props.itemRemove(this.props.data)}>
                                        <MdDeleteOutline />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Price = (props) => {
    const before = props.before?.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' });
    const current = props.current?.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' });
    return (
        <div className={scss('price')}>
            <p>{before}</p>
            <p>{current}</p>
        </div>
    );
};
const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    itemRemove: (item) => dispatch(cartItemRemove(item)),
    itemIncrease: (item) => dispatch(cartItemIncrease(item)),
    itemDescrease: (item) => dispatch(cartItemDescrease(item)),
});

export default connect(mapStateToProps, mapActionsToProps)(CartItem);
