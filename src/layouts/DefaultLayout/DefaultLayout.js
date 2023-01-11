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
            <>
                <Header />
                <div className={scss('page-background')}>{this.props.children}</div>
                <Footer />
            </>
        );
    }
}

export default DefaultLayout;
