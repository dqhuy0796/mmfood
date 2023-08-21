import React from 'react';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
// style
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const scss = classNames.bind(styles);

class DefaultLayout extends React.Component {
    render() {
        return (
            <div className={scss('page-background')}>
                <Header />
                <div className={scss('page-children')}>{this.props.children}</div>
                <Footer />
            </div>
        );
    }
}

export default DefaultLayout;
