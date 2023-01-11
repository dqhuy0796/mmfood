import React from 'react';
// redux and action
import { connect } from 'react-redux';
// style
import classNames from 'classnames/bind';
import styles from './OrderProductItem.module.scss';
const scss = classNames.bind(styles);

class OrderProductItem extends React.Component {
    state = {};

    render() {
        return (
            <div className={scss('wrapper')}>
                <div className={scss('image')}>
                    <img src={this.props.data.imageUrl} alt={''} />
                </div>
                <div className={scss('detail')}>
                    <p className={scss('name')}>{this.props.data.name}</p>
                    <p className={scss('clgt')}>
                        <span>{this.props.data.unit}</span>
                        <span>-</span>
                        <span>{this.props.data.size}</span>
                    </p>
                    <p className={scss('quantity')}>x{this.props.data.quantity}</p>
                </div>
                <div className={scss('price')}>
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
