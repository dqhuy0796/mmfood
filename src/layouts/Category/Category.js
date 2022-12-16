import classNames from 'classnames/bind';
import React from 'react';
import ProductItem from '../../components/partial/ProductItem/ProductItem';
import styles from './Category.module.scss';

const cb = classNames.bind(styles);

class Category extends React.Component {
    state = {};

    render() {
        return (
            <div className={cb('background')}>
                <div className={cb('wrapper')}>
                    <ul className={cb('list')}>
                        {this.props.data.map((item, index) => (
                            <li key={index}>
                                <ProductItem data={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Category;
