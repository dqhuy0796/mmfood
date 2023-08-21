import classNames from 'classnames/bind';
import React from 'react';
import ProductItem from '~/components/partial/ProductItem/ProductItem';
import styles from './GridProductsLayout.module.scss';

const scss = classNames.bind(styles);

class GridProductsLayout extends React.Component {
    state = {};

    render() {
        return (
            <div className={scss('wrapper')}>
                {this.props.data && this.props.data.length > 0 ? (
                    <ul className={scss('list')}>
                        {this.props.data.map((item, index) => (
                            <li key={index}>
                                <ProductItem data={item} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={scss('empty')}>
                        <p>Không có sản phẩm nào</p>
                    </div>
                )}
            </div>
        );
    }
}

export default GridProductsLayout;
