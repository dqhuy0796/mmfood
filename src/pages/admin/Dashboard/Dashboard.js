import classNames from 'classnames/bind';
import React from 'react';
import AdminMenu from '~/layouts/AdminMenu/AdminMenu';
import styles from './Dashboard.module.scss';
import RealtimeClock from '~/components/partial/RealtimeClock';

const cb = classNames.bind(styles);

class Dashboard extends React.Component {
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

export default Dashboard;
