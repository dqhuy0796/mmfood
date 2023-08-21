import React from 'react';
import { BsBagPlus, BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import { FaStar } from 'react-icons/fa';
import IconButton from '~/components/shared/IconButton';
// redux and action
import { connect } from 'react-redux';
import { cartItemAdd } from '~/redux/actions/cartActions';
// style
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
const scss = classNames.bind(styles);

class ProductCard extends React.Component {
    state = {};

    handleAddToFavourite = (data) => {};

    handleAddToCart = (data) => {};

    handleOnRedirect = (id) => {
        this.props.navigate(routes.productDetails.replace(':id', id));
    };

    render() {
        const { data } = this.props;

        return (
            <div className={scss('product-item')} title={data.name}>
                {data.oldPrice > data.newPrice && <DiscountPercent before={data.oldPrice} current={data.newPrice} />}
                <div className={scss('image')}>
                    <img src={data.imageUrl} alt={data.name} />
                </div>
                <div className={scss('content')}>
                    <div className={scss('top')}>
                        <div className={scss('subtitle')}>
                            <div className={scss('category')}>{data.category || 'Đồ ăn'}</div>

                            <IconButton size={'medium'} title={'Yêu thích'}>
                                {<BsSuitHeart /> || <BsSuitHeartFill style={{ color: 'red' }} />}
                            </IconButton>
                        </div>
                        <h4 className={scss('title')} onClick={() => this.handleOnRedirect(data.id)}>
                            {data.name}
                        </h4>
                        <Rating stars={5.0} reviews={100} />
                    </div>
                    <div className={scss('bottom')}>
                        <div className={scss('action')}>
                            <Price before={data.oldPrice} current={data.newPrice} />
                            <IconButton
                                color={'error'}
                                size={'medium'}
                                title={'thêm vào giỏ hàng'}
                                onClick={() => this.props.addToCart(data)}
                            >
                                <BsBagPlus />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const DiscountPercent = (props) => {
    const calcDiscount = Math.round(((props.current - props.before) / props.before) * 100);

    return (
        <div className={scss('discount')}>
            <p>
                <span>{calcDiscount}</span>
                <span>%</span>
            </p>
        </div>
    );
};

const Rating = (props) => (
    <div className={scss('rating')}>
        <div className={scss('rate')}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
        </div>
        <div className={scss('count')}>
            <span>{props.reviews}</span>
            <span>reviews</span>
        </div>
    </div>
);

const Price = (props) => {
    const before = props.before?.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' });
    const current = props.current?.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' });
    return (
        <div className={scss('price')}>
            <p>{current}</p>
            <p>{before}</p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapActionsToProps = (dispatch) => ({
    addToCart: (item) => dispatch(cartItemAdd(item)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(ProductCard));
