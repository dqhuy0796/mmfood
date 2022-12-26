import React from 'react';
// redux and action
import { connect } from 'react-redux';
// style
import classNames from 'classnames/bind';
import styles from './OrderProductItem.module.scss';
const css = classNames.bind(styles);

class OrderProductItem extends React.Component {
    state = {};

    render() {
        return (
            <div className={css('wrapper')}>
                <div className={css('image')}>
                    <img src={this.props.data.imageUrl} alt={''} />
                </div>
                <div className={css('detail')}>
                    <p className={css('name')}>{this.props.data.name}</p>
                    <p className={css('clgt')}>
                        <span>{this.props.data.unit}</span>
                        <span>-</span>
                        <span>{this.props.data.size}</span>
                    </p>
                    <p className={css('quantity')}>x{this.props.data.quantity}</p>
                </div>
                <div className={css('price')}>
                    <ItemPrice value={this.props.data.oldPrice} />
                    <ItemPrice value={this.props.data.newPrice} />
                </div>
            </div>
        );
    }
}

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const mapStateToProps = (state) => ({
    // cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(OrderProductItem);
