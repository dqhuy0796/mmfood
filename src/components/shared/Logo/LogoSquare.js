import React from 'react';
import classNames from 'classnames/bind';
import styles from './LogoMini.module.scss';
import LogoFullSize from '~/assets/images/logo-mini.png';
import { Link } from 'react-router-dom';
import routes from '~/config';

const scss = classNames.bind(styles);

class LogoMini extends React.Component {
    state = {};
    render() {
        return (
            <Link to={routes.home} className={scss('wrapper')}>
                <img src={LogoFullSize} alt="logo full size" />
            </Link>
        );
    }
}

export default LogoMini;
