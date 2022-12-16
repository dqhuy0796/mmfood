import classNames from 'classnames/bind';
import React from 'react';
import styles from './Orders.module.scss';
import AdminMenu from '~/layouts/AdminMenu/AdminMenu';
import RealtimeClock from '~/components/partial/RealtimeClock';

const cb = classNames.bind(styles);

class Orders extends React.Component {
    state = {};
    render() {
        return (
            <div className={cb('wrapper')}>
                <AdminMenu />
                <div className={cb('container')}>
                    <div className={cb('title')}>
                        <span>Quản lý tài khoản</span>
                        <span>{<RealtimeClock />}</span>
                    </div>
                    <div className={cb('container')}>
                        <div className={cb('header')}></div>
                        <div className={cb('body')}></div>
                        <div className={cb('footer')}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;
