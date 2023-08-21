import React from 'react';
// redux and action
import { connect } from 'react-redux';
// style
import classNames from 'classnames/bind';
import styles from './OrderProductCard.module.scss';
const scss = classNames.bind(styles);

class OrderProductCard extends React.Component {
    state = {};

    render() {
        const { data } = this.props;
        return (
            <div className={scss('wrapper')}>
                <div className={scss('image')}>
                    <img src={data.imageUrl} alt={data.name} />
                </div>
                <div className={scss('content')}>
                    <p className={scss('name')}>{data.name}</p>
                    <div className={scss('details')}>
                        <div className={scss('quantity')}>
                            <span>{data.size}</span>
                            <span>{`x${data.quantity}`}</span>
                        </div>
                        <div className={scss('price')}>
                            {data.orderDetailsPrice.toLocaleString('vn-VI', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(OrderProductCard);
