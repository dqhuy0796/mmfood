import React from 'react';
import classNames from 'classnames/bind';
import styles from './LogoFull.module.scss';
import LogoFullSize from '~/assets/images/logo-full.png';
import { Link } from 'react-router-dom';
import config from '~/config';

const scss = classNames.bind(styles);

class LogoFull extends React.Component {
    state = {};
    render() {
        return (
            <Link to={config.routes.home} className={scss('wrapper')}>
                <img src={LogoFullSize} alt="logo full size" />
            </Link>
        );
    }
}

export default LogoFull;
