import React from 'react';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { BsHeartFill } from 'react-icons/bs';
import IconButton from '~/components/shared/buttons/IconButton';
// redux and action
import { connect } from 'react-redux';
import { cartItemAdd } from '~/redux/actions/cartActions';
// style
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
const scss = classNames.bind(styles);

const calcDiscount = (newPrice, oldPrice) => Math.round(((newPrice - oldPrice) / oldPrice) * 100);

class ProductItem extends React.Component {
    state = {};

    render() {
        return (
            <Link className={scss('product-item')} title={this.props.name}>
                {this.props.data.oldPrice > this.props.data.newPrice && (
                    <div className={scss('discount')}>
                        <p>
                            <span>{calcDiscount(this.props.data.newPrice, this.props.data.oldPrice)}</span>
                            <span>%</span>
                        </p>
                    </div>
                )}
                <div className={scss('header')}>
                    <IconButton
                        className={scss('favourite')}
                        size={'medium'}
                        shape={'rect'}
                        color={'blur'}
                        onClick={() => this.props.handleActiveDialog(this.props.data)}
                    >
                        <BsHeartFill />
                    </IconButton>
                    <IconButton
                        className={scss('add-to-cart')}
                        size={'medium'}
                        shape={'rect'}
                        color={'blur'}
                        onClick={() => this.props.itemAdd(this.props.data)}
                    >
                        <BiPlus />
                    </IconButton>
                    <img src={this.props.data.imageUrl} alt={this.props.data.name} />
                </div>
                <div className={scss('body')}>
                    <p className={scss('name')}>
                        <span>{this.props.data.name}</span>
                    </p>
                    <p className={scss('size')}>
                        <span>K??ch th?????c: </span>
                        <span>{this.props.data.size}</span>
                    </p>
                    <p className={scss('price')}>
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

const mapActionsToProps = (dispatch) => ({
    itemAdd: (item) => dispatch(cartItemAdd(item)),
});

export default connect(mapStateToProps, mapActionsToProps)(ProductItem);
