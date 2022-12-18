import React from 'react';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { BsHeartFill } from 'react-icons/bs';
// redux and action
import { connect } from 'react-redux';
import { cartItemAdd } from '~/redux/actions/cartActions';
// style
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
const cb = classNames.bind(styles);

const calcDiscount = (newPrice, oldPrice) => Math.round(((newPrice - oldPrice) / oldPrice) * 100);

class ProductItem extends React.Component {
    state = {};

    render() {
        return (
            <Link className={cb('product-item')}>
                {this.props.data.oldPrice > this.props.data.newPrice && (
                    <div className={cb('discount')}>
                        <p>
                            <span>{calcDiscount(this.props.data.newPrice, this.props.data.oldPrice)}</span>
                            <span>%</span>
                        </p>
                    </div>
                )}
                <div className={cb('header')}>
                    <button className={cb('favourite')}>
                        <BsHeartFill />
                    </button>
                    <button className={cb('add-to-cart')} onClick={() => this.props.itemAdd(this.props.data)}>
                        <BiPlus />
                    </button>
                    <img src={this.props.data.imageUrl} alt={this.props.data.name} />
                </div>
                <div className={cb('body')}>
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
            </Link>
        );
    }
}

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (action) => ({
    itemAdd: (item) => action(cartItemAdd(item)),
});

export default connect(mapStateToProps, mapActionsToProps)(ProductItem);
