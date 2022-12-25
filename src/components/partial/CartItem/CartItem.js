import React from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
//redux and action
import { connect } from 'react-redux';
import { cartItemDescrease, cartItemIncrease, cartItemRemove } from '~/redux/actions/cartActions';
//styles
import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

const cb = classNames.bind(styles);

class CartItem extends React.Component {
    render() {
        return (
            <div className={cb('cart-item')}>
                <div className={cb('image')}>
                    <div className={cb('image-link')}>
                        <img src={this.props.data.imageUrl} alt={this.props.data.name} />
                    </div>
                </div>
                <div className={cb('info')}>
                    <p className={cb('name')}>
                        <span>{this.props.data.name}</span>
                    </p>
                    <p className={cb('size')}>
                        <span>Kích thước: </span>
                        <span>{this.props.data.size}</span>
                    </p>
                    <p className={cb('price')}>
                        <ItemPrice value={this.props.data.newPrice} />
                        <ItemPrice value={this.props.data.oldPrice} />
                    </p>
                </div>
                <div className={cb('quantity')}>
                    <span onClick={() => this.props.itemIncrease(this.props.data)}>
                        <BsChevronUp />
                    </span>
                    <span>{this.props.data.quantity}</span>
                    <span onClick={() => this.props.itemDescrease(this.props.data)}>
                        <BsChevronDown />
                    </span>
                </div>
                <div className={cb('action')}>
                    <span onClick={() => this.props.itemRemove(this.props.data)}>
                        <MdDeleteOutline />
                    </span>
                </div>
            </div>
        );
    }
}
const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    itemRemove: (item) => dispatch(cartItemRemove(item)),
    itemIncrease: (item) => dispatch(cartItemIncrease(item)),
    itemDescrease: (item) => dispatch(cartItemDescrease(item)),
});

export default connect(mapStateToProps, mapActionsToProps)(CartItem);
